import { getLocale, getTranslations } from "next-intl/server";
import { AiAssistantSection } from "@/components/home/AiAssistantSection";
import { AiCallsSection } from "@/components/home/AiCallsSection";
import { AiCommentsSection } from "@/components/home/AiCommentsSection";
import { AppointmentSection } from "@/components/home/AppointmentSection";
import { CampaignSection } from "@/components/home/CampaignSection";
import { EmailSection } from "@/components/home/EmailSection";
import { HeroSection } from "@/components/home/HeroSection";
import { LanguagesSection } from "@/components/home/LanguagesSection";
import { JsonLd } from "@/components/seo/JsonLd";
import type { Locale } from "@/i18n/routing";
import {
  buildOrganizationJsonLd,
  buildWebSiteJsonLd,
} from "@/lib/seo/json-ld";
import { buildPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata() {
  const locale = (await getLocale()) as Locale;

  return buildPageMetadata({
    pageKey: "home",
    pathname: "/",
    locale,
  });
}

export default async function HomePage() {
  const locale = (await getLocale()) as Locale;
  const meta = await getTranslations("Meta");

  return (
    <>
      <JsonLd
        data={[
          buildOrganizationJsonLd(),
          buildWebSiteJsonLd({
            locale,
            title: meta("home.title"),
            description: meta("home.description"),
            pathname: "/",
          }),
        ]}
      />

      <HeroSection />

      <AiAssistantSection />

      <LanguagesSection />

      <EmailSection />

      <AiCommentsSection />

      <AppointmentSection />

      <AiCallsSection />

      <CampaignSection />
    </>
  );
}
