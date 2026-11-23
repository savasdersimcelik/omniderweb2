/**
 * Brand icons under /public/icons/platforms (from omniderweb).
 * Values are filenames with extension.
 */
export const platformIconFiles = {
  "whatsapp-business": "whatsapp-business.png",
  "whatsapp-personal": "whatsapp-personal.png",
  whatsapp: "whatsapp.png",
  instagram: "instagram.png",
  messenger: "messenger.png",
  telegram: "telegram.png",
  line: "line.png",
  webchat: "webchat.svg",
  email: "email.png",
  gmail: "gmail.png",
  outlook: "outlook.png",
  "google-business": "google-business.png",
  sms: "sms.png",
  marketplace: "marketplace.svg",
  facebook: "facebook.svg",
  linkedin: "linkedin.png",
  tiktok: "tiktok.png",
  discord: "discord.svg",
  x: "x.svg",
} as const;

export type PlatformIconId = keyof typeof platformIconFiles;

export function getPlatformIconSrc(id: PlatformIconId | string): string | null {
  const file = platformIconFiles[id as PlatformIconId];
  return file ? `/icons/platforms/${file}` : null;
}

/** Homepage / marketing list — keys match Nav.items.* */
export const featuredPlatforms = [
  { key: "whatsappBusiness", icon: "whatsapp-business" },
  { key: "whatsappPersonal", icon: "whatsapp-personal" },
  { key: "instagram", icon: "instagram" },
  { key: "messenger", icon: "messenger" },
  { key: "telegram", icon: "telegram" },
  { key: "line", icon: "line" },
  { key: "webchat", icon: "webchat" },
  { key: "platformEmail", icon: "email" },
  { key: "gmail", icon: "gmail" },
  { key: "outlook", icon: "outlook" },
  { key: "googleBusiness", icon: "google-business" },
  { key: "sms", icon: "sms" },
] as const satisfies ReadonlyArray<{
  key: string;
  icon: PlatformIconId;
}>;
