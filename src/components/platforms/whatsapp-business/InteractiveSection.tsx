"use client";

import { useEffect, useState } from "react";
import {
  BotIcon,
  CheckIcon,
  ExternalLinkIcon,
  ListIcon,
  MessageCircleIcon,
  GlobeIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";

const TABS = ["buttons", "list", "link"] as const;
type TabId = (typeof TABS)[number];

type ListRow = {
  title: string;
  description: string;
  picked?: boolean;
  out?: boolean;
};

function ProductShot() {
  return (
    <svg viewBox="0 0 320 168" className="h-full w-full" aria-hidden>
      <rect width="320" height="168" fill="#f4ece4" />
      <circle cx="232" cy="34" r="46" fill="#fff" opacity="0.45" />
      <ellipse
        cx="160"
        cy="150"
        rx="64"
        ry="7"
        fill="rgb(62 42 24 / 0.1)"
      />
      <path
        fill="#f7f1e8"
        stroke="#e4d3c0"
        strokeWidth="1"
        d="M160 64c-10 0-18-10-32-14l-24 10-26 34 26 12 8-20v52h96V86l8 20 26-12-26-34-24-10c-14 4-22 14-32 14Z"
      />
      <path
        fill="#eadccb"
        d="M146 58c4 14 24 16 28 2-2 12-10 18-14 18s-12-6-14-20Z"
      />
      <path d="M160 76v48" stroke="#cbb39c" strokeWidth="1.4" />
      <circle cx="160" cy="88" r="1.5" fill="#b89a80" />
      <circle cx="160" cy="102" r="1.5" fill="#b89a80" />
      <circle cx="160" cy="116" r="1.5" fill="#b89a80" />
    </svg>
  );
}

export function InteractiveSection() {
  const t = useTranslations("PlatformWhatsAppBusiness.interactive");
  const [tab, setTab] = useState<TabId>("buttons");
  const [paused, setPaused] = useState(false);
  const [tick, setTick] = useState(0);
  const options = t.raw("buttons.options") as string[];
  const listRows = t.raw("list.rows") as ListRow[];
  const picked = listRows.find((row) => row.picked) ?? listRows[0];

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setTab((prev) => {
        const idx = TABS.indexOf(prev);
        return TABS[(idx + 1) % TABS.length];
      });
      setTick((n) => n + 1);
    }, 4800);
    return () => window.clearInterval(id);
  }, [paused]);

  const select = (id: TabId) => {
    setTab(id);
    setTick((n) => n + 1);
  };

  return (
    <section
      id="interactive"
      className="wa-interactive border-t border-line"
      aria-labelledby="wa-interactive-title"
      data-tab={tab}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Container className="section">
        <div className="wa-section-stack">
          <header className="mx-auto max-w-3xl text-center">
            <p className="eyebrow inline-flex items-center gap-2 text-[var(--wa-teal)]">
              <MessageCircleIcon className="h-3.5 w-3.5" />
              {t("eyebrow")}
            </p>
            <h2 id="wa-interactive-title" className="heading-section mt-3">
              {t("title")}
            </h2>
            <p className="text-body mt-4">{t("subtitle")}</p>
          </header>

          <div className="wa-interactive__grid mt-10">
            <div
              className="wa-interactive__copy space-y-3"
              role="tablist"
              aria-label={t("tabsLabel")}
            >
              {TABS.map((id) => {
                const Icon =
                  id === "buttons"
                    ? MessageCircleIcon
                    : id === "list"
                      ? ListIcon
                      : GlobeIcon;
                return (
                  <button
                    key={id}
                    type="button"
                    role="tab"
                    aria-selected={tab === id}
                    className={cn(
                      "flex w-full items-start gap-3 rounded-2xl px-4 py-3 text-left ring-1 transition",
                      tab === id
                        ? "bg-white ring-[color-mix(in_srgb,var(--wa-green)_35%,transparent)] shadow-sm"
                        : "bg-white/60 ring-line hover:bg-white",
                    )}
                    onClick={() => select(id)}
                  >
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[color-mix(in_srgb,var(--wa-green)_12%,white)] text-[var(--wa-teal)]">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span>
                      <strong className="block text-sm font-semibold text-ink">
                        {t(`tabs.${id}`)}
                      </strong>
                      <span className="mt-0.5 block text-xs leading-5 text-ink-subtle">
                        {t(`cards.${id}`)}
                      </span>
                    </span>
                  </button>
                );
              })}

              <div className="flex items-start gap-3 rounded-2xl bg-white/60 px-4 py-3 ring-1 ring-line">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[color-mix(in_srgb,var(--wa-green)_12%,white)] text-[var(--wa-teal)]">
                  <BotIcon className="h-4 w-4" />
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-ink">
                    {t("flow.title")}
                  </h3>
                  <p className="mt-0.5 text-xs leading-5 text-ink-subtle">
                    {t("flow.body")}
                  </p>
                </div>
              </div>
              <p className="text-xs text-ink-faint">{t("note")}</p>
            </div>

            <div className="wa-interactive__stage">
              <div className="wa-interactive__screen">
                <header className="wa-interactive__topbar">
                  <span className="wa-interactive__avatar">
                    {t("phone.name").slice(0, 1)}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-white">
                      {t("phone.name")}
                    </p>
                    <p className="flex items-center gap-1.5 text-[11px] text-white/80">
                      <i className="wa-interactive__online" />
                      {t("phone.status")}
                    </p>
                  </div>
                </header>

                <div className="wa-interactive__chat" key={`${tab}-${tick}`}>
                  {tab === "buttons" ? (
                    <div className="wa-interactive__scene is-buttons">
                      <article className="wa-interactive__card is-rise">
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
                              {index === 0 ? (
                                <i className="wa-interactive__ripple" />
                              ) : null}
                            </span>
                          ))}
                        </div>
                      </article>
                      <p className="wa-interactive__bubble is-out is-from-right">
                        {options[0]}
                      </p>
                      <p className="wa-interactive__bubble is-in is-rise is-late">
                        {t("buttons.follow")}
                      </p>
                    </div>
                  ) : null}

                  {tab === "list" ? (
                    <div className="wa-interactive__scene is-list">
                      <article className="wa-interactive__card is-rise">
                        <p className="wa-interactive__card-body">
                          {t("list.body")}
                        </p>
                        <div className="wa-interactive__actions">
                          <span className="wa-interactive__choice is-hit">
                            <ListIcon className="h-3.5 w-3.5" />
                            {t("list.cta")}
                            <i className="wa-interactive__ripple" />
                          </span>
                        </div>
                      </article>

                      <div className="wa-interactive__sheet">
                        <span className="wa-interactive__grab" />
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
                                <>
                                  <CheckIcon className="wa-interactive__check h-4 w-4" />
                                  <i className="wa-interactive__ripple" />
                                </>
                              ) : null}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <p className="wa-interactive__bubble is-out is-from-right is-list-pick">
                        {picked?.title}
                      </p>
                      <p className="wa-interactive__bubble is-in is-detail is-rise is-list-detail">
                        <strong>{picked?.title}</strong>
                        <span>{t("list.detail")}</span>
                      </p>
                    </div>
                  ) : null}

                  {tab === "link" ? (
                    <div className="wa-interactive__scene is-link">
                      <article className="wa-interactive__card is-rise">
                        <p className="wa-interactive__card-body">
                          {t("link.body")}
                        </p>
                        <div className="wa-interactive__actions">
                          <span className="wa-interactive__choice">
                            <ExternalLinkIcon className="h-3.5 w-3.5" />
                            {t("link.cta")}
                          </span>
                        </div>
                      </article>
                    </div>
                  ) : null}
                </div>
              </div>
              <p className="wa-interactive__badge">{t("badge")}</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
