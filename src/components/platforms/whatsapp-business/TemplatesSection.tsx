"use client";

import { useState } from "react";
import {
  CheckCircle2Icon,
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
  const [live, setLive] = useState("");

  const sync = () => {
    if (syncing) return;
    setSyncing(true);
    setLive(t("live.syncing"));
    window.setTimeout(() => {
      setSyncing(false);
      setLive(t("live.synced"));
      window.setTimeout(() => setLive(""), 2200);
    }, 1200);
  };

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
            <div className="wa-templates__card">
              <div className="wa-templates__toolbar">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[color-mix(in_srgb,var(--wa-green)_12%,white)] text-[var(--wa-teal)]">
                  <LayersIcon className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold text-ink">
                    {t("mock.title")}
                  </h3>
                  <p className="text-xs text-ink-subtle">{t("mock.meta")}</p>
                </div>
                <button
                  type="button"
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full bg-[var(--wa-deep)] px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-[var(--wa-teal)]",
                    syncing && "opacity-70",
                  )}
                  aria-busy={syncing}
                  onClick={sync}
                >
                  <RefreshCwIcon
                    className={cn("h-3.5 w-3.5", syncing && "animate-spin")}
                  />
                  {t("mock.sync")}
                </button>
              </div>

              <ul className="wa-templates__list" aria-label={t("mock.listLabel")}>
                {ROW_META.map((row) => (
                  <li key={row.key} className="wa-templates__row">
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
              <p className="sr-only" aria-live="polite">
                {live}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
