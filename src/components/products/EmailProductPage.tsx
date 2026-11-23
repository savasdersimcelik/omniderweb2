import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";

export async function EmailProductPage() {
  const t = await getTranslations("EmailProductPage");

  return (
    <Container as="section" className="section">
      <header className="mx-auto max-w-3xl space-y-4 text-center">
        <p className="eyebrow">{t("eyebrow")}</p>
        <h1 className="heading-page">{t("title")}</h1>
        <p className="text-body">{t("comingSoon")}</p>
      </header>
    </Container>
  );
}
