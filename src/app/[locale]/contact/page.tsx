import { getLocale, getTranslations } from "next-intl/server";
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
      <div className="max-w-xl space-y-3">
        <h1 className="heading-page">{t("title")}</h1>
        <p className="text-body">{t("description")}</p>
      </div>
    </Container>
  );
}
