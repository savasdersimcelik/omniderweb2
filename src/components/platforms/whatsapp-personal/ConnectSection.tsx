"use client";

import { useEffect, useState } from "react";
import {
  CheckIcon,
  QrCodeIcon,
  SmartphoneIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";

const TABS = ["qr", "code"] as const;
type TabId = (typeof TABS)[number];

export function ConnectSection() {
  const t = useTranslations("PlatformWhatsAppPersonal.connect");
  const [tab, setTab] = useState<TabId>("qr");
  const [phase, setPhase] = useState(0);
  const [paused, setPaused] = useState(false);
  const steps = t.raw(tab === "qr" ? "qrSteps" : "codeSteps") as string[];
  const after = t.raw("after") as string[];

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setPhase((p) => (p + 1) % 3);
    }, 2800);
    return () => window.clearInterval(id);
  }, [paused, tab]);

  return (
    <section
      id="connect"
      className="wap-connect border-t border-line bg-surface-subtle/40"
      aria-labelledby="wap-connect-title"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Container className="section">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,24rem)] lg:items-center lg:gap-7">
          <div className="min-w-0">
            <header>
              <p className="eyebrow inline-flex items-center gap-2 text-[var(--wa-teal)]">
                <QrCodeIcon className="h-3.5 w-3.5" />
                {t("eyebrow")}
              </p>
              <h2 id="wap-connect-title" className="heading-section mt-3">
                {t("title")}
              </h2>
              <p className="text-body mt-4">{t("subtitle")}</p>
            </header>

            <div
              className="mt-8 flex gap-2"
              role="tablist"
              aria-label={t("tabsLabel")}
            >
              {TABS.map((id) => {
                const Icon = id === "qr" ? QrCodeIcon : SmartphoneIcon;
                return (
                  <button
                    key={id}
                    type="button"
                    role="tab"
                    aria-selected={tab === id}
                    className={cn(
                      "inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold ring-1 transition",
                      tab === id
                        ? "bg-white text-[var(--wa-teal)] shadow-sm ring-[color-mix(in_srgb,var(--wa-green)_35%,transparent)]"
                        : "bg-white/70 text-ink-subtle ring-line hover:bg-white",
                    )}
                    onClick={() => {
                      setTab(id);
                      setPhase(0);
                    }}
                  >
                    <Icon className="h-4 w-4" />
                    {t(`tabs.${id}`)}
                  </button>
                );
              })}
            </div>

            <ol className="mt-6 space-y-3">
              {steps.map((step, index) => (
                <li key={step} className="flex gap-3 text-sm leading-6 text-ink-subtle">
                  <span
                    className={cn(
                      "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                      index <= phase
                        ? "bg-[color-mix(in_srgb,var(--wa-green)_16%,white)] text-[var(--wa-teal)]"
                        : "bg-slate-100 text-ink-faint",
                    )}
                  >
                    {index < phase ? (
                      <CheckIcon className="h-3.5 w-3.5" />
                    ) : (
                      index + 1
                    )}
                  </span>
                  <span className={cn(index === phase && "font-semibold text-ink")}>
                    {step}
                  </span>
                </li>
              ))}
            </ol>

            <div className="mt-8">
              <h3 className="text-sm font-semibold text-ink">{t("afterTitle")}</h3>
              <ul className="mt-3 space-y-2">
                {after.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2 text-sm leading-6 text-ink-subtle"
                  >
                    <CheckIcon className="mt-1 h-3.5 w-3.5 shrink-0 text-[var(--wa-teal)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-6 text-xs leading-5 text-ink-faint">{t("riskNote")}</p>
          </div>

          <div className="wap-connect__stage mx-auto w-full max-w-[24rem] lg:mx-0">
            <div className="wap-connect__screen">
              <header className="flex items-center justify-between border-b border-line px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-ink">
                    {t("widget.channel")}
                  </p>
                  <p className="text-[11px] text-ink-faint">
                    {phase < 2
                      ? tab === "qr"
                        ? t("widget.waitingQr")
                        : t("widget.waitingCode")
                      : t("widget.success")}
                  </p>
                </div>
                <span
                  className={cn(
                    "rounded-full px-2.5 py-1 text-[11px] font-bold",
                    phase < 2
                      ? "bg-amber-50 text-amber-700"
                      : "bg-[color-mix(in_srgb,var(--wa-green)_14%,white)] text-[var(--wa-teal)]",
                  )}
                >
                  {phase < 2 ? t("widget.statusSync") : t("widget.statusReady")}
                </span>
              </header>

              <div className="space-y-4 p-4">
                {tab === "qr" ? (
                  <div className="mx-auto grid aspect-square w-44 place-items-center rounded-2xl bg-white ring-1 ring-line">
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
                ) : (
                  <div className="rounded-2xl bg-white p-4 ring-1 ring-line">
                    <p className="text-xs font-semibold text-ink-faint">
                      {t("widget.codeLabel")}
                    </p>
                    <p className="mt-2 font-mono text-2xl font-bold tracking-[0.2em] text-[var(--wa-deep)]">
                      {t("widget.codeValue")}
                    </p>
                    <p className="mt-3 text-sm text-ink-subtle">
                      {t("widget.phoneMask")}
                    </p>
                  </div>
                )}

                <div className="rounded-2xl bg-white p-3 ring-1 ring-line">
                  <p className="text-sm font-semibold text-ink">
                    {t("widget.profileName")}
                  </p>
                  <div className="mt-3 space-y-2">
                    <p
                      className={cn(
                        "text-xs font-semibold",
                        phase >= 1 ? "text-[var(--wa-teal)]" : "text-ink-faint",
                      )}
                    >
                      {t("widget.contactsDone")}
                    </p>
                    <p
                      className={cn(
                        "text-xs font-semibold",
                        phase >= 2 ? "text-[var(--wa-teal)]" : "text-ink-faint",
                      )}
                    >
                      {t("widget.messagesDone")}
                    </p>
                  </div>
                  {phase >= 2 ? (
                    <p className="mt-3 text-[11px] text-ink-faint">
                      {t("widget.creditNote")}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
            <p className="mt-3 text-center text-xs text-ink-faint">
              {t("demoNote")}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
