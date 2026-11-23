"use client";

import { useEffect, useState } from "react";
import {
  CheckCircle2Icon,
  CheckIcon,
  Clock3Icon,
  FileCheckIcon,
  LayersIcon,
  RefreshCwIcon,
  XCircleIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";

const ITEM_KEYS = ["sync", "types", "status"] as const;
const ROW_META = [
  { key: "order", status: "approved" as const },
  { key: "campaign", status: "pending" as const },
  { key: "otp", status: "rejected" as const },
];

export function TemplatesSection() {
  const t = useTranslations("PlatformWhatsAppBusiness.templates");
  const [syncing, setSyncing] = useState(false);
  const [synced, setSynced] = useState(false);
  const [pulseRow, setPulseRow] = useState<number | null>(null);
  const [live, setLive] = useState("");

  const sync = () => {
    if (syncing) return;
    setSyncing(true);
    setSynced(false);
    setPulseRow(null);
    setLive(t("live.syncing"));

    // Stagger row highlight while “fetching”
    ROW_META.forEach((_, index) => {
      window.setTimeout(() => setPulseRow(index), 220 + index * 280);
    });

    window.setTimeout(() => {
      setSyncing(false);
      setSynced(true);
      setPulseRow(null);
      setLive(t("live.synced"));
      window.setTimeout(() => {
        setSynced(false);
        setLive("");
      }, 2400);
    }, 1300);
  };

  // Gentle idle demo: auto-sync once when section is visible
  useEffect(() => {
    const el = document.getElementById("templates");
    if (!el || typeof IntersectionObserver === "undefined") return;

    let played = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || played) return;
        played = true;
        window.setTimeout(() => sync(), 600);
        io.disconnect();
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once on mount for idle demo
  }, []);

  return (
    <section
      id="templates"
      className="wa-templates border-t border-line"
      aria-labelledby="wa-templates-title"
    >
      <Container className="section">
        <div className="wa-section-aside">
          <div className="wa-section-copy order-2 lg:order-1">
            <p className="eyebrow inline-flex items-center gap-2 text-[var(--wa-teal)]">
              <FileCheckIcon className="h-4 w-4" />
              {t("eyebrow")}
            </p>
            <h2 id="wa-templates-title" className="heading-section mt-3">
              {t("title")}
            </h2>
            <p className="text-body mt-4">{t("subtitle")}</p>
            <ul className="mt-8 space-y-5">
              {ITEM_KEYS.map((key) => (
                <li key={key} className="flex gap-3">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[color-mix(in_srgb,var(--wa-green)_12%,white)] text-[var(--wa-teal)] ring-1 ring-[color-mix(in_srgb,var(--wa-green)_25%,transparent)]">
                    {key === "sync" ? (
                      <RefreshCwIcon className="h-4 w-4" />
                    ) : key === "types" ? (
                      <LayersIcon className="h-4 w-4" />
                    ) : (
                      <FileCheckIcon className="h-4 w-4" />
                    )}
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
          </div>

          <div className="wa-section-widget order-1 lg:order-2">
            <div
              className={cn(
                "wa-templates__card",
                syncing && "is-syncing",
                synced && "is-synced",
              )}
            >
              <div className="wa-templates__progress" aria-hidden />

              <div className="wa-templates__toolbar">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[color-mix(in_srgb,var(--wa-green)_12%,white)] text-[var(--wa-teal)]">
                  <LayersIcon className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold text-ink">
                    {t("mock.title")}
                  </h3>
                  <p className="text-xs text-ink-subtle">
                    {synced ? live || t("mock.meta") : t("mock.meta")}
                  </p>
                </div>
                <button
                  type="button"
                  className={cn(
                    "wa-templates__sync-btn inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-white transition",
                    synced
                      ? "bg-[var(--wa-green)]"
                      : "bg-[var(--wa-deep)] hover:bg-[var(--wa-teal)]",
                    syncing && "opacity-80",
                  )}
                  aria-busy={syncing}
                  onClick={sync}
                >
                  {synced ? (
                    <CheckIcon className="h-3.5 w-3.5" />
                  ) : (
                    <RefreshCwIcon
                      className={cn("h-3.5 w-3.5", syncing && "animate-spin")}
                    />
                  )}
                  {t("mock.sync")}
                </button>
              </div>

              <ul className="wa-templates__list" aria-label={t("mock.listLabel")}>
                {ROW_META.map((row, index) => (
                  <li
                    key={row.key}
                    className={cn(
                      "wa-templates__row",
                      pulseRow === index && "is-pulse",
                      syncing && pulseRow !== null && pulseRow < index && "is-dim",
                    )}
                    style={{ animationDelay: `${index * 70}ms` }}
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-ink">
                        {t(`mock.rows.${row.key}.name`)}
                      </p>
                      <p className="text-xs text-ink-subtle">
                        {t(`mock.rows.${row.key}.meta`)}
                      </p>
                    </div>
                    <span
                      className={cn(
                        "wa-templates__badge",
                        `is-${row.status}`,
                        row.status === "pending" && "is-live",
                        pulseRow === index && "is-flash",
                      )}
                    >
                      {row.status === "approved" ? (
                        <CheckCircle2Icon className="h-3.5 w-3.5" />
                      ) : row.status === "pending" ? (
                        <Clock3Icon className="h-3.5 w-3.5" />
                      ) : (
                        <XCircleIcon className="h-3.5 w-3.5" />
                      )}
                      {t(`mock.status.${row.status}`)}
                    </span>
                  </li>
                ))}
              </ul>

              {live ? (
                <p
                  className={cn(
                    "wa-templates__toast",
                    synced ? "is-ok" : "is-busy",
                  )}
                  aria-live="polite"
                >
                  {synced ? (
                    <CheckIcon className="h-3.5 w-3.5" />
                  ) : (
                    <RefreshCwIcon className="h-3.5 w-3.5 animate-spin" />
                  )}
                  {live}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
