import { getLocale, getTranslations } from "next-intl/server";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { Container } from "@/components/layout/Container";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata() {
  const locale = (await getLocale()) as Locale;

  return buildPageMetadata({
    pageKey: "privacyPolicy",
    pathname: "/privacy-policy",
    locale,
  });
}

export default async function PrivacyPolicyPage() {
  const t = await getTranslations("PrivacyPolicyPage");
  const sections = t.raw("sections") as Array<{
    title: string;
    paragraphs?: string[];
    list?: string[];
  }>;

  return (
    <Container as="section" className="section-sm">
      <LegalDocument
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
        lastUpdatedLabel={t("lastUpdatedLabel")}
        lastUpdated={t("lastUpdated")}
        intro={t.raw("intro") as string[]}
        sections={sections}
        contactTitle={t("contactTitle")}
        contactBody={t("contactBody")}
        contactEmail={t("contactEmail")}
      />
    </Container>
  );
}
