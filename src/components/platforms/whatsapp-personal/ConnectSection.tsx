"use client";

import { useEffect, useState } from "react";
import { LayersIcon, QrCodeIcon, SmartphoneIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";

type Mode = "qr" | "code";

const COMPARE_KEYS = ["scan", "phone", "fit"] as const;

type Step = { title: string; body: string };

function QrWidget({
  channel,
  waiting,
  status,
}: {
  channel: string;
  waiting: string;
  status: string;
}) {
  return (
    <div className="wap-connect__screen">
      <header className="flex items-center justify-between border-b border-line px-4 py-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-ink">{channel}</p>
          <p className="truncate text-[11px] text-ink-faint">{waiting}</p>
        </div>
        <span className="shrink-0 rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-700">
          {status}
        </span>
      </header>
      <div className="grid place-items-center p-5">
        <div className="grid aspect-square w-44 place-items-center rounded-2xl bg-white ring-1 ring-line">
          <div className="grid h-32 w-32 grid-cols-5 gap-1 p-2">
            {Array.from({ length: 25 }).map((_, i) => (
              <span
                key={i}
                className={cn(
                  "rounded-[2px]",
                  [0, 1, 2, 4, 5, 6, 8, 10, 12, 14, 16, 18, 20, 22, 23, 24].includes(
                    i,
                  )
                    ? "bg-[var(--wa-deep)]"
                    : "bg-slate-100",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CodeWidget({
  channel,
  waiting,
  status,
  codeLabel,
  codeValue,
  phoneMask,
}: {
  channel: string;
  waiting: string;
  status: string;
  codeLabel: string;
  codeValue: string;
  phoneMask: string;
}) {
  return (
    <div className="wap-connect__screen">
      <header className="flex items-center justify-between border-b border-line px-4 py-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-ink">{channel}</p>
          <p className="truncate text-[11px] text-ink-faint">{waiting}</p>
        </div>
        <span className="shrink-0 rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-700">
          {status}
        </span>
      </header>
      <div className="space-y-3 p-4">
        <div className="rounded-2xl bg-white p-4 ring-1 ring-line">
          <p className="text-xs font-semibold text-ink-faint">{codeLabel}</p>
          <p className="mt-2 font-mono text-2xl font-bold tracking-[0.2em] text-[var(--wa-deep)]">
            {codeValue}
          </p>
          <p className="mt-3 text-sm text-ink-subtle">{phoneMask}</p>
        </div>
      </div>
    </div>
  );
}

export function ConnectSection() {
  const t = useTranslations("PlatformWhatsAppPersonal.connect");
  const [mode, setMode] = useState<Mode>("qr");
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
      aria-labelledby="wap-connect-title"
    >
      <Container className="section">
        <div className="wa-section-stack">
          <header className="mx-auto max-w-3xl text-center">
            <p className="wa-section-label">
              <LayersIcon />
              {t("eyebrow")}
            </p>
            <h2 id="wap-connect-title" className="heading-section mt-3">
              {t("title")}
            </h2>
            <p className="text-body mt-4">{t("subtitle")}</p>

            <div
              className="wa-connect__toggle mt-8"
              role="tablist"
              aria-label={t("toggleLabel")}
            >
              {(["qr", "code"] as const).map((id) => {
                const Icon = id === "qr" ? QrCodeIcon : SmartphoneIcon;
                const selected = mode === id;
                return (
                  <button
                    key={id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    className={cn(
                      "wa-connect__tab",
                      id === "qr" ? "is-coex" : "is-cloud",
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
                          mode === "qr" ? "is-coex" : "is-cloud",
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
                {mode === "qr" ? (
                  <QrWidget
                    channel={t("widget.channel")}
                    waiting={t("widget.waitingQr")}
                    status={t("widget.statusSync")}
                  />
                ) : (
                  <CodeWidget
                    channel={t("widget.channel")}
                    waiting={t("widget.waitingCode")}
                    status={t("widget.statusSync")}
                    codeLabel={t("widget.codeLabel")}
                    codeValue={t("widget.codeValue")}
                    phoneMask={t("widget.phoneMask")}
                  />
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
                        className={cn(mode === "qr" && "is-on")}
                      >
                        {t("modes.qr.title")}
                      </th>
                      <th
                        scope="col"
                        className={cn(mode === "code" && "is-on")}
                      >
                        {t("modes.code.title")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARE_KEYS.map((key) => (
                      <tr key={key}>
                        <th scope="row">{t(`compare.rows.${key}.label`)}</th>
                        <td className={cn(mode === "qr" && "is-on")}>
                          {t(`compare.rows.${key}.qr`)}
                        </td>
                        <td className={cn(mode === "code" && "is-on")}>
                          {t(`compare.rows.${key}.code`)}
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
