import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { InstagramPage } from "@/components/platforms/instagram/InstagramPage";
import { MessengerPage } from "@/components/platforms/messenger/MessengerPage";
import { PlatformDetailPage } from "@/components/platforms/PlatformDetailPage";
import { TelegramPage } from "@/components/platforms/telegram/TelegramPage";
import { WhatsAppBusinessPage } from "@/components/platforms/whatsapp-business/WhatsAppBusinessPage";
import { WhatsAppPersonalPage } from "@/components/platforms/whatsapp-personal/WhatsAppPersonalPage";
import {
  isPlatformPageSlug,
  platformNavKeyBySlug,
  platformPageSlugs,
} from "@/config/platform-pages";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo/metadata";

type PlatformSlugPageProps = {
  params: Promise<{ slug: string }>;
};

const dedicatedMetaNamespace: Record<string, string> = {
  "whatsapp-business": "PlatformWhatsAppBusiness",
  "whatsapp-personal": "PlatformWhatsAppPersonal",
  instagram: "PlatformInstagram",
  messenger: "PlatformMessenger",
  telegram: "PlatformTelegram",
};

export function generateStaticParams() {
  return platformPageSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PlatformSlugPageProps) {
  const { slug } = await params;
  const locale = (await getLocale()) as Locale;

  if (!isPlatformPageSlug(slug)) {
    return {};
  }

  const namespace = dedicatedMetaNamespace[slug];
  if (namespace) {
    const t = await getTranslations({ locale, namespace });
    return buildPageMetadata({
      pageKey: "platforms",
      pathname: `/platforms/${slug}`,
      locale,
      title: t("meta.title"),
      description: t("meta.description"),
    });
  }

  const tNav = await getTranslations({ locale, namespace: "Nav" });
  const tMeta = await getTranslations({ locale, namespace: "Meta" });
  const navKey = platformNavKeyBySlug[slug];
  const name = tNav(`items.${navKey}`);
  const descriptionKey = `items.${navKey}Desc`;
  const description = tNav.has(descriptionKey)
    ? tNav(descriptionKey)
    : tMeta("platforms.description");

  return buildPageMetadata({
    pageKey: "platforms",
    pathname: `/platforms/${slug}`,
    locale,
    title: `${name} — Omnider`,
    description,
  });
}

async function PlatformSlugContent({ params }: PlatformSlugPageProps) {
  const { slug } = await params;

  if (!isPlatformPageSlug(slug)) {
    notFound();
  }

  if (slug === "whatsapp-business") {
    return <WhatsAppBusinessPage />;
  }

  if (slug === "whatsapp-personal") {
    return <WhatsAppPersonalPage />;
  }

  if (slug === "instagram") {
    return <InstagramPage />;
  }

  if (slug === "messenger") {
    return <MessengerPage />;
  }

  if (slug === "telegram") {
    return <TelegramPage />;
  }

  return <PlatformDetailPage slug={slug} />;
}

export default function PlatformSlugPage({ params }: PlatformSlugPageProps) {
  return (
    <Suspense fallback={null}>
      <PlatformSlugContent params={params} />
    </Suspense>
  );
}
