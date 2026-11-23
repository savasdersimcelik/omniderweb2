import { seoConfig } from "@/config/seo";
import type { Locale } from "@/i18n/routing";
import { getSiteUrl } from "@/lib/site";
import { absoluteUrl } from "./urls";

type JsonLd = Record<string, unknown>;

function absoluteAsset(path: string) {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  return `${getSiteUrl()}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildOrganizationJsonLd(): JsonLd {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: seoConfig.organization.name,
    legalName: seoConfig.organization.legalName,
    url: siteUrl,
    logo: absoluteAsset(seoConfig.organization.logoPath),
    ...(seoConfig.organization.sameAs.length > 0
      ? { sameAs: seoConfig.organization.sameAs }
      : {}),
  };
}

export function buildWebSiteJsonLd({
  locale,
  title,
  description,
  pathname = "/",
  image,
}: {
  locale: Locale;
  title: string;
  description: string;
  pathname?: string;
  image?: string;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: title,
    description,
    url: absoluteUrl(locale, pathname),
    inLanguage: locale,
    image: absoluteAsset(image || seoConfig.defaultOgImage),
    publisher: {
      "@type": "Organization",
      name: seoConfig.organization.name,
      logo: {
        "@type": "ImageObject",
        url: absoluteAsset(seoConfig.organization.logoPath),
      },
    },
  };
}

export function buildArticleJsonLd({
  locale,
  title,
  description,
  pathname,
  image,
  datePublished,
  dateModified,
}: {
  locale: Locale;
  title: string;
  description: string;
  pathname: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: absoluteUrl(locale, pathname),
    inLanguage: locale,
    image: absoluteAsset(image || seoConfig.defaultOgImage),
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : {}),
    publisher: {
      "@type": "Organization",
      name: seoConfig.organization.name,
      logo: {
        "@type": "ImageObject",
        url: absoluteAsset(seoConfig.organization.logoPath),
      },
    },
  };
}

export function buildCollectionPageJsonLd({
  locale,
  title,
  description,
  pathname,
  image,
}: {
  locale: Locale;
  title: string;
  description: string;
  pathname: string;
  image?: string;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description,
    url: absoluteUrl(locale, pathname),
    inLanguage: locale,
    image: absoluteAsset(image || seoConfig.defaultOgImage),
  };
}
