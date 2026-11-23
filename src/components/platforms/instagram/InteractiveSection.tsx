"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  ExternalLinkIcon,
  MessageCircleIcon,
  SparklesIcon,
  ZapIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";

const TABS = ["quick", "ice", "card"] as const;
type TabId = (typeof TABS)[number];

const CARD_IMAGE = "/images/platforms/instagram/comment-post.jpg";

export function InteractiveSection() {
  const t = useTranslations("PlatformInstagram.interactive");
  const [tab, setTab] = useState<TabId>("quick");
  const [paused, setPaused] = useState(false);
  const [tick, setTick] = useState(0);

  const quickOptions = t.raw("quick.options") as string[];
  const iceQuestions = t.raw("ice.questions") as string[];
  const cardButtons = t.raw("card.buttons") as string[];

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setTab((prev) => TABS[(TABS.indexOf(prev) + 1) % TABS.length]);
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
      className="ig-interactive border-t border-line bg-surface-subtle/40"
      aria-labelledby="ig-interactive-title"
      data-tab={tab}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Container className="section">
        <div className="wa-section-stack">
          <header className="mx-auto max-w-3xl text-center">
            <p className="eyebrow inline-flex items-center gap-2 text-[var(--ig-purple)]">
              <ZapIcon className="h-3.5 w-3.5" />
              {t("eyebrow")}
            </p>
            <h2 id="ig-interactive-title" className="heading-section mt-3">
              {t("title")}
            </h2>
            <p className="text-body mt-4">{t("subtitle")}</p>
          </header>

          <div
            className="ig-interactive__tabs mx-auto mt-8 max-w-3xl"
            role="tablist"
            aria-label={t("tabsLabel")}
          >
            {TABS.map((id) => {
              const Icon =
                id === "quick"
                  ? MessageCircleIcon
                  : id === "ice"
                    ? SparklesIcon
                    : ExternalLinkIcon;
              return (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={tab === id}
                  className={cn(
                    "flex w-full items-start gap-3 rounded-2xl px-4 py-3.5 text-left ring-1 transition",
                    tab === id
                      ? "bg-white shadow-sm ring-[color-mix(in_srgb,var(--ig-purple)_30%,transparent)]"
                      : "bg-white/70 ring-line hover:bg-white",
                  )}
                  onClick={() => select(id)}
                >
                  <span className="ig-ico mt-0.5">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span>
                    <strong className="block text-sm font-semibold text-ink sm:text-[0.95rem]">
                      {t(`tabs.${id}`)}
                    </strong>
                    <span className="mt-1 block text-xs leading-5 text-ink-subtle sm:text-[0.8125rem] sm:leading-6">
                      {t(`cards.${id}`)}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="ig-interactive__stage mx-auto mt-8">
            <div className="ig-interactive__screen">
              <header className="ig-interactive__topbar">
                <span className="ig-interactive__avatar">
                  <Image
                    src="/icons/platforms/instagram.png"
                    alt=""
                    width={28}
                    height={28}
                    className="h-7 w-7 object-contain"
                    unoptimized
                  />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-ink">
                    {t("phone.name")}
                  </p>
                  <p className="text-[11px] text-ink-faint">{t("phone.status")}</p>
                </div>
              </header>

              <div className="ig-interactive__chat" key={`${tab}-${tick}`}>
                {tab === "quick" ? (
                  <div className="ig-interactive__scene">
                    <p className="ig-interactive__bubble is-in is-rise">
                      {t("quick.prompt")}
                    </p>
                    <div className="ig-interactive__chips is-rise is-late">
                      {quickOptions.map((label, index) => (
                        <span
                          key={label}
                          className={cn(
                            "ig-interactive__chip",
                            index === 0 && "is-hit",
                          )}
                        >
                          {label}
                          {index === 0 ? (
                            <i className="ig-interactive__ripple" />
                          ) : null}
                        </span>
                      ))}
                    </div>
                    <p className="ig-interactive__bubble is-out is-from-right">
                      {quickOptions[0]}
                    </p>
                    <p className="ig-interactive__bubble is-in is-rise is-late2">
                      {t("quick.follow")}
                    </p>
                  </div>
                ) : null}

                {tab === "ice" ? (
                  <div className="ig-interactive__scene">
                    <p className="ig-interactive__bubble is-in is-rise">
                      {t("ice.intro")}
                    </p>
                    <div className="ig-interactive__ice is-rise is-late">
                      {iceQuestions.map((q, index) => (
                        <span
                          key={q}
                          className={cn(
                            "ig-interactive__ice-item",
                            index === 0 && "is-hit",
                          )}
                        >
                          {q}
                          {index === 0 ? (
                            <i className="ig-interactive__ripple" />
                          ) : null}
                        </span>
                      ))}
                    </div>
                    <p className="ig-interactive__bubble is-out is-from-right">
                      {t("ice.picked")}
                    </p>
                    <p className="ig-interactive__bubble is-in is-rise is-late2">
                      {t("ice.follow")}
                    </p>
                  </div>
                ) : null}

                {tab === "card" ? (
                  <div className="ig-interactive__scene">
                    <article className="ig-interactive__card is-rise">
                      <div className="ig-interactive__card-media relative">
                        <Image
                          src={CARD_IMAGE}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="320px"
                          unoptimized
                        />
                      </div>
                      <div className="ig-interactive__card-body">
                        <p className="text-sm font-semibold text-ink">
                          {t("card.title")}
                        </p>
                        <p className="mt-0.5 text-xs text-ink-subtle">
                          {t("card.subtitle")}
                        </p>
                      </div>
                      <div className="ig-interactive__card-actions">
                        {cardButtons.map((label, index) => (
                          <span
                            key={label}
                            className={cn(
                              "ig-interactive__card-btn",
                              index === 0 && "is-primary",
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
                  </div>
                ) : null}
              </div>
            </div>
            <p className="ig-interactive__badge">{t("badge")}</p>
            <p className="mt-3 text-center text-xs text-ink-faint">{t("note")}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
