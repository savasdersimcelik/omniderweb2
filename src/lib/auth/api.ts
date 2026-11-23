import { getOmniderApiUrl, getOmniderPanelUrl } from "@/lib/site";

export type AuthApiResult<T = unknown> = {
  ok: boolean;
  status: number;
  json: {
    success?: boolean;
    message?: string;
    data?: T;
  } | null;
};

export type AuthSessionData = {
  token?: string;
  email?: string;
  nextStep?: string;
};

function localeHeader(): string {
  if (typeof document === "undefined") return "tr";
  return document.documentElement.lang || "tr";
}

/** POST/GET Omnider tenant Auth API (`/auth/*`). */
export async function authFetch<T = AuthSessionData>(
  path: string,
  {
    method = "POST",
    body = null,
  }: {
    method?: string;
    body?: Record<string, unknown> | null;
  } = {},
): Promise<AuthApiResult<T>> {
  const headers: Record<string, string> = {
    Accept: "application/json",
    "Accept-Language": localeHeader(),
    "x-lang": localeHeader(),
    "X-Device-Type": "browser",
  };

  if (body !== null) {
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(`${getOmniderApiUrl()}${path}`, {
    method,
    headers,
    body: body !== null ? JSON.stringify(body) : undefined,
  });

  let json: AuthApiResult<T>["json"] = null;
  try {
    json = (await res.json()) as AuthApiResult<T>["json"];
  } catch {
    json = null;
  }

  return { ok: res.ok, status: res.status, json };
}

export function messageFromAuth(
  json: AuthApiResult["json"],
  fallback: string,
): string {
  if (json && typeof json.message === "string" && json.message.trim()) {
    return json.message;
  }
  return fallback;
}

/** Panel handoff: `https://app…/auth/callback?token=JWT` */
export function panelHandoffUrl(token: string): string {
  const url = new URL(`${getOmniderPanelUrl()}/auth/callback`);
  url.searchParams.set("token", token);
  return url.toString();
}

export function goToPanel(token: string) {
  window.location.assign(panelHandoffUrl(token));
}

export function startOAuth(provider: "google" | "facebook") {
  window.location.assign(`${getOmniderApiUrl()}/auth/${provider}`);
}

const PARTNER_STORAGE_KEY = "omnider_partner";
const PARTNER_QUERY_KEY = "partner";

export type PartnerInfo = {
  partner_number?: string | number;
  company_name?: string;
  name?: string;
  whitelabel?: { brand_name?: string };
};

export function resolvePartnerFromBrowser(initial = ""): string {
  if (typeof window === "undefined") return initial;
  const fromUrl = new URLSearchParams(window.location.search).get(
    PARTNER_QUERY_KEY,
  );
  if (fromUrl) {
    localStorage.setItem(PARTNER_STORAGE_KEY, fromUrl);
    return fromUrl;
  }
  if (initial) return initial;
  return localStorage.getItem(PARTNER_STORAGE_KEY) || "";
}

export function lockPartnerNumber(number: string) {
  localStorage.setItem(PARTNER_STORAGE_KEY, number);
}

export async function lookupPartner(number: string) {
  return authFetch<PartnerInfo>(`/partners/${encodeURIComponent(number)}`, {
    method: "GET",
  });
}

export const AUTH_PHONE_PREFIXES = [
  "+90",
  "+1",
  "+44",
  "+49",
  "+33",
  "+31",
  "+971",
  "+966",
  "+994",
  "+7",
] as const;
