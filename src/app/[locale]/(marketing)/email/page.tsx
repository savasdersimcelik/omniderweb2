import { getLocale } from "next-intl/server";
import { EmailProductPage } from "@/components/products/EmailProductPage";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata() {
  const locale = (await getLocale()) as Locale;

  return buildPageMetadata({
    pageKey: "email",
    pathname: "/email",
    locale,
  });
}

export default function EmailRoutePage() {
  return <EmailProductPage />;
}
