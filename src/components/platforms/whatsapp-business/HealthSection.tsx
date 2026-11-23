"use client";

import { useEffect, useState } from "react";
import {
  ChartNoAxesColumnIcon,
  SendIcon,
  ShieldAlertIcon,
  ShieldIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";

const TABS = ["green", "yellow", "red"] as const;
type TabId = (typeof TABS)[number];

const ITEM_META = [
  { key: "quality", Icon: ChartNoAxesColumnIcon },
  { key: "quota", Icon: SendIcon },
  { key: "status", Icon: ShieldIcon },
  { key: "halt", Icon: ShieldAlertIcon },
] as const;

export function HealthSection() {
  const t = useTranslations("PlatformWhatsAppBusiness.health");
  const [tab, setTab] = useState<TabId>("green");
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setTab((prev) => TABS[(TABS.indexOf(prev) + 1) % TABS.length]);
    }, 3800);
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <section
      id="health"
      className="wa-health border-t border-line"
      aria-labelledby="wa-health-title"
    >
      <Container className="section">
        <div className="wa-section-aside">
          <div className="wa-section-copy">
            <p className="eyebrow inline-flex items-center gap-2 text-[var(--wa-teal)]">
              <ShieldAlertIcon className="h-3.5 w-3.5" />
              {t("eyebrow")}
            </p>
            <h2 id="wa-health-title" className="heading-section mt-3">
              {t("title")}
            </h2>
            <p className="text-body mt-4">{t("subtitle")}</p>
            <ul className="mt-8 space-y-5">
              {ITEM_META.map(({ key, Icon }) => (
                <li key={key} className="flex gap-3">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[color-mix(in_srgb,var(--wa-green)_12%,white)] text-[var(--wa-teal)] ring-1 ring-[color-mix(in_srgb,var(--wa-green)_25%,transparent)]">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-ink">
                      {t(`items.${key}.title`)}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-ink-subtle">
                      {t(`items.${key}.desc`)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs text-ink-faint">{t("note")}</p>
          </div>

          <div
            className="wa-section-widget"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div
              className="wa-health__tabs"
              role="tablist"
              aria-label={t("tabsLabel")}
            >
              {TABS.map((id) => (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={tab === id}
                  className={cn("wa-health__tab", `is-${id}`, tab === id && "is-on")}
                  onClick={() => setTab(id)}
                >
                  <i aria-hidden />
                  {t(`tabs.${id}`)}
                </button>
              ))}
            </div>

            <article
              className={cn("wa-health__card", `is-${tab}`)}
              aria-label={t("mock.label")}
            >
              <header className="wa-health__card-head">
                <h3>{t("mock.title")}</h3>
                <span className={cn("wa-health__pill", `is-${tab}`)}>
                  {t(`mock.quality.${tab}`)}
                </span>
              </header>

              <dl className="wa-health__rows">
                <div>
                  <dt>{t("mock.nameLabel")}</dt>
                  <dd>{t("mock.name")}</dd>
                </div>
                <div>
                  <dt>{t("mock.phoneLabel")}</dt>
                  <dd>{t("mock.phone")}</dd>
                </div>
                <div>
                  <dt>{t("mock.qualityLabel")}</dt>
                  <dd>{t(`mock.quality.${tab}`)}</dd>
                </div>
                <div>
                  <dt>{t("mock.quotaLabel")}</dt>
                  <dd>{t("mock.quota")}</dd>
                </div>
                <div>
                  <dt>{t("mock.sendLabel")}</dt>
                  <dd>{t(`mock.send.${tab}`)}</dd>
                </div>
                <div>
                  <dt>{t("mock.nameStatusLabel")}</dt>
                  <dd>{t("mock.nameStatus")}</dd>
                </div>
              </dl>

              <p className={cn("wa-health__banner", `is-${tab}`)}>
                {t(`banners.${tab}`)}
              </p>

              {tab === "red" ? (
                <ul className="wa-health__halt">
                  <li>{t("halt.stopped")}</li>
                  <li className="is-ok">{t("halt.continues")}</li>
                </ul>
              ) : null}
            </article>
          </div>
        </div>
      </Container>
    </section>
  );
}
