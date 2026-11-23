import { getLocale, getTranslations } from "next-intl/server";
import { socialLinks } from "@/config/social";
import { getPathname } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { CrewMember } from "@/components/ui/doodle-crew-footer";
import { OmniderDoodleFooter } from "./OmniderDoodleFooter";

const COPYRIGHT_YEAR = 2026;

type AppPath =
  | "/"
  | "/contact"
  | "/pricing"
  | "/login"
  | "/register"
  | "/privacy-policy"
  | "/terms-of-use";

export async function SiteFooter() {
  const t = await getTranslations("Footer");
  const locale = (await getLocale()) as Locale;

  const href = (path: AppPath, hash?: string) => {
    const base = getPathname({ locale, href: path });
    return hash ? `${base}${hash}` : base;
  };

  const columns = [
    {
      title: t("columns.products"),
      links: [
        { label: t("links.aiAssistant"), href: href("/", "#ai-assistant") },
        { label: t("links.campaigns"), href: href("/", "#campaigns") },
        { label: t("links.appointments"), href: href("/", "#appointments") },
        { label: t("links.aiCalls"), href: href("/", "#ai-calls") },
        { label: t("links.email"), href: href("/", "#email-system") },
      ],
    },
    {
      title: t("columns.platforms"),
      links: [
        { label: t("links.whatsapp"), href: href("/") },
        { label: t("links.instagram"), href: href("/") },
        { label: t("links.telegram"), href: href("/") },
        { label: t("links.messenger"), href: href("/") },
        { label: t("links.webchat"), href: href("/") },
      ],
    },
    {
      title: t("columns.company"),
      links: [
        { label: t("links.pricing"), href: href("/pricing") },
        { label: t("links.contact"), href: href("/contact") },
        { label: t("links.login"), href: href("/login") },
        { label: t("links.register"), href: href("/register") },
      ],
    },
    {
      title: t("columns.resources"),
      links: [
        { label: t("links.demo"), href: href("/contact") },
        { label: t("links.privacy"), href: href("/privacy-policy") },
        { label: t("links.terms"), href: href("/terms-of-use") },
      ],
    },
  ];

  const actions = [
    {
      label: t("actions.contact"),
      href: href("/contact"),
      icon: "plane" as const,
      variant: "outline" as const,
    },
    {
      label: t("actions.demo"),
      href: href("/register"),
      icon: "bolt" as const,
      variant: "solid" as const,
    },
  ];

  const legal = [
    { label: t("legal.privacy"), href: href("/privacy-policy") },
    { label: t("legal.terms"), href: href("/terms-of-use") },
  ];

  const socials = socialLinks.map(({ label, href }) => ({ label, href }));

  const crew: CrewMember[] = [
    {
      kind: "yeti",
      letter: 0,
      seat: "front",
      offset: -0.28,
      name: t("crew.inbox.name"),
      says: t("crew.inbox.says"),
    },
    {
      kind: "bird",
      letter: 1,
      seat: "top",
      offset: 0.02,
      name: t("crew.ai.name"),
      says: t("crew.ai.says"),
    },
    {
      kind: "mushroom",
      letter: 2,
      seat: "front",
      offset: 0.1,
      scale: 0.95,
      name: t("crew.chat.name"),
      says: t("crew.chat.says"),
    },
    {
      kind: "kid",
      letter: 4,
      seat: "top",
      offset: -0.04,
      name: t("crew.ops.name"),
      says: t("crew.ops.says"),
    },
    {
      kind: "ghost",
      letter: 5,
      seat: "behind",
      offset: 0,
      name: t("crew.support.name"),
      says: t("crew.support.says"),
    },
    {
      kind: "cat",
      letter: 6,
      seat: "front",
      offset: 0.38,
      flip: true,
      name: t("crew.sales.name"),
      says: t("crew.sales.says"),
    },
  ];

  return (
    <OmniderDoodleFooter
      brand="Omnider"
      blurb={t("tagline")}
      tagline={t("doodleTagline")}
      copyright={`© ${COPYRIGHT_YEAR} Omnider. ${t("rights")}`}
      columns={columns}
      actions={actions}
      legal={legal}
      socials={socials}
      crew={crew}
      backToTopLabel={t("backToTop")}
    />
  );
}
