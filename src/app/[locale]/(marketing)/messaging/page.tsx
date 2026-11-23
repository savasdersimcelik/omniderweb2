import { getLocale } from "next-intl/server";
import { MessagingPage } from "@/components/products/MessagingPage";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata() {
  const locale = (await getLocale()) as Locale;

  return buildPageMetadata({
    pageKey: "messaging",
    pathname: "/messaging",
    locale,
  });
}

export default function MessagingRoutePage() {
  return <MessagingPage />;
}
