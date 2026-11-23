/**
 * Social & messaging links — mirrored from omniderweb `config/omnider.php` social.
 */

const WHATSAPP = {
  tr: {
    phone: "905464199417",
    text: "Merhaba bilgi almak istiyorum",
  },
  en: {
    phone: "447529760393",
    text: "Hello, I would like to get more information",
  },
} as const;

function whatsappHref(locale: string) {
  const cfg = locale.startsWith("en") ? WHATSAPP.en : WHATSAPP.tr;
  return `https://wa.me/${cfg.phone}?text=${encodeURIComponent(cfg.text)}`;
}

const SHARED_SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/omnider.tech/",
  },
  {
    label: "Messenger",
    href: "https://m.me/omnider.tech",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/omnider.tech",
  },
  {
    label: "Telegram",
    href: "https://t.me/omniderbot",
  },
  {
    label: "LINE",
    href: "https://line.me/R/ti/p/653nqviy",
  },
] as const;

/** @deprecated Prefer getSocialLinks(locale) for locale-aware WhatsApp. */
export const socialLinks = [
  {
    label: "WhatsApp",
    href: whatsappHref("tr"),
  },
  ...SHARED_SOCIAL_LINKS,
] as const;

export function getSocialLinks(locale = "tr") {
  return [
    {
      label: "WhatsApp",
      href: whatsappHref(locale),
    },
    ...SHARED_SOCIAL_LINKS.map((link) => ({ ...link })),
  ];
}
