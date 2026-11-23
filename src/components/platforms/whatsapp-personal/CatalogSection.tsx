"use client";

import { useState } from "react";
import Image from "next/image";
import {
  PackageIcon,
  RefreshCwIcon,
  ShoppingBagIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";

const ITEMS = [
  { key: "sync", Icon: RefreshCwIcon },
  { key: "product", Icon: PackageIcon },
  { key: "order", Icon: ShoppingBagIcon },
] as const;

const PRODUCT_IMAGE = "/images/platforms/instagram/comment-post.jpg";

export function CatalogSection() {
  const t = useTranslations("PlatformWhatsAppPersonal.catalog");
  const [mode, setMode] = useState<"product" | "order">("product");

  return (
    <section
      id="catalog"
      className="wap-catalog border-t border-line bg-surface-subtle/40"
      aria-labelledby="wap-catalog-title"
    >
      <Container className="section">
        <div className="wa-section-aside">
          <div className="wa-section-copy">
            <p className="eyebrow inline-flex items-center gap-2 text-[var(--wa-teal)]">
              <PackageIcon className="h-3.5 w-3.5" />
              {t("eyebrow")}
            </p>
            <h2 id="wap-catalog-title" className="heading-section mt-3">
              {t("title")}
            </h2>
            <p className="text-body mt-4">{t("subtitle")}</p>
            <ul className="mt-8 space-y-5">
              {ITEMS.map(({ key, Icon }) => (
                <li key={key} className="flex gap-3">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[color-mix(in_srgb,var(--wa-green)_12%,white)] text-[var(--wa-teal)] ring-1 ring-[color-mix(in_srgb,var(--wa-green)_25%,transparent)]">
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
            <p className="mt-6 text-xs text-ink-faint">{t("note")}</p>
          </div>

          <div className="wap-catalog__widget">
            <div className="flex gap-2 border-b border-line p-3">
              {(["product", "order"] as const).map((id) => (
                <button
                  key={id}
                  type="button"
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-semibold ring-1 transition",
                    mode === id
                      ? "bg-[color-mix(in_srgb,var(--wa-green)_12%,white)] text-[var(--wa-teal)] ring-[color-mix(in_srgb,var(--wa-green)_28%,transparent)]"
                      : "bg-white text-ink-subtle ring-line",
                  )}
                  onClick={() => setMode(id)}
                >
                  {t(`items.${id}.title`)}
                </button>
              ))}
            </div>

            {mode === "product" ? (
              <article className="p-4">
                <div className="overflow-hidden rounded-xl ring-1 ring-line">
                  <div className="relative aspect-[16/10] bg-slate-100">
                    <Image
                      src={PRODUCT_IMAGE}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="360px"
                      unoptimized
                    />
                  </div>
                  <div className="bg-white p-3">
                    <p className="text-sm font-semibold text-ink">
                      {t("widget.productName")}
                    </p>
                    <p className="mt-1 text-sm text-ink-subtle">
                      {t("widget.price")} · {t("widget.stock")}
                    </p>
                    <span className="mt-3 inline-flex rounded-lg bg-[color-mix(in_srgb,var(--wa-green)_12%,white)] px-3 py-1.5 text-xs font-bold text-[var(--wa-teal)]">
                      {t("widget.cta")}
                    </span>
                  </div>
                </div>
                <p className="mt-3 text-center text-xs font-semibold text-[var(--wa-teal)]">
                  {t("widget.synced")}
                </p>
              </article>
            ) : (
              <article className="space-y-3 p-4">
                <p className="text-sm font-semibold text-ink">
                  {t("widget.orderTitle")}
                </p>
                {[0, 1].map((i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-xl bg-white p-2.5 ring-1 ring-line"
                  >
                    <div className="relative h-12 w-12 overflow-hidden rounded-lg bg-slate-100">
                      <Image
                        src={PRODUCT_IMAGE}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="48px"
                        unoptimized
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-ink">
                        {t("widget.productName")}
                      </p>
                      <p className="text-xs text-ink-subtle">
                        {t("widget.price")}
                      </p>
                    </div>
                  </div>
                ))}
              </article>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
