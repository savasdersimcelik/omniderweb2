/**
 * Platform detail routes — mirrors omniderweb `/platforms/{slug}`.
 */

export const platformPageSlugs = [
  "whatsapp-business",
  "whatsapp-personal",
  "instagram",
  "messenger",
  "telegram",
  "line",
  "webchat",
  "email",
  "gmail",
  "outlook",
  "google-business",
  "sms",
] as const;

export type PlatformPageSlug = (typeof platformPageSlugs)[number];

/** Nav.items.* key used for titles / descriptions */
export const platformNavKeyBySlug: Record<PlatformPageSlug, string> = {
  "whatsapp-business": "whatsappBusiness",
  "whatsapp-personal": "whatsappPersonal",
  instagram: "instagram",
  messenger: "messenger",
  telegram: "telegram",
  line: "line",
  webchat: "webchat",
  email: "platformEmail",
  gmail: "gmail",
  outlook: "outlook",
  "google-business": "googleBusiness",
  sms: "sms",
};

export function isPlatformPageSlug(value: string): value is PlatformPageSlug {
  return (platformPageSlugs as readonly string[]).includes(value);
}

export function platformHref(slug: PlatformPageSlug): `/platforms/${PlatformPageSlug}` {
  return `/platforms/${slug}`;
}
