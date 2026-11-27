import {
  ArrowUpRight,
  CheckCircle2Icon,
  Globe,
  Link2,
  MessageCircle,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";

const PRODUCT_PATH = "/products/aura";
const PRODUCT_ADDRESS = `shop.example.com${PRODUCT_PATH}`;

export async function SourcePageSection() {
  const t = await getTranslations("PlatformWebchat.sourcePage");
  const checks = t.raw("checks") as string[];

  return (
    <section
      id="source-page"
      className="wc-feature wc-source border-t border-line"
      aria-labelledby="wc-source-title"
    >
      <Container className="section">
        <div className="wc-source__grid">
          <div className="wc-source__copy">
            <p className="wa-section-label">
              <Globe aria-hidden="true" />
              {t("eyebrow")}
            </p>
            <h2 id="wc-source-title" className="heading-section mt-3 text-balance">
              {t("title")}
            </h2>
            <p className="text-body mt-4 text-pretty">{t("description")}</p>

            <ul className="wc-source__checks">
              {checks.map((item) => (
                <li key={item}>
                  <CheckCircle2Icon
                    className="h-5 w-5 shrink-0 text-[var(--wc-primary)]"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="wc-source__previews">
            <div className="wc-source__cards">
              <article className="wc-source__page">
                <header className="wc-source__page-head">
                  <span className="truncate font-semibold text-ink">
                    {t("pages.product.name")}
                  </span>
                  <span className="shrink-0 text-xs text-ink-subtle">
                    {t("visitor")}
                  </span>
                </header>
                <div className="wc-source__page-media">
                  <span className="wc-source__page-photo" aria-hidden="true" />
                </div>
                <div className="wc-source__page-body">
                  <p className="text-sm leading-snug text-ink">
                    {t("pages.product.message")}
                  </p>
                  <span className="wc-source__page-cta">
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    {t("sendMessage")}
                  </span>
                </div>
              </article>

              <article className="wc-source__inbox">
                <div className="wc-source__referral">
                  <div className="flex items-center justify-between gap-2">
                    <span className="wc-source__badge">{t("sourceLabel")}</span>
                    <span className="font-mono text-[11px] text-ink-subtle">
                      {t("tracked")}
                    </span>
                  </div>
                  <div className="wc-source__referral-row">
                    <span className="wc-source__referral-icon" aria-hidden="true">
                      <Link2 size={16} />
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-ink">
                        {t("pages.product.name")}
                      </p>
                      <p className="truncate text-xs text-ink-subtle">
                        {PRODUCT_ADDRESS}
                      </p>
                    </div>
                    <ArrowUpRight
                      className="ml-auto shrink-0 text-[var(--wc-primary)]"
                      size={16}
                      aria-hidden="true"
                    />
                  </div>
                </div>

                <div className="wc-source__thread">
                  <div className="wc-source__bubble wc-source__bubble--in">
                    <p className="text-sm leading-snug text-ink">
                      {t("pages.product.message")}
                    </p>
                  </div>
                  <div className="wc-source__bubble wc-source__bubble--out">
                    <span className="wc-source__role">{t("replyRole")}</span>
                    <p className="text-sm leading-snug text-ink">
                      {t("pages.product.reply")}
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
