import { getLocale } from "next-intl/server";
import { AnalyticsProductPage } from "@/components/products/AnalyticsProductPage";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata() {
  const locale = (await getLocale()) as Locale;

  return buildPageMetadata({
    pageKey: "analytics",
    pathname: "/analytics",
    locale,
  });
}

export default function AnalyticsRoutePage() {
  return <AnalyticsProductPage />;
}
