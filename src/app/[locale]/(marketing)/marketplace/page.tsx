import { getLocale } from "next-intl/server";
import { MarketplaceProductPage } from "@/components/products/MarketplaceProductPage";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata() {
  const locale = (await getLocale()) as Locale;

  return buildPageMetadata({
    pageKey: "marketplace",
    pathname: "/marketplace",
    locale,
  });
}

export default function MarketplaceRoutePage() {
  return <MarketplaceProductPage />;
}
