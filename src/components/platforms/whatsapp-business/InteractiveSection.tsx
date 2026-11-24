"use client";

import {
  CheckIcon,
  ExternalLinkIcon,
  ListIcon,
  MessageCircleIcon,
  GlobeIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";

const COLUMNS = [
  { id: "buttons" as const, Icon: MessageCircleIcon },
  { id: "list" as const, Icon: ListIcon },
  { id: "link" as const, Icon: GlobeIcon },
];

type ListRow = {
  title: string;
  description: string;
  picked?: boolean;
  out?: boolean;
};

function ProductShot() {
  return (
    <svg viewBox="0 0 320 120" className="h-full w-full" aria-hidden>
      <rect width="320" height="120" fill="#f4ece4" />
      <circle cx="250" cy="28" r="36" fill="#fff" opacity="0.45" />
      <path
        fill="#f7f1e8"
        stroke="#e4d3c0"
        strokeWidth="1"
        d="M160 42c-8 0-14-8-26-11l-18 8-20 26 20 9 6-15v40h76V59l6 15 20-9-20-26-18-8c-12 3-18 11-26 11Z"
      />
    </svg>
  );
}

export function InteractiveSection() {
  const t = useTranslations("PlatformWhatsAppBusiness.interactive");
  const options = t.raw("buttons.options") as string[];
  const listRows = (t.raw("list.rows") as ListRow[]).slice(0, 3);

  return (
    <section
      id="interactive"
      className="wa-interactive border-t border-line"
      aria-labelledby="wa-interactive-title"
    >
      <Container className="section">
        <div className="wa-section-stack">
          <header className="mx-auto max-w-3xl text-center">
            <p className="eyebrow inline-flex items-center justify-center gap-2 text-[var(--wa-teal)]">
              <MessageCircleIcon className="h-3.5 w-3.5" />
              {t("eyebrow")}
            </p>
            <h2 id="wa-interactive-title" className="heading-section mt-3">
              {t("title")}
            </h2>
            <p className="wa-interactive__subtitle text-body mt-4">
              {t("subtitle")}
            </p>
          </header>

          <div className="wa-interactive__cols">
            {COLUMNS.map(({ id, Icon }) => (
              <article key={id} className="wa-interactive__col">
                <div className="wa-interactive__col-copy">
                  <div className="wa-interactive__col-heading">
                    <span className="wa-interactive__col-icon">
                      <Icon className="h-4 w-4" />
                    </span>
                    <h3 className="wa-interactive__col-title">
                      {t(`tabs.${id}`)}
                    </h3>
                  </div>
                  <p className="wa-interactive__col-desc">{t(`cards.${id}`)}</p>
                </div>

                <div className="wa-interactive__widget">
                  {id === "buttons" ? (
                    <div className="wa-interactive__widget-inner is-buttons">
                      <article className="wa-interactive__card">
                        <div className="wa-interactive__shot">
                          <ProductShot />
                        </div>
                        <p className="wa-interactive__card-body">
                          {t("buttons.body")}
                        </p>
                        <div className="wa-interactive__actions">
                          {options.map((label, index) => (
                            <span
                              key={label}
                              className={cn(
                                "wa-interactive__choice",
                                index === 0 && "is-hit",
                              )}
                            >
                              {label}
                            </span>
                          ))}
                        </div>
                      </article>
                      <p className="wa-interactive__bubble is-out">{options[0]}</p>
                      <p className="wa-interactive__bubble is-in">
                        {t("buttons.follow")}
                      </p>
                    </div>
                  ) : null}

                  {id === "list" ? (
                    <div className="wa-interactive__widget-inner is-list">
                      <article className="wa-interactive__card">
                        <p className="wa-interactive__card-body">
                          {t("list.body")}
                        </p>
                        <div className="wa-interactive__actions">
                          <span className="wa-interactive__choice is-hit">
                            <ListIcon className="h-3.5 w-3.5" />
                            {t("list.cta")}
                          </span>
                        </div>
                      </article>
                      <div className="wa-interactive__sheet">
                        <p className="wa-interactive__sheet-title">
                          {t("list.sheet")}
                        </p>
                        <ul className="wa-interactive__rows">
                          {listRows.map((row) => (
                            <li
                              key={row.title}
                              className={cn(
                                "wa-interactive__row",
                                row.picked && "is-picked",
                                row.out && "is-out",
                              )}
                            >
                              <span>
                                <strong>{row.title}</strong>
                                <small>{row.description}</small>
                              </span>
                              {row.picked ? (
                                <CheckIcon className="wa-interactive__check h-4 w-4" />
                              ) : null}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : null}

                  {id === "link" ? (
                    <div className="wa-interactive__widget-inner is-link">
                      <article className="wa-interactive__card">
                        <p className="wa-interactive__card-body">
                          {t("link.body")}
                        </p>
                        <div className="wa-interactive__actions">
                          <span className="wa-interactive__choice is-hit">
                            <ExternalLinkIcon className="h-3.5 w-3.5" />
                            {t("link.cta")}
                          </span>
                        </div>
                      </article>
                      <div className="wa-interactive__link-preview">
                        <span className="wa-interactive__link-dot" />
                        <div className="min-w-0">
                          <p className="truncate text-xs font-semibold text-ink">
                            {t("link.previewTitle")}
                          </p>
                          <p className="truncate text-[11px] text-ink-subtle">
                            {t("link.previewUrl")}
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
