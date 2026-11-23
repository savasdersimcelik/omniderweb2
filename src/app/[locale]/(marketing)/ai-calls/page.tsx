import { getLocale } from "next-intl/server";
import { AiCallsProductPage } from "@/components/products/AiCallsProductPage";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata() {
  const locale = (await getLocale()) as Locale;

  return buildPageMetadata({
    pageKey: "aiCalls",
    pathname: "/ai-calls",
    locale,
  });
}

export default function AiCallsRoutePage() {
  return <AiCallsProductPage />;
}
