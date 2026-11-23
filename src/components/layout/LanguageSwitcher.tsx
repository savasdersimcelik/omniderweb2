"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const localeMeta: Record<
  Locale,
  { label: string; flag: string; title: string }
> = {
  tr: { label: "TR", flag: "/flags/turkey.svg", title: "Türkçe" },
  en: { label: "EN", flag: "/flags/uk.svg", title: "English" },
};

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("Nav");

  return (
    <div
      className={cn(
        "header-lang flex items-center gap-1 rounded-full bg-slate-100/80 p-1 ring-1 ring-slate-200/70",
        className,
      )}
      role="group"
      aria-label={t("language")}
    >
      {routing.locales.map((item) => {
        const active = item === locale;
        const meta = localeMeta[item];

        return (
          <button
            key={item}
            type="button"
            title={meta.title}
            aria-label={meta.title}
            aria-pressed={active}
            className={cn(
              "flex h-7 w-7 items-center justify-center rounded-full transition",
              active
                ? "bg-white shadow ring-1 ring-slate-200"
                : "opacity-55 hover:opacity-100",
            )}
            onClick={() => {
              if (!active) {
                router.replace(pathname, { locale: item });
              }
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={meta.flag}
              alt={meta.label}
              width={16}
              height={16}
              className="h-4 w-4 rounded-full object-cover"
            />
          </button>
        );
      })}
    </div>
  );
}
