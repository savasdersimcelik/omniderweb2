import { getLocale, getTranslations } from "next-intl/server";
import { DemoRequestButton } from "@/components/demo";
import { AiCallsSection } from "@/components/home/AiCallsSection";
import { HeroSection } from "@/components/home/HeroSection";
import { LanguagesSection } from "@/components/home/LanguagesSection";
import { Container } from "@/components/layout/Container";
import { JsonLd } from "@/components/seo/JsonLd";
import { Link } from "@/i18n/navigation";
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
  const t = await getTranslations("HomePage");
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

      <LanguagesSection />

      <AiCallsSection />

      <section className="section-muted">
        <Container className="section">
          <div className="mx-auto max-w-2xl space-y-5 text-center">
            <p className="eyebrow">{t("ctaEyebrow")}</p>
            <h2 className="heading-section">{t("ctaTitle")}</h2>
            <p className="text-body">{t("ctaDescription")}</p>
            <div className="flex flex-wrap justify-center gap-3 pt-1">
              <DemoRequestButton source="home-cta" className="btn-primary">
                {t("ctaPrimary")}
              </DemoRequestButton>
              <Link href="/contact" className="btn-secondary">
                {t("ctaSecondary")}
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
