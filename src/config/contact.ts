/**
 * Public contact details — mirrored from omniderweb `config/omnider.php`.
 */
export const contactDetails = {
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@omnider.com",
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "+908502428324",
  phoneDisplay:
    process.env.NEXT_PUBLIC_CONTACT_PHONE_DISPLAY || "+90 850 242 83 24",
} as const;

export const contactChannels = [
  { id: "whatsapp", icon: "whatsapp", hrefKey: "WhatsApp" },
  { id: "instagram", icon: "instagram", hrefKey: "Instagram" },
  { id: "facebook", icon: "facebook", hrefKey: "Facebook" },
  { id: "telegram", icon: "telegram", hrefKey: "Telegram" },
  { id: "line", icon: "line", hrefKey: "LINE" },
] as const;
