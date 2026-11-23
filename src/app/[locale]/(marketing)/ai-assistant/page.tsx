import { getLocale } from "next-intl/server";
import { AiAssistantProductPage } from "@/components/products/AiAssistantProductPage";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata() {
  const locale = (await getLocale()) as Locale;

  return buildPageMetadata({
    pageKey: "aiAssistant",
    pathname: "/ai-assistant",
    locale,
  });
}

export default function AiAssistantRoutePage() {
  return <AiAssistantProductPage />;
}
