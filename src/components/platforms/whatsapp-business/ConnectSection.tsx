"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { LayersIcon, SmartphoneIcon, CloudIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";

type Mode = "coexistence" | "standard";

const COMPARE_KEYS = ["pin", "app", "fit"] as const;

type Step = { title: string; body: string };

export function ConnectSection() {
  const t = useTranslations("PlatformWhatsAppBusiness.connect");
  const [mode, setMode] = useState<Mode>("coexistence");
  const [stepIndex, setStepIndex] = useState(0);
  const steps = t.raw(`steps.${mode}`) as Step[];

  useEffect(() => {
    setStepIndex(0);
    const id = window.setInterval(() => {
      setStepIndex((prev) => (prev + 1) % Math.max(steps.length, 1));
    }, 2200);
    return () => window.clearInterval(id);
  }, [mode, steps.length]);

  return (
    <section
      id="connect"
      className="wa-connect border-t border-line"
      aria-labelledby="wa-connect-title"
    >
      <Container className="section">
        <div className="wa-section-stack">
          <header className="mx-auto max-w-3xl text-center">
            <p className="eyebrow inline-flex items-center gap-2 text-[var(--wa-teal)]">
              <LayersIcon className="h-3.5 w-3.5" />
              {t("eyebrow")}
            </p>
            <h2 id="wa-connect-title" className="heading-section mt-3">
              {t("title")}
            </h2>
            <p className="text-body mt-4">{t("subtitle")}</p>

            <div
              className="wa-connect__toggle mt-8"
              role="tablist"
              aria-label={t("toggleLabel")}
            >
              {(["coexistence", "standard"] as const).map((id) => {
                const Icon = id === "coexistence" ? SmartphoneIcon : CloudIcon;
                const selected = mode === id;
                return (
                  <button
                    key={id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    className={cn(
                      "wa-connect__tab",
                      id === "coexistence" ? "is-coex" : "is-cloud",
                      selected && "is-on",
                    )}
                    onClick={() => setMode(id)}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="min-w-0 text-left">
                      <strong className="block text-sm font-semibold">
                        {t(`modes.${id}.short`)}
                      </strong>
                      <span className="mt-0.5 block text-xs leading-4 text-ink-subtle">
                        {t(`modes.${id}.title`)}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </header>

          <div className="wa-connect__widget mt-10">
            <div className="wa-connect__panel">
              <div className="wa-connect__steps">
                <p className="wa-connect__label">{t("stepsLabel")}</p>
                <ol className="wa-connect__list">
                  {steps.map((step, index) => (
                    <li
                      key={`${mode}-${step.title}`}
                      className={cn(
                        "wa-connect__step",
                        index === stepIndex && "is-active",
                        index < stepIndex && "is-done",
                      )}
                    >
                      <span
                        className={cn(
                          "wa-connect__num",
                          mode === "coexistence" ? "is-coex" : "is-cloud",
                        )}
                      >
                        {index + 1}
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-ink">
                          {step.title}
                        </p>
                        <p className="mt-1 text-sm leading-6 text-ink-subtle">
                          {step.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="wa-connect__visual" aria-hidden>
                {mode === "coexistence" ? (
                  <div className="wa-connect__flow">
                    <div className="wa-connect__node">
                      <Image
                        src="/icons/platforms/whatsapp-business.png"
                        alt=""
                        width={28}
                        height={28}
                        className="h-7 w-7 object-contain"
                        unoptimized
                      />
                      <span>{t("visual.phoneApp")}</span>
                    </div>
                    <span className="wa-connect__bridge">
                      {t("visual.sameNumber")}
                    </span>
                    <div className="wa-connect__node">
                      <span className="wa-connect__mark">O</span>
                      <span>{t("visual.inbox")}</span>
                    </div>
                    <p className="wa-connect__bubble">{t("visual.message")}</p>
                  </div>
                ) : (
                  <div className="wa-connect__flow">
                    <div className="wa-connect__node">
                      <span className="wa-connect__mark is-num">#</span>
                      <span>{t("visual.newNumber")}</span>
                    </div>
                    <span className="wa-connect__bridge">{t("visual.meta")}</span>
                    <div className="wa-connect__node">
                      <span className="wa-connect__mark">O</span>
                      <span>{t("visual.inbox")}</span>
                    </div>
                    <p className="wa-connect__bubble">{t("visual.message")}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="wa-connect__compare">
              <p className="wa-connect__label">{t("compare.label")}</p>
              <div className="wa-connect__table-wrap">
                <table className="wa-connect__table">
                  <thead>
                    <tr>
                      <th scope="col">
                        <span className="sr-only">{t("compare.label")}</span>
                      </th>
                      <th
                        scope="col"
                        className={cn(mode === "coexistence" && "is-on")}
                      >
                        {t("modes.coexistence.title")}
                      </th>
                      <th
                        scope="col"
                        className={cn(mode === "standard" && "is-on")}
                      >
                        {t("modes.standard.title")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARE_KEYS.map((key) => (
                      <tr key={key}>
                        <th scope="row">{t(`compare.rows.${key}.label`)}</th>
                        <td className={cn(mode === "coexistence" && "is-on")}>
                          {t(`compare.rows.${key}.coexistence`)}
                        </td>
                        <td className={cn(mode === "standard" && "is-on")}>
                          {t(`compare.rows.${key}.standard`)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="wa-connect__caption">
                {t(`compare.caption.${mode}`)}
              </p>
            </div>
          </div>

          <p className="sr-only" aria-live="polite">
            {t(`status.${mode}`)}
          </p>
        </div>
      </Container>
    </section>
  );
}
