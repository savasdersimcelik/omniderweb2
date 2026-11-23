import { getLocale, getTranslations } from "next-intl/server";
import { ContactForm } from "@/components/contact/ContactForm";
import { Container } from "@/components/layout/Container";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata() {
  const locale = (await getLocale()) as Locale;

  return buildPageMetadata({
    pageKey: "contact",
    pathname: "/contact",
    locale,
  });
}

export default async function ContactPage() {
  const t = await getTranslations("ContactPage");

  return (
    <Container as="section" className="section-sm">
      <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
        <div className="space-y-4">
          <p className="eyebrow">{t("eyebrow")}</p>
          <h1 className="heading-page">{t("title")}</h1>
          <p className="text-body">{t("description")}</p>
          <p className="text-sm text-ink-subtle">{t("privacyNote")}</p>
        </div>

        <div className="surface-card">
          <div className="mb-6 space-y-1">
            <p className="eyebrow">{t("form.eyebrow")}</p>
            <h2 className="text-xl font-semibold text-ink">{t("form.title")}</h2>
            <p className="text-sm text-ink-muted">{t("form.subtitle")}</p>
          </div>
          <ContactForm />
        </div>
      </div>
    </Container>
  );
}
