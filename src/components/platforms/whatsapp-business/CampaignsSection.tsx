"use client";

import { useEffect, useState } from "react";
import {
  BadgeCheckIcon,
  CheckCircle2Icon,
  GroupIcon,
  RocketIcon,
  SendIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";

const MODES = ["onetime", "recurring", "api"] as const;
type ModeId = (typeof MODES)[number];

const CHECKS = ["template", "quality", "number", "risk"] as const;

const METRICS = [
  { key: "target" as const, bar: "targetBar" as const },
  { key: "delivered" as const, bar: "deliveredBar" as const },
  { key: "read" as const, bar: "readBar" as const },
  { key: "replied" as const, bar: "repliedBar" as const },
];

export function CampaignsSection() {
  const t = useTranslations("PlatformWhatsAppBusiness.campaigns");
  const [mode, setMode] = useState<ModeId>("onetime");
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setMode((prev) => MODES[(MODES.indexOf(prev) + 1) % MODES.length]);
    }, 5200);
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <section
      id="campaigns"
      className="wa-campaigns border-t border-line"
      aria-labelledby="wa-campaigns-title"
    >
      <Container className="section">
        <div className="wa-section-stack">
          <header className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <p className="wa-section-label">
              <RocketIcon />
              {t("eyebrow")}
            </p>
            <h2 id="wa-campaigns-title" className="heading-section mt-3 text-balance">
              {t("title")}
            </h2>
            <p className="text-body mt-4 text-pretty">{t("subtitle")}</p>

            <div
              className="wa-campaigns__modes mt-8"
              role="tablist"
              aria-label={t("modesLabel")}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              {MODES.map((id) => (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={mode === id}
                  className={cn("wa-campaigns__mode", mode === id && "is-on")}
                  onClick={() => setMode(id)}
                >
                  {t(`modes.${id}.tab`)}
                </button>
              ))}
            </div>
          </header>

          <article
            className="wa-campaigns__cockpit"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="wa-campaigns__pipeline">
              <div className="wa-campaigns__campaign-head">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="wa-campaigns__campaign-title">
                      {t(`modes.${mode}.title`)}
                    </h3>
                    <span className="wa-campaigns__status">
                      {t(`modes.${mode}.status`)}
                    </span>
                  </div>
                  <p className="wa-campaigns__campaign-sub">
                    {t(`modes.${mode}.subtitle`)}
                  </p>
                </div>
                <span className="wa-campaigns__schedule">
                  {t(`modes.${mode}.scheduleTag`)}
                </span>
              </div>

              <div className="wa-campaigns__stage-grid">
                <div className="wa-campaigns__stage">
                  <div className="wa-campaigns__stage-top">
                    <span>{t("stages.audience")}</span>
                    <GroupIcon className="h-4 w-4" />
                  </div>
                  <p className="wa-campaigns__stage-title">
                    {t(`modes.${mode}.audienceTitle`)}
                  </p>
                  <p className="wa-campaigns__stage-body">
                    {t(`modes.${mode}.audienceDesc`)}
                  </p>
                </div>
                <div className="wa-campaigns__stage">
                  <div className="wa-campaigns__stage-top">
                    <span>{t("stages.timing")}</span>
                    <SendIcon className="h-4 w-4" />
                  </div>
                  <p className="wa-campaigns__stage-title">
                    {t(`modes.${mode}.timingTitle`)}
                  </p>
                  <p className="wa-campaigns__stage-body">
                    {t(`modes.${mode}.timingDesc`)}
                  </p>
                </div>
              </div>

              <div className="wa-campaigns__gate">
                <div className="wa-campaigns__gate-head">
                  <span>{t("gate.title")}</span>
                  <span className="wa-campaigns__gate-pass">{t("gate.pass")}</span>
                </div>
                <div className="wa-campaigns__checks">
                  {CHECKS.map((key) => (
                    <span key={key} className="wa-campaigns__check">
                      <CheckCircle2Icon className="h-3.5 w-3.5" />
                      {t(`gate.checks.${key}`)}
                    </span>
                  ))}
                </div>
              </div>

              <div className="wa-campaigns__funnel">
                <div className="wa-campaigns__funnel-head">
                  <span>{t("funnel.title")}</span>
                  <span className="wa-campaigns__routing">
                    {t(`modes.${mode}.routingLabel`)}
                  </span>
                </div>
                <div className="wa-campaigns__metrics">
                  {METRICS.map(({ key, bar }) => (
                    <div key={key} className="wa-campaigns__metric">
                      <span className="wa-campaigns__metric-label">
                        {t(`funnel.${key}`)}
                      </span>
                      <span className="wa-campaigns__metric-value">
                        {t(`modes.${mode}.${key}`)}
                      </span>
                      <span className="wa-campaigns__metric-track">
                        <i
                          style={{
                            width: t(`modes.${mode}.${bar}`),
                          }}
                        />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="wa-campaigns__preview">
              <div className="wa-campaigns__preview-head">
                <span className="wa-campaigns__live">
                  <i aria-hidden />
                  {t(`modes.${mode}.tplName`)}
                </span>
                <span className="wa-campaigns__cat">
                  {t(`modes.${mode}.tplCat`)}
                </span>
              </div>

              <div className="wa-campaigns__phone">
                <header className="wa-campaigns__phone-head">
                  <span className="wa-campaigns__avatar">O</span>
                  <div className="min-w-0">
                    <p className="wa-campaigns__biz">{t("preview.business")}</p>
                    <p className="wa-campaigns__biz-sub">{t("preview.account")}</p>
                  </div>
                  <BadgeCheckIcon className="h-4 w-4 shrink-0 text-[var(--wa-teal)]" />
                </header>

                <article className="wa-campaigns__bubble">
                  <p className="wa-campaigns__msg-header">
                    {t(`modes.${mode}.msgHeader`)}
                  </p>
                  <p className="wa-campaigns__msg-body">
                    {t(`modes.${mode}.msgBody`)}
                  </p>
                  <div className="wa-campaigns__msg-meta">
                    <span>{t("preview.footer")}</span>
                    <span>{t(`modes.${mode}.time`)}</span>
                  </div>
                  <div className="wa-campaigns__msg-actions">
                    <span>{t(`modes.${mode}.cta1`)}</span>
                    <span>{t(`modes.${mode}.cta2`)}</span>
                  </div>
                </article>
              </div>

              <div className="wa-campaigns__risk">
                <span>{t("preview.riskLabel")}</span>
                <span className="wa-campaigns__risk-pill">
                  {t("preview.riskStatus")}
                </span>
              </div>
            </div>
          </article>
        </div>
      </Container>
    </section>
  );
}
