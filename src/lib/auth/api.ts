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
