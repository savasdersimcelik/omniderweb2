import { getDb } from "@/lib/db/mongodb";
import type { Attribution } from "@/lib/attribution/params";
import { ATTRIBUTION_PARAMS } from "@/lib/attribution/params";

const ACTIVE_STATUSES = ["new", "callback", "in_progress"] as const;

export type CreateLeadInput = {
  fullName: string;
  phone: string;
  email?: string;
  pageName?: string;
  pageUrl?: string;
  ip?: string | null;
  userAgent?: string | null;
  attribution?: Attribution | null;
  locale?: string;
};

export function normalizePhone(phone: string) {
  const digits = phone.replace(/\D+/g, "");

  if (digits.startsWith("90") && digits.length === 12) {
    return digits.slice(2);
  }

  if (digits.startsWith("0") && digits.length === 11) {
    return digits.slice(1);
  }

  return digits;
}

export async function findActiveLeadByPhone(phone: string) {
  const db = await getDb();
  const normalized = normalizePhone(phone);
  const candidates = await db
    .collection("leads")
    .find({ status: { $in: [...ACTIVE_STATUSES] } })
    .project({ phone: 1, status: 1 })
    .limit(200)
    .toArray();

  return candidates.find(
    (lead) => normalizePhone(String(lead.phone || "")) === normalized,
  );
}

export async function createLead(input: CreateLeadInput) {
  const db = await getDb();
  const now = new Date();
  const attribution = input.attribution || {};

  const marketing: Record<string, string | null> = {};
  for (const key of ATTRIBUTION_PARAMS) {
    const value = attribution[key];
    marketing[key] = typeof value === "string" && value.trim() ? value.trim() : null;
  }

  const consentBase = {
    status: "subscribed",
    opt_in_at: now,
    source: "website_form",
    consent_text:
      input.locale === "en"
        ? "Details are used for demo and contact purposes."
        : "Bilgileriniz demo ve iletişim amaçlı kullanılır.",
    ip: input.ip || null,
    unsubscribe_at: null,
  };

  const consents: Record<string, typeof consentBase> = {
    call: consentBase,
    whatsapp: consentBase,
  };

  if (input.email) {
    consents.email = consentBase;
  }

  const doc = {
    full_name: input.fullName,
    phone: input.phone,
    email: input.email || null,
    company_name: null,
    status: "callback",
    source: "webform",
    form_page: {
      name: input.pageName || null,
      url: input.pageUrl || null,
    },
    ip_address: input.ip || null,
    user_agent: input.userAgent || null,
    referrer: attribution.referrer || null,
    ...marketing,
    landing_url: attribution.landing_url || null,
    conversion_url: input.pageUrl || null,
    consents,
    created_at: now,
    updated_at: now,
  };

  const result = await db.collection("leads").insertOne(doc);

  return { id: result.insertedId.toString(), doc };
}
