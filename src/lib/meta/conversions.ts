import { createHash } from "node:crypto";

type LeadContext = {
  email?: string | null;
  phone?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  ip?: string | null;
  userAgent?: string | null;
  eventSourceUrl?: string | null;
};

function sha256(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

function hashEmail(email: string) {
  const normalized = email.trim().toLowerCase();
  return normalized ? sha256(normalized) : null;
}

function hashPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return digits ? sha256(digits) : null;
}

function hashName(name: string) {
  const normalized = name.trim().toLocaleLowerCase("tr-TR");
  return normalized ? sha256(normalized) : null;
}

export function splitName(fullName: string) {
  const parts = fullName.trim().split(/\s+/, 2);
  return {
    firstName: parts[0] || null,
    lastName: parts[1] || null,
  };
}

export function isMetaConversionsEnabled() {
  return (
    process.env.META_CONVERSIONS_ENABLED !== "false" &&
    Boolean(process.env.META_PIXEL_ID?.trim()) &&
    Boolean(process.env.META_ACCESS_TOKEN?.trim())
  );
}

export async function trackMetaLead(context: LeadContext): Promise<boolean> {
  if (!isMetaConversionsEnabled()) {
    return false;
  }

  const pixelId = process.env.META_PIXEL_ID!.trim();
  const accessToken = process.env.META_ACCESS_TOKEN!.trim();
  const apiVersion = process.env.META_API_VERSION?.trim() || "v23.0";
  const testEventCode = process.env.META_TEST_EVENT_CODE?.trim();

  const userData: Record<string, unknown> = {};

  if (context.email) {
    const hashed = hashEmail(context.email);
    if (hashed) userData.em = [hashed];
  }
  if (context.phone) {
    const hashed = hashPhone(context.phone);
    if (hashed) userData.ph = [hashed];
  }
  if (context.firstName) {
    const hashed = hashName(context.firstName);
    if (hashed) userData.fn = [hashed];
  }
  if (context.lastName) {
    const hashed = hashName(context.lastName);
    if (hashed) userData.ln = [hashed];
  }
  if (context.ip) userData.client_ip_address = context.ip;
  if (context.userAgent) userData.client_user_agent = context.userAgent;

  const event: Record<string, unknown> = {
    event_name: "Lead",
    event_time: Math.floor(Date.now() / 1000),
    action_source: "website",
    user_data: userData,
  };

  if (context.eventSourceUrl) {
    event.event_source_url = context.eventSourceUrl;
  }

  const payload: Record<string, unknown> = {
    data: [event],
    access_token: accessToken,
  };

  if (testEventCode) {
    payload.test_event_code = testEventCode;
  }

  try {
    const response = await fetch(
      `https://graph.facebook.com/${apiVersion}/${pixelId}/events`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );

    if (!response.ok) {
      console.warn("Meta CAPI failed", response.status, await response.text());
      return false;
    }

    return true;
  } catch (error) {
    console.warn("Meta CAPI error", error);
    return false;
  }
}
