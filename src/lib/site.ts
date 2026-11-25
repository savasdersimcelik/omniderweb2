export function getSiteUrl() {
  return (
    process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ||
    "https://v2.savasdersimcelik.dev"
  );
}

/**
 * tenantback Auth API — same as omniderweb `OMNIDER_API_URL`.
 * Dev: :3000 | Prod: api.omnider.com
 */
export function getOmniderApiUrl() {
  const fromEnv = process.env.NEXT_PUBLIC_OMNIDER_API_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  return process.env.NEXT_PUBLIC_APP_ENV === "production"
    ? "https://api.omnider.com"
    : "https://api.savasdersimcelik.dev";
}

/**
 * tenantfront panel — same role as omniderweb `OMNIDER_APP_URL`.
 * After login: `{panel}/auth/callback?token=…`
 * Dev: :5174 (vite) | Prod: app.omnider.com
 */
export function getOmniderPanelUrl() {
  const fromEnv = process.env.NEXT_PUBLIC_OMNIDER_APP_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  return process.env.NEXT_PUBLIC_APP_ENV === "production"
    ? "https://app.omnider.com"
    : "https://app.savasdersimcelik.dev";
}
