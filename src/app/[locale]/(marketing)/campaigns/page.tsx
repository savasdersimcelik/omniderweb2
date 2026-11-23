import { getLocale } from "next-intl/server";
import { CampaignsProductPage } from "@/components/products/CampaignsProductPage";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata() {
  const locale = (await getLocale()) as Locale;

  return buildPageMetadata({
    pageKey: "campaigns",
    pathname: "/campaigns",
    locale,
  });
}

export default function CampaignsRoutePage() {
  return <CampaignsProductPage />;
}
