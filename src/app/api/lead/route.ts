import { NextResponse } from "next/server";
import {
  ATTRIBUTION_PARAMS,
  type Attribution,
} from "@/lib/attribution/params";
import { createLead, findActiveLeadByPhone } from "@/lib/leads/store";
import { sendLeadEmail } from "@/lib/mail/smtp";
import { splitName, trackMetaLead } from "@/lib/meta/conversions";
import { verifyRecaptchaV3 } from "@/lib/recaptcha";

type LeadBody = {
  fullName?: string;
  phone?: string;
  email?: string;
  website?: string;
  pageName?: string;
  pageUrl?: string;
  locale?: string;
  recaptchaToken?: string;
  attribution?: Attribution;
};

function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || null;
  }
  return request.headers.get("x-real-ip");
}

function sanitizeAttribution(input: Attribution | undefined): Attribution {
  const result: Attribution = {};

  for (const key of ATTRIBUTION_PARAMS) {
    const value = input?.[key];
    result[key] =
      typeof value === "string" && value.trim()
        ? value.trim().slice(0, 200)
        : null;
  }

  result.landing_url =
    typeof input?.landing_url === "string"
      ? input.landing_url.slice(0, 2000)
      : null;
  result.referrer =
    typeof input?.referrer === "string" ? input.referrer.slice(0, 2000) : null;
  result.captured_at =
    typeof input?.captured_at === "string" ? input.captured_at : null;

  return result;
}

export async function POST(request: Request) {
  let body: LeadBody;

  try {
    body = (await request.json()) as LeadBody;
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  if (body.website?.trim()) {
    return NextResponse.json({ ok: true, status: "success" });
  }

  const fullName = body.fullName?.trim() || "";
  const phone = body.phone?.trim() || "";
  const email = body.email?.trim() || "";
  const pageName = body.pageName?.trim() || "";
  const pageUrl = body.pageUrl?.trim() || "";
  const locale = body.locale === "en" ? "en" : "tr";
  const attribution = sanitizeAttribution(body.attribution);

  if (
    !fullName ||
    fullName.length > 120 ||
    !phone ||
    phone.length > 40 ||
    (email &&
      (email.length > 180 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) ||
    (pageName && pageName.length > 200) ||
    (pageUrl && pageUrl.length > 500)
  ) {
    return NextResponse.json({ error: "validation" }, { status: 422 });
  }

  const captcha = await verifyRecaptchaV3({
    token: body.recaptchaToken,
    action: "lead",
    remoteIp: clientIp(request),
  });

  if (!captcha.ok) {
    return NextResponse.json(
      {
        error:
          captcha.reason === "missing" ? "captcha_required" : "captcha_failed",
      },
      { status: 422 },
    );
  }

  try {
    const active = await findActiveLeadByPhone(phone);
    if (active) {
      return NextResponse.json({
        ok: true,
        status: "duplicate",
      });
    }
  } catch (error) {
    console.error("Lead duplicate check failed", error);
  }

  try {
    await createLead({
      fullName,
      phone,
      email: email || undefined,
      pageName: pageName || undefined,
      pageUrl: pageUrl || undefined,
      ip: clientIp(request),
      userAgent: request.headers.get("user-agent"),
      attribution,
      locale,
    });
  } catch (error) {
    console.error("Lead DB write failed", error);
    return NextResponse.json({ error: "db_failed" }, { status: 500 });
  }

  try {
    await sendLeadEmail({
      fullName,
      phone,
      email: email || undefined,
      pageName: pageName || undefined,
      pageUrl: pageUrl || undefined,
      locale,
      attribution,
      ip: clientIp(request),
    });
  } catch (error) {
    console.error("Lead mail failed", error);
    // Lead already saved — still return success, mail can be retried manually
  }

  const { firstName, lastName } = splitName(fullName);

  void trackMetaLead({
    email: email || null,
    phone,
    firstName,
    lastName,
    ip: clientIp(request),
    userAgent: request.headers.get("user-agent"),
    eventSourceUrl: pageUrl || process.env.NEXT_PUBLIC_APP_URL || null,
  });

  return NextResponse.json({ ok: true, status: "success" });
}
