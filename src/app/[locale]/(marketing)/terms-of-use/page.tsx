import { getLocale, getTranslations } from "next-intl/server";
import {
  LegalDocument,
  type LegalSection,
} from "@/components/legal/LegalDocument";
import "@/components/legal/legal.css";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata() {
  const locale = (await getLocale()) as Locale;

  return buildPageMetadata({
    pageKey: "termsOfUse",
    pathname: "/terms-of-use",
    locale,
  });
}

export default async function TermsOfUsePage() {
  const t = await getTranslations("TermsOfUsePage");

  return (
    <LegalDocument
      eyebrow={t("eyebrow")}
      title={t("title")}
      subtitle={t("subtitle")}
      lastUpdatedLabel={t("lastUpdatedLabel")}
      lastUpdated={t("lastUpdated")}
      lastUpdatedIso={t("lastUpdatedIso")}
      intro={t.raw("intro") as string[]}
      sections={t.raw("sections") as LegalSection[]}
    />
  );
}
