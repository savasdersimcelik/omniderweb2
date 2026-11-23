"use client";

import { useEffect, useState } from "react";
import {
  BotIcon,
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

export function InteractiveSection() {
  const t = useTranslations("PlatformWhatsAppBusiness.interactive");
  const [tab, setTab] = useState<TabId>("buttons");
  const [paused, setPaused] = useState(false);
  const options = t.raw("buttons.options") as string[];
  const listRows = t.raw("list.rows") as ListRow[];

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setTab((prev) => {
        const idx = TABS.indexOf(prev);
        return TABS[(idx + 1) % TABS.length];
      });
    }, 4200);
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <section
      id="interactive"
      className="wa-interactive border-t border-line bg-surface-subtle/40"
      aria-labelledby="wa-interactive-title"
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

          <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start">
            <div className="space-y-3" role="tablist" aria-label={t("tabsLabel")}>
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
                        : "bg-transparent ring-line hover:bg-white/70",
                    )}
                    onClick={() => setTab(id)}
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

              <div className="flex items-start gap-3 rounded-2xl px-4 py-3 ring-1 ring-line">
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
              <div className="wa-chat wa-chat--compact mx-auto">
                <div className="wa-chat__phone">
                  <div className="wa-chat__notch" />
                  <header className="wa-chat__topbar">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-xs font-bold text-white">
                      {t("phone.name").slice(0, 1)}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-white">
                        {t("phone.name")}
                      </p>
                      <p className="text-[11px] text-white/75">
                        {t("phone.status")}
                      </p>
                    </div>
                  </header>

                  <div className="wa-chat__thread">
                    {tab === "buttons" ? (
                      <>
                        <div className="wa-chat__row wa-chat__row--in">
                          <div className="wa-chat__bubble wa-chat__bubble--in">
                            <p>{t("buttons.body")}</p>
                          </div>
                        </div>
                        <div className="wa-chat__row wa-chat__row--in">
                          <div className="wa-chat__actions">
                            {options.map((label) => (
                              <span key={label} className="wa-chat__action">
                                {label}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="wa-chat__row wa-chat__row--out">
                          <div className="wa-chat__bubble wa-chat__bubble--out">
                            <p>{options[0]}</p>
                            <span className="wa-chat__ticks">✓✓</span>
                          </div>
                        </div>
                        <div className="wa-chat__row wa-chat__row--in">
                          <div className="wa-chat__bubble wa-chat__bubble--in">
                            <p>{t("buttons.follow")}</p>
                          </div>
                        </div>
                      </>
                    ) : null}

                    {tab === "list" ? (
                      <>
                        <div className="wa-chat__row wa-chat__row--in">
                          <div className="wa-chat__bubble wa-chat__bubble--in">
                            <p>{t("list.body")}</p>
                          </div>
                        </div>
                        <div className="wa-chat__sheet">
                          <p className="wa-chat__sheet-title">{t("list.sheet")}</p>
                          <ul>
                            {listRows.map((row) => (
                              <li
                                key={row.title}
                                className={cn(
                                  "wa-chat__sheet-row",
                                  row.picked && "is-picked",
                                  row.out && "is-out",
                                )}
                              >
                                <span>{row.title}</span>
                                <small>{row.description}</small>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <p className="wa-chat__system">{t("list.detail")}</p>
                      </>
                    ) : null}

                    {tab === "link" ? (
                      <>
                        <div className="wa-chat__row wa-chat__row--in">
                          <div className="wa-chat__bubble wa-chat__bubble--in">
                            <p>{t("link.body")}</p>
                            <span className="wa-chat__cta-link">{t("link.cta")}</span>
                          </div>
                        </div>
                        <p className="wa-chat__system">{t("badge")}</p>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
