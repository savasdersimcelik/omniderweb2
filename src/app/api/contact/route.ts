import { NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/mail/smtp";
import { splitName, trackMetaLead } from "@/lib/meta/conversions";
import { verifyRecaptchaV3 } from "@/lib/recaptcha";

type ContactBody = {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  subject?: string;
  message?: string;
  consent?: boolean;
  website?: string;
  locale?: string;
  recaptchaToken?: string;
  sourceUrl?: string;
};

function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || null;
  }
  return request.headers.get("x-real-ip");
}

export async function POST(request: Request) {
  let body: ContactBody;

  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  // Honeypot — silently accept bots.
  if (body.website?.trim()) {
    return NextResponse.json({ ok: true });
  }

  const name = body.name?.trim() || "";
  const email = body.email?.trim() || "";
  const phone = body.phone?.trim() || "";
  const company = body.company?.trim() || "";
  const subject = body.subject?.trim() || "";
  const message = body.message?.trim() || "";
  const locale = body.locale === "en" ? "en" : "tr";

  if (
    !name ||
    name.length > 120 ||
    !email ||
    email.length > 180 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    !subject ||
    subject.length > 160 ||
    !message ||
    message.length > 5000 ||
    !body.consent ||
    (phone && phone.length > 40) ||
    (company && company.length > 120)
  ) {
    return NextResponse.json({ error: "validation" }, { status: 422 });
  }

  const captcha = await verifyRecaptchaV3({
    token: body.recaptchaToken,
    action: "contact",
    remoteIp: clientIp(request),
  });

  if (!captcha.ok) {
    return NextResponse.json(
      { error: captcha.reason === "missing" ? "captcha_required" : "captcha_failed" },
      { status: 422 },
    );
  }

  try {
    await sendContactEmail({
      name,
      email,
      phone: phone || undefined,
      company: company || undefined,
      subject,
      message,
      locale,
    });
  } catch (error) {
    console.error("Contact mail failed", error);
    return NextResponse.json({ error: "mail_failed" }, { status: 500 });
  }

  const { firstName, lastName } = splitName(name);

  void trackMetaLead({
    email,
    phone: phone || null,
    firstName,
    lastName,
    ip: clientIp(request),
    userAgent: request.headers.get("user-agent"),
    eventSourceUrl: body.sourceUrl || process.env.NEXT_PUBLIC_APP_URL || null,
  });

  return NextResponse.json({ ok: true });
}
