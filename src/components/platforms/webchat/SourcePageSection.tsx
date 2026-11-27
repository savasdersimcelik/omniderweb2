"use client";

import { Globe, MessageCircle, Monitor, ShoppingBag, ShoppingCart } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Container } from "@/components/layout/Container";

const pages = [
  { id: "product", path: "/products/aura", Icon: ShoppingBag },
  { id: "cart", path: "/cart", Icon: ShoppingCart },
] as const;

export function SourcePageSection() {
  const t = useTranslations("PlatformWebchat.sourcePage");
  const [page, setPage] = useState<(typeof pages)[number]>(pages[0]);
  const address = `shop.example.com${page.path}`;

  return (
    <section id="source-page" className="wc-feature border-t border-line" aria-labelledby="wc-source-title">
      <Container className="section wc-source-layout">
        <header className="wc-feature-copy">
          <h2 id="wc-source-title" className="heading-section text-balance">{t("title")}</h2>
          <p className="text-body text-pretty">{t("description")}</p>
        </header>
        <div className="wc-feature-stage wc-source-stage">
          <div className="wc-source-options" role="group" aria-label={t("choosePage")}>
            {pages.map((option) => (
              <button key={option.id} type="button" aria-pressed={page.id === option.id} onClick={() => setPage(option)}>
                <option.Icon size={17} aria-hidden="true" />
                {t(`pages.${option.id}.label`)}
              </button>
            ))}
          </div>
          <div className="wc-source-grid" aria-live="polite">
            <article className="wc-source-card">
              <h3><Monitor size={18} aria-hidden="true" />{t("visitor")}</h3>
              <div className="wc-source-card-body">
                <div className="wc-source-url"><Globe size={16} aria-hidden="true" />{address}</div>
                <p className="wc-widget-bubble wc-widget-bubble-out">{t(`pages.${page.id}.message`)}</p>
                <p className="wc-widget-bubble">{t(`pages.${page.id}.reply`)}</p>
              </div>
            </article>
            <article className="wc-source-card">
              <h3><MessageCircle size={18} aria-hidden="true" />{t("inbox")}</h3>
              <div className="wc-source-card-body">
                <div className="wc-source-context">
                  <Globe size={18} aria-hidden="true" />
                  <div className="min-w-0">
                    <p className="wc-source-meta">{t("sourceLabel")}</p>
                    <p className="wc-source-name">{t(`pages.${page.id}.name`)}</p>
                    <p className="wc-source-address">{address}</p>
                  </div>
                </div>
                <p className="wc-widget-bubble">{t(`pages.${page.id}.message`)}</p>
              </div>
            </article>
          </div>
        </div>
      </Container>
    </section>
  );
}
