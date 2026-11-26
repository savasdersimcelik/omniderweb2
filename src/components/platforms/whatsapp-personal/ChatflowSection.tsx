"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  ArrowDownIcon,
  GitBranchIcon,
  HeadphonesIcon,
  MessageCircleIcon,
  RefreshCwIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";

const SCENARIOS = [
  "ecommerce",
  "booking",
  "lead",
  "education",
  "travel",
  "restaurant",
] as const;
type ScenarioId = (typeof SCENARIOS)[number];

const STEPS = [
  { key: "one" as const, Icon: MessageCircleIcon, active: false },
  { key: "two" as const, Icon: RefreshCwIcon, active: true },
  { key: "three" as const, Icon: HeadphonesIcon, active: false },
] as const;

export function ChatflowSection() {
  const t = useTranslations("PlatformWhatsAppPersonal.chatflow");
  const [scenario, setScenario] = useState<ScenarioId>("ecommerce");
  const [visibleCount, setVisibleCount] = useState(SCENARIOS.length);
  const modesRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = modesRef.current;
    if (!root) return;

    const measure = () => {
      const buttons = Array.from(
        root.querySelectorAll<HTMLButtonElement>("[data-chatflow-mode]"),
      );
      if (buttons.length === 0) return;

      root.classList.add("is-measuring");
      const widths = buttons.map((btn) => btn.offsetWidth);
      root.classList.remove("is-measuring");

      const styles = getComputedStyle(root);
      const gap = Number.parseFloat(styles.columnGap || styles.gap || "0") || 0;
      const maxWidth = root.clientWidth;
      let used = 0;
      let fit = 0;

      for (const width of widths) {
        const next = used + (fit > 0 ? gap : 0) + width;
        if (next > maxWidth + 0.5) break;
        used = next;
        fit += 1;
      }

      setVisibleCount((prev) => {
        const next = Math.max(1, fit);
        return prev === next ? prev : next;
      });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const visible = SCENARIOS.slice(0, visibleCount);
    if (!visible.includes(scenario)) {
      setScenario(visible[0] ?? "ecommerce");
    }
  }, [scenario, visibleCount]);

  return (
    <section
      id="chatflow"
      className="wap-chatflow border-t border-line"
      aria-labelledby="wap-chatflow-title"
    >
      <Container className="section">
        <div className="wa-section-stack wap-chatflow__stack">
          <header className="wap-chatflow__intro">
            <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
              <p className="wa-section-label">
                <GitBranchIcon />
                {t("eyebrow")}
              </p>
              <h2
                id="wap-chatflow-title"
                className="heading-section mt-3 text-balance"
              >
                {t("title")}
              </h2>
              <p className="text-body mt-4 text-pretty">{t("subtitle")}</p>
            </div>

            <div
              ref={modesRef}
              className="wap-chatflow__modes mt-8"
              role="tablist"
              aria-label={t("modesLabel")}
            >
              {SCENARIOS.map((id, index) => (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  data-chatflow-mode=""
                  hidden={index >= visibleCount}
                  aria-selected={scenario === id}
                  className={cn(
                    "wap-chatflow__mode",
                    scenario === id && "is-on",
                  )}
                  onClick={() => setScenario(id)}
                >
                  {t(`scenarios.${id}.tab`)}
                </button>
              ))}
            </div>
          </header>

          <div className="wap-chatflow__layout">
            <div className="wap-chatflow__steps">
              {STEPS.map((step, index) => (
                <div key={step.key} className="wap-chatflow__step-wrap">
                  {index > 0 ? (
                    <div className="wap-chatflow__arrow" aria-hidden>
                      <ArrowDownIcon />
                    </div>
                  ) : null}
                  <article
                    className={cn(
                      "wap-chatflow__step",
                      step.active && "is-active",
                    )}
                  >
                    <span
                      className={cn(
                        "wap-chatflow__step-icon",
                        step.active && "is-active",
                      )}
                      aria-hidden
                    >
                      <step.Icon />
                    </span>
                    <div className="wap-chatflow__step-body">
                      <div className="wap-chatflow__step-meta">
                        <span>{t(`steps.${step.key}.label`)}</span>
                        <span
                          className={cn(
                            "wap-chatflow__step-badge",
                            `is-${step.key}`,
                          )}
                        >
                          {t(`steps.${step.key}.badge`)}
                        </span>
                      </div>
                      <h3>{t(`scenarios.${scenario}.${step.key}.title`)}</h3>
                      <p>{t(`scenarios.${scenario}.${step.key}.body`)}</p>
                    </div>
                  </article>
                </div>
              ))}
            </div>

            <article className="wap-chatflow__preview">
              <header className="wap-chatflow__preview-head">
                <div>
                  <i aria-hidden />
                  <span>{t("preview.label")}</span>
                </div>
                <span className="wap-chatflow__live">{t("preview.live")}</span>
              </header>

              <div className="wap-chatflow__chat">
                <div className="wap-chatflow__bubble is-out">
                  <p>{t(`scenarios.${scenario}.sim.user`)}</p>
                  <time>{t("preview.time")}</time>
                </div>
                <div className="wap-chatflow__bubble is-in">
                  <div className="wap-chatflow__bubble-copy">
                    <p>{t(`scenarios.${scenario}.sim.bot`)}</p>
                    <time>{t("preview.time")}</time>
                  </div>
                  <div className="wap-chatflow__actions">
                    <span>{t(`scenarios.${scenario}.sim.btn1`)}</span>
                    <span>{t(`scenarios.${scenario}.sim.btn2`)}</span>
                  </div>
                </div>
              </div>

              <footer className="wap-chatflow__preview-foot">
                <span>{t("preview.response")}</span>
                <span>{t("preview.active")}</span>
              </footer>
            </article>
          </div>
        </div>
      </Container>
    </section>
  );
}
