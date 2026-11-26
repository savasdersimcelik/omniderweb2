"use client";

import { useState } from "react";
import { SparklesIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { DemoRequestButton } from "@/components/demo";
import { Container } from "@/components/layout/Container";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

/** systemaimodels sort_order (API key / çarpan yok) */
const MODELS = [
  "assist",
  "standard",
  "flow",
  "advanced",
  "expert",
  "ultra",
] as const;

type ModelId = (typeof MODELS)[number];

export function AiAutomationSection() {
  const t = useTranslations("PlatformWhatsAppBusiness.aiAutomation");
  const [selected, setSelected] = useState<ModelId>("assist");

  return (
    <section
      id="ai"
      className="wa-ai border-y border-line"
      aria-labelledby="wa-ai-title"
    >
      <Container className="section">
        <div className="wa-ai__layout">
          <div className="wa-ai__copy">
            <p className="wa-section-label">
              <SparklesIcon />
              {t("eyebrow")}
            </p>
            <h2 id="wa-ai-title" className="heading-section mt-3 text-balance">
              {t("title")}
            </h2>
            <p className="text-body mt-4 text-pretty">{t("subtitle")}</p>
            <div className="wa-ai__actions">
              <DemoRequestButton
                source="whatsapp-business-ai"
                className="btn-primary"
              >
                {t("ctaPrimary")}
              </DemoRequestButton>
              <Link href="/register" className="btn-secondary">
                {t("ctaSecondary")}
              </Link>
            </div>
          </div>

          <article className="wa-ai__card">
            <div className="wa-ai__card-head">
              <h3 className="wa-ai__card-title">{t("catalogTitle")}</h3>
              <span className="wa-ai__pill">{t("catalogBadge")}</span>
            </div>

            <div
              className="wa-ai__models"
              role="tablist"
              aria-label={t("catalogTitle")}
            >
              {MODELS.map((id) => {
                const on = id === selected;
                return (
                  <button
                    key={id}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    className={cn("wa-ai__model", on && "is-on")}
                    onClick={() => setSelected(id)}
                  >
                    <span className="wa-ai__model-name">
                      {t(`models.${id}.short`)}
                    </span>
                    <span className="wa-ai__model-tag">
                      {t(`models.${id}.tag`)}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="wa-ai__detail" aria-live="polite">
              <div className="wa-ai__detail-top">
                <p className="wa-ai__detail-title">
                  {t("detailTitle", { name: t(`models.${selected}.short`) })}
                </p>
                <span className="wa-ai__detail-meta">{t("langDetect")}</span>
              </div>
              <p className="wa-ai__detail-desc">
                {t(`models.${selected}.description`)}
              </p>
            </div>
          </article>
        </div>
      </Container>
    </section>
  );
}
