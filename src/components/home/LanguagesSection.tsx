import { getTranslations } from "next-intl/server";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Link } from "@/i18n/navigation";
import { LanguagesMap } from "./LanguagesMap";

export async function LanguagesSection() {
  const t = await getTranslations("HomePage.languages");

  const places = {
    "new-york": t("places.new-york"),
    "mexico-city": t("places.mexico-city"),
    "sao-paulo": t("places.sao-paulo"),
    berlin: t("places.berlin"),
    dubai: t("places.dubai"),
    tokyo: t("places.tokyo"),
  };

  return (
    <section id="languages" className="languages-section">
      <Container className="section">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div className="max-w-xl space-y-6">
            <p className="eyebrow flex items-center gap-2">
              <span
                className="inline-block size-2 shrink-0 rounded-xs bg-brand-600"
                aria-hidden
              />
              {t("eyebrow")}
            </p>

            <h2 className="heading-section text-[1.85rem] leading-[1.15] sm:text-4xl lg:text-[2.65rem]">
              <span className="text-ink">{t("title")}</span>{" "}
              <span className="text-ink-subtle">{t("titleAccent")}</span>
            </h2>

            <p className="text-body max-w-md">{t("description")}</p>

            <div className="flex flex-wrap gap-3 pt-1">
              <Link href="/contact" className="btn-primary">
                {t("ctaPrimary")}
                <ArrowUpRight className="size-4" aria-hidden />
              </Link>
              <Link href="/contact" className="btn-secondary">
                <MessageCircle className="size-4 text-brand-600" aria-hidden />
                {t("ctaSecondary")}
              </Link>
            </div>
          </div>

          <LanguagesMap places={places} hubLabel={t("hub")} />
        </div>
      </Container>
    </section>
  );
}
