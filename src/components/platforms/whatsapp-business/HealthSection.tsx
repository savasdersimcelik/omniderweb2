"use client";

import { useState } from "react";
import {
  MessageCircleIcon,
  ShieldAlertIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";

const TABS = ["green", "yellow", "red"] as const;
type TabId = (typeof TABS)[number];

const TIERS = ["250", "1K", "2K", "10K", "100K", "∞"] as const;
const ACTIVE_TIER = 3; // 10K

const HIGHLIGHTS = [
  { key: "session" as const, Icon: MessageCircleIcon },
  { key: "alerts" as const, Icon: SparklesIcon },
] as const;

export function HealthSection() {
  const t = useTranslations("PlatformWhatsAppBusiness.health");
  const [tab, setTab] = useState<TabId>("yellow");

  return (
    <section
      id="health"
      className="wa-health border-t border-line"
      aria-labelledby="wa-health-title"
    >
      <Container className="section">
        <div className="wa-health__layout">
          <div className="wa-health__copy">
            <p className="wa-section-label">
              <ShieldAlertIcon />
              {t("eyebrow")}
            </p>
            <h2 id="wa-health-title" className="heading-section mt-3 text-balance">
              {t("title")}
            </h2>
            <p className="text-body mt-4 text-pretty">{t("subtitle")}</p>

            <div className="wa-health__highlights">
              {HIGHLIGHTS.map(({ key, Icon }) => (
                <article key={key} className="wa-health__highlight">
                  <span className="wa-health__highlight-icon">
                    <Icon className="h-4 w-4" />
                  </span>
                  <h3>{t(`highlights.${key}.title`)}</h3>
                  <p>{t(`highlights.${key}.body`)}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="wa-health__stage">
            <article
              className={cn("wa-health__sim", `is-${tab}`)}
              aria-label={t("sim.label")}
            >
              <header className="wa-health__sim-head">
                <div>
                  <p className="wa-health__sim-kicker">{t("sim.kicker")}</p>
                  <h3 className="wa-health__sim-title">{t("sim.title")}</h3>
                </div>
                <div
                  className="wa-health__seg"
                  role="tablist"
                  aria-label={t("tabsLabel")}
                >
                  {TABS.map((id) => (
                    <button
                      key={id}
                      type="button"
                      role="tab"
                      aria-selected={tab === id}
                      className={cn(
                        "wa-health__seg-btn",
                        `is-${id}`,
                        tab === id && "is-on",
                      )}
                      onClick={() => setTab(id)}
                    >
                      {t(`tabs.${id}`)}
                    </button>
                  ))}
                </div>
              </header>

              <div className={cn("wa-health__status", `is-${tab}`)}>
                <div className="wa-health__status-top">
                  <p className="wa-health__status-title">
                    {t(`states.${tab}.title`)}
                  </p>
                  <span className="wa-health__status-code">
                    {t(`states.${tab}.code`)}
                  </span>
                </div>
                <p className="wa-health__status-body">
                  {t(`states.${tab}.body`)}
                </p>
              </div>

              <div className="wa-health__tiers">
                <div className="wa-health__tiers-head">
                  <p>{t("tiers.label")}</p>
                  <span>{t("tiers.active")}</span>
                </div>
                <div className="wa-health__tiers-track" aria-hidden>
                  {TIERS.map((tier, index) => (
                    <span
                      key={tier}
                      className={cn(
                        "wa-health__tier",
                        index < ACTIVE_TIER && "is-passed",
                        index === ACTIVE_TIER && "is-active",
                      )}
                    >
                      {tier}
                    </span>
                  ))}
                </div>
              </div>

              <div className="wa-health__shield">
                <ShieldCheckIcon className="h-5 w-5" />
                <div>
                  <p className="wa-health__shield-title">{t("shield.title")}</p>
                  <p className="wa-health__shield-body">{t("shield.body")}</p>
                </div>
              </div>

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
