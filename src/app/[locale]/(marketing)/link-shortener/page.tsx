import { getLocale } from "next-intl/server";
import { LinkShortenerProductPage } from "@/components/products/LinkShortenerProductPage";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata() {
  const locale = (await getLocale()) as Locale;

  return buildPageMetadata({
    pageKey: "linkShortener",
    pathname: "/link-shortener",
    locale,
  });
}

export default function LinkShortenerRoutePage() {
  return <LinkShortenerProductPage />;
}
