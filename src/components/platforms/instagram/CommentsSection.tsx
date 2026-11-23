"use client";

import { useEffect, useState } from "react";
import { MessageCircleIcon, PackageIcon, SendIcon, TagIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";
import { CommentsWidget } from "./CommentsWidget";

const TABS = ["price", "stock", "dm"] as const;
type TabId = (typeof TABS)[number];

export function CommentsSection() {
  const t = useTranslations("PlatformInstagram.comments");
  const [tab, setTab] = useState<TabId>("price");
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setTab((prev) => TABS[(TABS.indexOf(prev) + 1) % TABS.length]);
    }, 4200);
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <section
      id="comments"
      className="ig-comments border-t border-line bg-surface-subtle/40"
      aria-labelledby="ig-comments-title"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Container className="section">
        <div className="ig-comments__grid">
          <div className="ig-comments__copy">
            <p className="eyebrow inline-flex items-center gap-2 text-[var(--ig-purple)]">
              <MessageCircleIcon className="h-3.5 w-3.5" />
              {t("eyebrow")}
            </p>
            <h2 id="ig-comments-title" className="heading-section mt-3">
              {t("title")}
            </h2>
            <p className="text-body mt-4">{t("subtitle")}</p>

            <div
              className="mt-8 space-y-3"
              role="tablist"
              aria-label={t("tabsLabel")}
            >
              {TABS.map((id) => {
                const Icon =
                  id === "price"
                    ? TagIcon
                    : id === "stock"
                      ? PackageIcon
                      : SendIcon;
                return (
                  <button
                    key={id}
                    type="button"
                    role="tab"
                    aria-selected={tab === id}
                    className={cn(
                      "flex w-full items-start gap-3 rounded-2xl px-4 py-3.5 text-left ring-1 transition",
                      tab === id
                        ? "bg-white shadow-sm ring-[color-mix(in_srgb,var(--ig-purple)_30%,transparent)]"
                        : "bg-white/70 ring-line hover:bg-white",
                    )}
                    onClick={() => setTab(id)}
                  >
                    <span className="ig-ico mt-0.5">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span>
                      <strong className="block text-sm font-semibold text-ink sm:text-[0.95rem]">
                        {t(`tabs.${id}`)}
                      </strong>
                      <span className="mt-1 block text-xs leading-5 text-ink-subtle sm:text-[0.8125rem] sm:leading-6">
                        {t(`cards.${id}`)}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="ig-comments__stage">
            <CommentsWidget tab={tab} />
          </div>
        </div>
      </Container>
    </section>
  );
}
