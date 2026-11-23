import { ArrowRight, CheckCircle2 } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";
import { Link } from "@/i18n/navigation";

export async function PricingHero() {
  const t = await getTranslations("PricingPage.hero");
  const highlights = t.raw("highlights") as string[];
  const rows = t.raw("preview.rows") as Array<{
    label: string;
    value: string;
  }>;

  return (
    <section className="pricing-hero" aria-labelledby="pricing-hero-title">
      <Container className="pricing-hero__inner">
        <div className="pricing-hero__copy">
          <h1 id="pricing-hero-title" className="pricing-hero__title">
            <span>{t("titleLead")}</span>{" "}
            <span className="pricing-hero__title-accent">{t("titleAccent")}</span>
          </h1>
          <p className="pricing-hero__desc">{t("subtitle")}</p>

          <ul className="pricing-hero__highlights">
            {highlights.map((item) => (
              <li key={item}>
                <CheckCircle2 className="size-4" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="pricing-hero__actions">
            <a href="#packages" className="btn-primary">
              {t("ctaPrimary")}
              <ArrowRight className="size-4" aria-hidden />
            </a>
            <Link href="/register" className="btn-secondary">
              {t("ctaSecondary")}
            </Link>
          </div>
        </div>

        <aside className="pricing-hero__panel" aria-hidden="true">
          <div className="pricing-hero__panel-card">
            <div className="pricing-hero__panel-bar">
              <span className="pricing-hero__panel-dot" />
              <span>{t("preview.live")}</span>
            </div>
            <p className="pricing-hero__panel-title">{t("preview.title")}</p>
            <p className="pricing-hero__panel-body">{t("preview.body")}</p>
            <ul className="pricing-hero__panel-rows">
              {rows.map((row) => (
                <li key={row.label}>
                  <span>{row.label}</span>
                  <strong>{row.value}</strong>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </Container>
    </section>
  );
}
