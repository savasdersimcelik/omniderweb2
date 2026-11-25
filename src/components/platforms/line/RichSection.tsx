"use client";

import { useState } from "react";
import { LayersIcon, MousePointerClickIcon, PackageIcon } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";

type TabId = "product" | "buttons";

type Fact = { value: string; label: string };

type TabCopy = { title: string; desc: string };

const TAB_IDS: TabId[] = ["product", "buttons"];

const TAB_ICONS = {
  product: PackageIcon,
  buttons: MousePointerClickIcon,
} as const;

export function RichSection() {
  const t = useTranslations("PlatformLine.rich");
  const [tab, setTab] = useState<TabId>("product");

  const tabCopy = t.raw("tabs") as Record<TabId, TabCopy>;
  const facts = t.raw("facts") as Fact[];
  const specs = t.raw("product.card.specs") as Array<{
    label: string;
    value: string;
  }>;
  const slides = t.raw("product.card.slides") as string[];
  const template = t.raw("buttons.template") as string[];
  const quick = t.raw("buttons.quick") as string[];
  const cardButtons = t.raw("product.card.buttons") as string[];

  return (
    <section
      id="rich"
      className="ln-rich border-t border-line"
      aria-labelledby="ln-rich-title"
    >
      <Container className="section">
        <header className="mx-auto max-w-3xl text-center">
          <p className="eyebrow inline-flex items-center justify-center gap-2 text-[var(--ln-hero-deep)]">
            <LayersIcon className="h-3.5 w-3.5" />
            {t("eyebrow")}
          </p>
          <h2 id="ln-rich-title" className="heading-section mt-3 text-balance">
            {t("title")}
          </h2>
          <p className="ln-lede text-body mt-4">{t("subtitle")}</p>
        </header>

        <div className="ln-rich__layout mt-8">
          <div className="ln-rich__stage">
            <p className="ln-rich__demo">{t("demoNote")}</p>

            {TAB_IDS.map((panelId) =>
              tab !== panelId ? null : (
                <div
                  key={panelId}
                  id={`ln-rich-panel-${panelId}`}
                  role="tabpanel"
                  aria-labelledby={`ln-rich-tab-${panelId}`}
                  className="ln-rich__panel"
                >
                  {panelId === "product" ? (
                    <div className="ln-phone">
                      <header className="ln-phone__top">
                        <Image
                          src="/icons/platforms/line.png"
                          alt=""
                          width={20}
                          height={20}
                          className="h-5 w-5"
                          unoptimized
                        />
                        <span className="min-w-0">
                          <strong>{t("accountName")}</strong>
                          <small>{t("accountStatus")}</small>
                        </span>
                      </header>
                      <div className="ln-phone__chat">
                        <p className="ln-bubble ln-bubble--user">
                          {t("product.customer")}
                        </p>
                        <div className="ln-carousel">
                          {slides.map((color, index) => (
                            <article key={color} className="ln-flex-card">
                              <div
                                className={cn(
                                  "ln-flex-card__shot",
                                  index === 0 && "is-black",
                                  index === 1 && "is-olive",
                                  index === 2 && "is-navy",
                                )}
                              />
                              <div className="ln-flex-card__body">
                                <p className="ln-flex-card__name">
                                  {t("product.card.name")}
                                </p>
                                <span className="ln-flex-card__sku">
                                  {t("product.card.sku")}
                                </span>
                                <p className="ln-flex-card__stock">
                                  {t("product.card.stock")}
                                </p>
                                <div className="ln-flex-card__price">
                                  <strong>{t("product.card.price")}</strong>
                                  <span>{t("product.card.oldPrice")}</span>
                                  <em>{t("product.card.discount")}</em>
                                </div>
                                <ul className="ln-flex-card__specs">
                                  <li>
                                    <b>{specs[0]?.label}</b>
                                    <span>
                                      {index === 0 ? specs[0]?.value : color}
                                    </span>
                                  </li>
                                  <li>
                                    <b>{specs[1]?.label}</b>
                                    <span>{specs[1]?.value}</span>
                                  </li>
                                </ul>
                                <p className="ln-flex-card__tags">
                                  {t("product.card.tags")}
                                </p>
                              </div>
                              <div className="ln-flex-card__foot">
                                {cardButtons.map((label, i) => (
                                  <span
                                    key={label}
                                    className={cn(i === 0 && "is-primary")}
                                  >
                                    {label}
                                  </span>
                                ))}
                              </div>
                            </article>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {panelId === "buttons" ? (
                    <div className="ln-phone ln-phone--buttons">
                      <header className="ln-phone__top">
                        <Image
                          src="/icons/platforms/line.png"
                          alt=""
                          width={20}
                          height={20}
                          className="h-5 w-5"
                          unoptimized
                        />
                        <span className="min-w-0">
                          <strong>{t("accountName")}</strong>
                          <small>{t("accountStatus")}</small>
                        </span>
                      </header>
                      <div className="ln-phone__chat">
                        <div className="ln-template">
                          <p>{t("buttons.message")}</p>
                          <div className="ln-template__grid">
                            {template.map((label, i) => (
                              <span
                                key={label}
                                className={cn(i === 1 && "is-hit")}
                              >
                                {label}
                              </span>
                            ))}
                          </div>
                        </div>
                        <p className="ln-bubble ln-bubble--user">
                          {t("buttons.reply")}
                        </p>
                        <div className="ln-quick">
                          {quick.map((label) => (
                            <span key={label}>{label}</span>
                          ))}
                        </div>
                      </div>
                      <aside className="ln-inbox-toast">
                        <Image
                          src="/icon.png"
                          alt=""
                          width={28}
                          height={28}
                          className="h-7 w-7 rounded-md"
                          unoptimized
                        />
                        <p>
                          <small>{t("buttons.panelKicker")}</small>
                          <strong>{t("buttons.panelBody")}</strong>
                        </p>
                      </aside>
                    </div>
                  ) : null}
                </div>
              ),
            )}
          </div>

          <div className="ln-rich__copy">
            <p className="ln-rich__demo ln-rich__demo--align" aria-hidden>
              {t("demoNote")}
            </p>

            <div
              className="ln-rich__aside-tabs"
              role="tablist"
              aria-label={t("tabsLabel")}
            >
              {TAB_IDS.map((id) => {
                const Icon = TAB_ICONS[id];
                const item = tabCopy[id];
                return (
                  <button
                    key={id}
                    type="button"
                    role="tab"
                    id={`ln-rich-tab-${id}`}
                    aria-selected={tab === id}
                    aria-controls={`ln-rich-panel-${id}`}
                    tabIndex={tab === id ? 0 : -1}
                    className={cn(
                      "ln-rich__aside-tab",
                      tab === id && "is-on",
                    )}
                    onClick={() => setTab(id)}
                  >
                    <span className="ln-rich__aside-ico" aria-hidden>
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="ln-rich__aside-tab-copy">
                      <strong>{item.title}</strong>
                      <span>{item.desc}</span>
                    </span>
                  </button>
                );
              })}
            </div>

            <ul className="ln-facts">
              {facts.map((fact) => (
                <li key={fact.label}>
                  <strong>{fact.value}</strong>
                  <span>{fact.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}