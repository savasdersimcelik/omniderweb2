"use client";

import Image from "next/image";
import { LayersIcon, MousePointerClickIcon, PackageIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";

const COLUMNS = [
  { id: "product" as const, Icon: PackageIcon },
  { id: "buttons" as const, Icon: MousePointerClickIcon },
] as const;

type Spec = { label: string; value: string };

export function InteractiveSection() {
  const t = useTranslations("PlatformLine.interactive");
  const specs = t.raw("demo.card.specs") as Spec[];
  const template = t.raw("demo.template") as string[];
  const quick = t.raw("demo.quick") as string[];
  const cardButtons = t.raw("demo.card.buttons") as string[];
  const picked = t("demo.picked");

  return (
    <section
      id="interactive"
      className="ln-interactive border-t border-line"
      aria-labelledby="ln-interactive-title"
    >
      <Container className="section">
        <div className="wa-section-stack">
          <header className="mx-auto max-w-3xl text-center">
            <p className="eyebrow inline-flex items-center justify-center gap-2 text-[var(--ln-hero-deep)]">
              <LayersIcon className="h-3.5 w-3.5" />
              {t("eyebrow")}
            </p>
            <h2 id="ln-interactive-title" className="heading-section mt-3">
              {t("title")}
            </h2>
            <p className="ln-interactive__subtitle text-body mt-4">
              {t("subtitle")}
            </p>
          </header>

          <div className="ln-interactive__cols">
            {COLUMNS.map(({ id, Icon }) => (
              <article key={id} className="ms-interactive__col">
                <div className="ms-interactive__col-copy">
                  <div className="ms-interactive__col-heading">
                    <span className="ms-interactive__col-icon">
                      <Icon className="h-4 w-4" />
                    </span>
                    <h3 className="ms-interactive__col-title">
                      {t(`tabs.${id}`)}
                    </h3>
                  </div>
                  <p className="ms-interactive__col-desc">{t(`cards.${id}`)}</p>
                </div>

                <div className="ms-interactive__widget">
                  {id === "product" ? (
                    <div className="ms-interactive__widget-inner">
                      <p className="ms-interactive__bubble is-in">
                        {t("demo.customer")}
                      </p>
                      <article className="ln-flex-card ln-flex-card--demo is-on">
                        <div
                          className="ln-flex-card__shot is-black"
                          aria-hidden
                        />
                        <div className="ln-flex-card__body">
                          <p className="ln-flex-card__name">
                            {t("demo.card.name")}
                          </p>
                          <p className="ln-flex-card__sku">
                            {t("demo.card.sku")}
                          </p>
                          <p className="ln-flex-card__stock">
                            {t("demo.card.stock")}
                          </p>
                          <div className="ln-flex-card__price">
                            <strong>{t("demo.card.price")}</strong>
                            <span>{t("demo.card.oldPrice")}</span>
                            <em>{t("demo.card.discount")}</em>
                          </div>
                          <ul className="ln-flex-card__specs">
                            {specs.map((spec) => (
                              <li key={spec.label}>
                                <span>{spec.label}</span>
                                <span>{spec.value}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="ln-flex-card__foot">
                          {cardButtons.map((label, index) => (
                            <span
                              key={label}
                              className={index === 0 ? "is-primary" : undefined}
                            >
                              {label}
                            </span>
                          ))}
                        </div>
                      </article>
                    </div>
                  ) : null}

                  {id === "buttons" ? (
                    <div className="ms-interactive__widget-inner">
                      <div className="ln-template">
                        <p>{t("demo.buttonsMessage")}</p>
                        <div className="ln-template__grid">
                          {template.map((label, index) => (
                            <span
                              key={label}
                              className={cn(index === 0 && "is-hit")}
                            >
                              {label}
                            </span>
                          ))}
                        </div>
                        <div className="ln-quick ln-quick--compact">
                          {quick.map((label) => (
                            <span key={label}>{label}</span>
                          ))}
                        </div>
                      </div>
                      <p className="ms-interactive__bubble is-out">{picked}</p>
                      <aside className="ln-inbox-toast ln-inbox-toast--compact">
                        <Image
                          src="/icon.png"
                          alt=""
                          width={24}
                          height={24}
                          className="h-6 w-6 rounded-md"
                          unoptimized
                        />
                        <p>
                          <small>{t("demo.panelKicker")}</small>
                          <strong>{t("demo.panelBody")}</strong>
                        </p>
                      </aside>
                    </div>
                  ) : null}
                </div>
              </article>
            ))}
          </div>

          <p className="ms-interactive__note">{t("note")}</p>
        </div>
      </Container>
    </section>
  );
}