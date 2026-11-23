import { getLocale } from "next-intl/server";
import { AppointmentsProductPage } from "@/components/products/AppointmentsProductPage";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata() {
  const locale = (await getLocale()) as Locale;

  return buildPageMetadata({
    pageKey: "appointments",
    pathname: "/appointments",
    locale,
  });
}

export default function AppointmentsRoutePage() {
  return <AppointmentsProductPage />;
}
