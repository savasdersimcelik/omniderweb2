import { getLocale, getTranslations } from "next-intl/server";
import { LanguagesSection } from "@/components/home/LanguagesSection";
import { Container } from "@/components/layout/Container";
import { JsonLd } from "@/components/seo/JsonLd";
import { PlatformIcon } from "@/components/ui/PlatformIcon";
import { featuredPlatforms } from "@/config/platforms";
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
  const tNav = await getTranslations("Nav");
  const meta = await getTranslations("Meta");
  const blocks = t.raw("blocks") as Array<{
    title: string;
    description: string;
  }>;
  const steps = t.raw("steps") as Array<{
    title: string;
    description: string;
  }>;

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

      <section className="section-hero">
        <Container className="section">
          <div className="max-w-3xl space-y-6">
            <p className="eyebrow">{t("eyebrow")}</p>
            <h1 className="heading-hero">{t("title")}</h1>
            <p className="text-lead">{t("description")}</p>
            <div className="flex flex-wrap gap-3 pt-1">
              <Link href="/contact" className="btn-primary">
                {t("ctaPrimary")}
              </Link>
              <Link href="/contact" className="btn-secondary">
                {t("ctaSecondary")}
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-surface">
        <Container className="section">
          <div className="mx-auto max-w-2xl space-y-3 text-center">
            <p className="eyebrow">{t("featuresEyebrow")}</p>
            <h2 className="heading-section">{t("featuresTitle")}</h2>
            <p className="text-body">{t("featuresDescription")}</p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {blocks.map((block) => (
              <article key={block.title} className="surface-card surface-card-hover">
                <h3 className="text-lg font-semibold text-ink">{block.title}</h3>
                <p className="mt-2 text-sm leading-6 text-ink-muted">
                  {block.description}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <LanguagesSection />

      <section className="section-muted">
        <Container className="section">
          <div className="max-w-2xl space-y-3">
            <p className="eyebrow">{t("platformsEyebrow")}</p>
            <h2 className="heading-section">{t("platformsTitle")}</h2>
            <p className="text-body">{t("platformsDescription")}</p>
          </div>
          <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {featuredPlatforms.map((platform) => (
              <li
                key={platform.key}
                className="flex items-center gap-3 rounded-xl bg-surface px-4 py-3.5 text-sm font-semibold text-ink ring-1 ring-line"
              >
                <PlatformIcon
                  name={platform.icon}
                  alt=""
                  frameClassName="h-10 w-10 bg-transparent ring-0"
                  size={24}
                />
                <span>{tNav(`items.${platform.key}`)}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-surface">
        <Container className="section">
          <div className="mx-auto max-w-2xl space-y-3 text-center">
            <p className="eyebrow">{t("stepsEyebrow")}</p>
            <h2 className="heading-section">{t("stepsTitle")}</h2>
          </div>
          <ol className="mt-10 grid gap-6 lg:grid-cols-3">
            {steps.map((step, index) => (
              <li key={step.title} className="space-y-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 text-sm font-bold text-brand-700 ring-1 ring-brand-100">
                  {index + 1}
                </span>
                <h3 className="text-lg font-semibold text-ink">{step.title}</h3>
                <p className="text-sm leading-6 text-ink-muted">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="section-muted">
        <Container className="section">
          <div className="mx-auto max-w-2xl space-y-5 text-center">
            <p className="eyebrow">{t("ctaEyebrow")}</p>
            <h2 className="heading-section">{t("ctaTitle")}</h2>
            <p className="text-body">{t("ctaDescription")}</p>
            <div className="flex flex-wrap justify-center gap-3 pt-1">
              <Link href="/contact" className="btn-primary">
                {t("ctaPrimary")}
              </Link>
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
