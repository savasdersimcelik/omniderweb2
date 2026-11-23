"use client";

import { useEffect, useState } from "react";
import {
  FileTextIcon,
  LayersIcon,
  MapPinIcon,
  MessageCircleIcon,
  MousePointerClickIcon,
  StickerIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";

const TABS = [
  "text",
  "location",
  "poll",
  "button",
  "document",
  "sticker",
] as const;
type TabId = (typeof TABS)[number];

const ICONS = {
  text: MessageCircleIcon,
  location: MapPinIcon,
  poll: LayersIcon,
  button: MousePointerClickIcon,
  document: FileTextIcon,
  sticker: StickerIcon,
} as const;

export function RichMessagesSection() {
  const t = useTranslations("PlatformWhatsAppPersonal.richMessages");
  const [tab, setTab] = useState<TabId>("poll");
  const [paused, setPaused] = useState(false);
  const pollOptions = t.raw("phone.pollOptions") as string[];
  const buttons = t.raw("phone.buttons") as string[];
  const panelKeys = ["button", "location", "edit", "reaction"] as const;

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setTab((prev) => TABS[(TABS.indexOf(prev) + 1) % TABS.length]);
    }, 4200);
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <section
      id="rich-messages"
      className="wap-rich border-t border-line"
      aria-labelledby="wap-rich-title"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Container className="section">
        <div className="wa-section-stack">
          <header className="mx-auto max-w-3xl text-center">
            <p className="eyebrow inline-flex items-center gap-2 text-[var(--wa-teal)]">
              <LayersIcon className="h-3.5 w-3.5" />
              {t("eyebrow")}
            </p>
            <h2 id="wap-rich-title" className="heading-section mt-3">
              {t("title")}
            </h2>
            <p className="text-body mt-4">{t("subtitle")}</p>
          </header>

          <div className="mt-10 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,22.5rem)] lg:items-center lg:gap-7">
            <div
              className="grid grid-cols-2 gap-2 sm:grid-cols-3"
              role="tablist"
              aria-label={t("tabsLabel")}
            >
              {TABS.map((id) => {
                const Icon = ICONS[id];
                return (
                  <button
                    key={id}
                    type="button"
                    role="tab"
                    aria-selected={tab === id}
                    className={cn(
                      "flex items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-semibold ring-1 transition",
                      tab === id
                        ? "bg-white text-[var(--wa-teal)] shadow-sm ring-[color-mix(in_srgb,var(--wa-green)_35%,transparent)]"
                        : "bg-white/70 text-ink-subtle ring-line hover:bg-white",
                    )}
                    onClick={() => setTab(id)}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    {t(`tabs.${id}`)}
                  </button>
                );
              })}

              <div className="col-span-full mt-4 rounded-2xl bg-white/80 p-4 ring-1 ring-line">
                <p className="text-sm font-semibold text-ink">
                  {t("panel.title")}
                </p>
                <ul className="mt-3 space-y-3">
                  {panelKeys.map((key) => (
                    <li key={key}>
                      <p className="text-sm font-semibold text-ink">
                        {t(`panel.items.${key}.title`)}
                      </p>
                      <p className="mt-0.5 text-xs leading-5 text-ink-subtle">
                        {t(`panel.items.${key}.body`)}
                      </p>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-ink-faint">{t("note")}</p>
              </div>
            </div>

            <div className="mx-auto w-full max-w-[22.5rem] lg:mx-0">
              <div className="wap-rich__screen">
                <header className="wap-rich__topbar">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--wa-green)_16%,white)] text-sm font-bold text-[var(--wa-teal)]">
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

                <div className="wap-rich__chat" key={tab}>
                  {tab === "text" ? (
                    <p className="wap-rich__bubble is-in">{t("phone.text")}</p>
                  ) : null}

                  {tab === "location" ? (
                    <article className="wap-rich__card">
                      <div className="flex h-24 items-center justify-center bg-[color-mix(in_srgb,var(--wa-green)_10%,#e8f5e9)]">
                        <MapPinIcon className="h-8 w-8 text-[var(--wa-teal)]" />
                      </div>
                      <div className="p-3">
                        <p className="text-sm font-semibold text-ink">
                          {t("phone.locationTitle")}
                        </p>
                        <p className="mt-1 text-xs text-ink-subtle">
                          {t("phone.locationAddress")}
                        </p>
                      </div>
                    </article>
                  ) : null}

                  {tab === "poll" ? (
                    <article className="wap-rich__card p-3">
                      <p className="text-sm font-semibold text-ink">
                        {t("phone.pollQuestion")}
                      </p>
                      <ul className="mt-3 space-y-2">
                        {pollOptions.map((opt, i) => (
                          <li
                            key={opt}
                            className={cn(
                              "rounded-lg px-3 py-2 text-sm ring-1",
                              i === 0
                                ? "bg-[color-mix(in_srgb,var(--wa-green)_12%,white)] font-semibold text-[var(--wa-teal)] ring-[color-mix(in_srgb,var(--wa-green)_28%,transparent)]"
                                : "bg-white text-ink ring-line",
                            )}
                          >
                            {opt}
                          </li>
                        ))}
                      </ul>
                    </article>
                  ) : null}

                  {tab === "button" ? (
                    <article className="wap-rich__card overflow-hidden">
                      <p className="border-b border-line px-3 py-2.5 text-sm text-ink">
                        {t("phone.buttonBody")}
                      </p>
                      <div className="divide-y divide-line">
                        {buttons.map((label) => (
                          <p
                            key={label}
                            className="px-3 py-2.5 text-center text-sm font-semibold text-[var(--wa-teal)]"
                          >
                            {label}
                          </p>
                        ))}
                      </div>
                    </article>
                  ) : null}

                  {tab === "document" ? (
                    <article className="wap-rich__card flex items-center gap-3 p-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-[var(--wa-teal)]">
                        <FileTextIcon className="h-5 w-5" />
                      </span>
                      <p className="text-sm font-semibold text-ink">
                        {t("phone.fileName")}
                      </p>
                    </article>
                  ) : null}

                  {tab === "sticker" ? (
                    <p className="wap-rich__bubble is-in text-4xl leading-none">
                      {t("phone.sticker")}
                    </p>
                  ) : null}

                  <p className="wap-rich__meta">
                    {t("phone.edited")} · {t("phone.reaction")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
