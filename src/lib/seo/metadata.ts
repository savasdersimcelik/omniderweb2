import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { seoConfig } from "@/config/seo";
import { routing, type Locale } from "@/i18n/routing";
import { getSiteUrl } from "@/lib/site";
import { absoluteUrl, languageAlternates } from "./urls";

type BuildPageMetadataInput = {
  /** Translation key under Meta.* (e.g. "home", "platforms") */
  pageKey: string;
  /** Locale-agnostic pathname (e.g. "/", "/platforms") */
  pathname: string;
  locale: Locale;
  image?: string;
  type?: "website" | "article";
  robots?: {
    index?: boolean;
    follow?: boolean;
  };
  /** Override title/description (e.g. CMS-driven pages) */
  title?: string;
  description?: string;
};

function resolveImage(image?: string) {
  const path = image || seoConfig.defaultOgImage;
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  return `${getSiteUrl()}${path.startsWith("/") ? path : `/${path}`}`;
}

export async function buildPageMetadata({
  pageKey,
  pathname,
  locale,
  image,
  type = "website",
  robots = seoConfig.defaultRobots,
  title: titleOverride,
  description: descriptionOverride,
}: BuildPageMetadataInput): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Meta" });
  const title = titleOverride ?? t(`${pageKey}.title`);
  const description = descriptionOverride ?? t(`${pageKey}.description`);
  const canonical = absoluteUrl(locale, pathname);
  const ogImage = resolveImage(image);
  const ogLocale = seoConfig.localeMap[locale];
  const alternateLocale = routing.locales
    .filter((item) => item !== locale)
    .map((item) => seoConfig.localeMap[item]);

  return {
    // Full titles already include the brand (Laravel meta.php style)
    title: { absolute: title },
    description,
    metadataBase: new URL(getSiteUrl()),
    alternates: {
      canonical,
      languages: languageAlternates(pathname),
    },
    robots: {
      index: robots.index ?? true,
      follow: robots.follow ?? true,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: seoConfig.siteName,
      locale: ogLocale,
      alternateLocale,
      type,
      images: [
        {
          url: ogImage,
          alt: seoConfig.siteName,
        },
      ],
    },
    twitter: {
      card: seoConfig.twitterCard,
      title,
      description,
      images: [ogImage],
    },
  };
}

export async function buildNoIndexMetadata({
  pageKey,
  locale,
  title: titleOverride,
  description: descriptionOverride,
}: {
  pageKey: string;
  locale: Locale;
  title?: string;
  description?: string;
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Meta" });

  return {
    title: {
      absolute: titleOverride ?? t(`${pageKey}.title`),
    },
    description: descriptionOverride ?? t(`${pageKey}.description`),
    robots: {
      index: false,
      follow: false,
    },
  };
}
