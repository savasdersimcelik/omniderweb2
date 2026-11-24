"use client";

import { MousePointerClickIcon } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";
import { ProductArt } from "./ProductArt";

const TABS = ["cards", "quick", "actions"] as const;
type Tab = (typeof TABS)[number];

type Product = {
  name: string;
  price: string;
  tone: "bag" | "shoe" | "watch";
};

type Action = {
  id: "url" | "call" | "email";
  label: string;
};

const FACTS = ["cards", "quick", "actions", "flow"] as const;

export function InteractiveSection() {
  const t = useTranslations("PlatformMessenger.interactive");
  const [tab, setTab] = useState<Tab>("cards");
  const products = t.raw("demo.products") as Product[];
  const quick = t.raw("demo.quick") as string[];
  const actions = t.raw("demo.actions") as Action[];
  const pageName = t("demo.phoneName");

  return (
    <section
      id="interactive"
      className="ms-ix border-t border-line"
      aria-labelledby="ms-ix-title"
    >
      <Container className="section">
        <div className="wa-section-stack">
          <header className="mx-auto max-w-3xl text-center">
            <p className="eyebrow inline-flex items-center justify-center gap-2 text-[var(--color-messenger-blue)]">
              <MousePointerClickIcon className="h-3.5 w-3.5" />
              {t("eyebrow")}
            </p>
            <h2 id="ms-ix-title" className="heading-section mt-3">
              {t("title")}
            </h2>
            <p className="text-body mt-4">{t("subtitle")}</p>
          </header>

          <div className="ms-ix__layout">
            <div className="ms-ix__stage">
              <div
                className="ms-ix__tabs"
                role="tablist"
                aria-label={t("tabsLabel")}
              >
                {TABS.map((id) => (
                  <button
                    key={id}
                    type="button"
                    role="tab"
                    id={`ms-ix-tab-${id}`}
                    aria-selected={tab === id}
                    aria-controls={`ms-ix-panel-${id}`}
                    tabIndex={tab === id ? 0 : -1}
                    className={cn("ms-ix__tab", tab === id && "is-on")}
                    onClick={() => setTab(id)}
                  >
                    {t(`tabs.${id}`)}
                  </button>
                ))}
              </div>

              <div className="ms-ix__screen">
                <header className="ms-window__top">
                  <span className="ms-window__avatar">{pageName.slice(0, 1)}</span>
                  <span className="min-w-0">
                    <strong>{pageName}</strong>
                    <small>{t("demo.phoneStatus")}</small>
                  </span>
                </header>

                <div
                  id="ms-ix-panel-cards"
                  role="tabpanel"
                  aria-labelledby="ms-ix-tab-cards"
                  hidden={tab !== "cards"}
                  className="ms-ix__panel"
                >
                  <p className="ms-bubble is-in">{t("demo.cardsIntro")}</p>
                  <div className="ms-ix__rail">
                    {products.map((product) => (
                      <article key={product.name} className="ms-ix__pcard">
                        <div className={`ms-product__art is-${product.tone}`}>
                          <ProductArt tone={product.tone} />
                        </div>
                        <p className="ms-product__name">{product.name}</p>
                        <p className="ms-product__price">{product.price}</p>
                        <span className="ms-product__cta">{t("demo.viewProduct")}</span>
                      </article>
                    ))}
                  </div>
                  <p className="ms-bubble is-in">{t("demo.cardsFollow")}</p>
                </div>

                <div
                  id="ms-ix-panel-quick"
                  role="tabpanel"
                  aria-labelledby="ms-ix-tab-quick"
                  hidden={tab !== "quick"}
                  className="ms-ix__panel"
                >
                  <p className="ms-bubble is-in">{t("demo.quickIntro")}</p>
                  <div className="ms-chips">
                    {quick.map((label) => (
                      <span
                        key={label}
                        className={cn(
                          "ms-chip",
                          label === t("demo.quickPicked") && "is-on",
                        )}
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                  <p className="ms-bubble is-out">{t("demo.quickPicked")}</p>
                </div>

                <div
                  id="ms-ix-panel-actions"
                  role="tabpanel"
                  aria-labelledby="ms-ix-tab-actions"
                  hidden={tab !== "actions"}
                  className="ms-ix__panel"
                >
                  <p className="ms-bubble is-in">{t("demo.actionsIntro")}</p>
                  <div className="ms-ix__actions">
                    {actions.map((action) => (
                      <span key={action.id} className="ms-ix__action">
                        {action.label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <ul className="ms-ix__facts">
              {FACTS.map((id) => (
                <li key={id} className="ms-ix__fact">
                  <h3>{t(`facts.${id}.title`)}</h3>
                  <p>{t(`facts.${id}.body`)}</p>
                </li>
              ))}
            </ul>
          </div>

          <p className="ms-ix__note">{t("note")}</p>
        </div>
      </Container>
    </section>
  );
}
