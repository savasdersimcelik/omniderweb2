import { getLocale } from "next-intl/server";
import { PlatformsIndexPage } from "@/components/platforms/PlatformsIndexPage";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata() {
  const locale = (await getLocale()) as Locale;

  return buildPageMetadata({
    pageKey: "platforms",
    pathname: "/platforms",
    locale,
  });
}

export default function PlatformsPage() {
  return <PlatformsIndexPage />;
}
