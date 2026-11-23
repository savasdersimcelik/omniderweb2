"use client";

import { useState } from "react";
import { BotIcon, EyeOffIcon, ShieldIcon, Trash2Icon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";

const ITEMS = [
  { key: "hide", Icon: EyeOffIcon },
  { key: "delete", Icon: Trash2Icon },
  { key: "bot", Icon: BotIcon },
] as const;

const TABS = ["all", "awaiting", "hidden"] as const;

export function ModerationSection() {
  const t = useTranslations("PlatformInstagram.moderation");
  const [tab, setTab] = useState<(typeof TABS)[number]>("all");
  const rows = t.raw("widget.rows") as Array<{
    user: string;
    text: string;
    action: string;
  }>;

  return (
    <section
      id="moderation"
      className="ig-moderation border-t border-line"
      aria-labelledby="ig-moderation-title"
    >
      <Container className="section">
        <div className="wa-section-aside">
          <div className="wa-section-copy">
            <p className="eyebrow inline-flex items-center gap-2 text-[var(--ig-purple)]">
              <ShieldIcon className="h-4 w-4" />
              {t("eyebrow")}
            </p>
            <h2 id="ig-moderation-title" className="heading-section mt-3">
              {t("title")}
            </h2>
            <p className="text-body mt-4">{t("subtitle")}</p>
            <ul className="mt-8 space-y-5">
              {ITEMS.map(({ key, Icon }) => (
                <li key={key} className="flex gap-3">
                  <span className="ig-ico mt-0.5">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-ink">
                      {t(`items.${key}.title`)}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-ink-subtle">
                      {t(`items.${key}.body`)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="ig-moderation__widget">
            <header className="border-b border-line px-4 py-3">
              <p className="text-sm font-semibold text-ink">{t("widget.title")}</p>
              <div className="mt-3 flex gap-2">
                {TABS.map((id) => (
                  <button
                    key={id}
                    type="button"
                    className={cn(
                      "rounded-full px-3 py-1 text-xs font-semibold ring-1 transition",
                      tab === id
                        ? "bg-[color-mix(in_srgb,var(--ig-purple)_12%,white)] text-[var(--ig-purple)] ring-[color-mix(in_srgb,var(--ig-purple)_28%,transparent)]"
                        : "bg-white text-ink-subtle ring-line",
                    )}
                    onClick={() => setTab(id)}
                  >
                    {t(`widget.tabs.${id}`)}
                  </button>
                ))}
              </div>
            </header>
            <ul className="divide-y divide-line">
              {rows.map((row) => (
                <li
                  key={row.user + row.text}
                  className="flex items-start justify-between gap-3 px-4 py-3"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-ink">{row.user}</p>
                    <p className="mt-0.5 truncate text-sm text-ink-subtle">
                      {row.text}
                    </p>
                  </div>
                  <span className="ig-pill shrink-0">{row.action}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
