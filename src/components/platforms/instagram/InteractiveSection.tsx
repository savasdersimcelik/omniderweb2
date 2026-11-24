"use client";

import Image from "next/image";
import {
  CheckIcon,
  ExternalLinkIcon,
  MessageCircleIcon,
  SparklesIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";

const COLUMNS = [
  { id: "quick" as const, Icon: MessageCircleIcon },
  { id: "ice" as const, Icon: SparklesIcon },
  { id: "card" as const, Icon: ExternalLinkIcon },
];

type IceRow = {
  title: string;
  description: string;
  picked?: boolean;
};

const CARD_IMAGE = "/images/platforms/instagram/comment-post.jpg";

export function InteractiveSection() {
  const t = useTranslations("PlatformInstagram.interactive");
  const quickOptions = t.raw("quick.options") as string[];
  const iceRows = (t.raw("ice.rows") as IceRow[]).slice(0, 3);
  const cardButtons = t.raw("card.buttons") as string[];

  return (
    <section
      id="interactive"
      className="ig-interactive border-t border-line"
      aria-labelledby="ig-interactive-title"
    >
      <Container className="section">
        <div className="wa-section-stack">
          <header className="mx-auto max-w-3xl text-center">
            <p className="eyebrow inline-flex items-center justify-center gap-2 text-[var(--ig-purple)]">
              <MessageCircleIcon className="h-3.5 w-3.5" />
              {t("eyebrow")}
            </p>
            <h2 id="ig-interactive-title" className="heading-section mt-3">
              {t("title")}
            </h2>
            <p className="ig-interactive__subtitle text-body mt-4">
              {t("subtitle")}
            </p>
          </header>

          <div className="ig-interactive__cols">
            {COLUMNS.map(({ id, Icon }) => (
              <article key={id} className="ig-interactive__col">
                <div className="ig-interactive__col-copy">
                  <div className="ig-interactive__col-heading">
                    <span className="ig-interactive__col-icon">
                      <Icon className="h-4 w-4" />
                    </span>
                    <h3 className="ig-interactive__col-title">
                      {t(`tabs.${id}`)}
                    </h3>
                  </div>
                  <p className="ig-interactive__col-desc">{t(`cards.${id}`)}</p>
                </div>

                <div className="ig-interactive__widget">
                  {id === "quick" ? (
                    <div className="ig-interactive__widget-inner is-quick">
                      <article className="ig-interactive__card">
                        <p className="ig-interactive__card-body">
                          {t("quick.prompt")}
                        </p>
                        <div className="ig-interactive__actions">
                          {quickOptions.map((label, index) => (
                            <span
                              key={label}
                              className={cn(
                                "ig-interactive__choice",
                                index === 0 && "is-hit",
                              )}
                            >
                              {label}
                            </span>
                          ))}
                        </div>
                      </article>
                      <p className="ig-interactive__bubble is-out">
                        {quickOptions[0]}
                      </p>
                      <p className="ig-interactive__bubble is-in">
                        {t("quick.follow")}
                      </p>
                    </div>
                  ) : null}

                  {id === "ice" ? (
                    <div className="ig-interactive__widget-inner is-ice">
                      <article className="ig-interactive__card">
                        <p className="ig-interactive__card-body">
                          {t("ice.intro")}
                        </p>
                        <div className="ig-interactive__actions">
                          <span className="ig-interactive__choice is-hit">
                            <SparklesIcon className="h-3.5 w-3.5" />
                            {t("ice.cta")}
                          </span>
                        </div>
                      </article>
                      <div className="ig-interactive__sheet">
                        <p className="ig-interactive__sheet-title">
                          {t("ice.sheet")}
                        </p>
                        <ul className="ig-interactive__rows">
                          {iceRows.map((row) => (
                            <li
                              key={row.title}
                              className={cn(
                                "ig-interactive__row",
                                row.picked && "is-picked",
                              )}
                            >
                              <span>
                                <strong>{row.title}</strong>
                                <small>{row.description}</small>
                              </span>
                              {row.picked ? (
                                <CheckIcon className="ig-interactive__check h-4 w-4" />
                              ) : null}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : null}

                  {id === "card" ? (
                    <div className="ig-interactive__widget-inner is-card">
                      <article className="ig-interactive__card">
                        <div className="ig-interactive__shot relative">
                          <Image
                            src={CARD_IMAGE}
                            alt=""
                            fill
                            className="object-cover"
                            sizes="320px"
                            unoptimized
                          />
                        </div>
                        <p className="ig-interactive__card-body">
                          {t("card.title")}
                        </p>
                        <p className="ig-interactive__card-sub">
                          {t("card.subtitle")}
                        </p>
                        <div className="ig-interactive__actions">
                          {cardButtons.map((label, index) => (
                            <span
                              key={label}
                              className={cn(
                                "ig-interactive__choice",
                                index === 0 && "is-hit",
                              )}
                            >
                              {index === 0 ? (
                                <ExternalLinkIcon className="h-3.5 w-3.5" />
                              ) : null}
                              {label}
                            </span>
                          ))}
                        </div>
                      </article>
                      <div className="ig-interactive__link-preview">
                        <span className="ig-interactive__link-dot" />
                        <div className="min-w-0">
                          <p className="truncate text-xs font-semibold text-ink">
                            {t("card.previewTitle")}
                          </p>
                          <p className="truncate text-[11px] text-ink-subtle">
                            {t("card.previewUrl")}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
