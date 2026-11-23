import Image from "next/image";
import { CalendarDaysIcon, FilePenLineIcon, KeyRoundIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";

const ITEMS = [
  { key: "calendar", Icon: CalendarDaysIcon },
  { key: "draft", Icon: FilePenLineIcon },
  { key: "scope", Icon: KeyRoundIcon },
] as const;

export async function PublishSection() {
  const t = await getTranslations("PlatformInstagram.publish");
  const weekdays = t.raw("widget.weekdays") as string[];
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const marked = new Set([5, 12, 18, 23]);

  return (
    <section
      id="publish"
      className="ig-publish border-t border-line bg-surface-subtle/40"
      aria-labelledby="ig-publish-title"
    >
      <Container className="section">
        <div className="wa-section-aside">
          <div className="wa-section-copy order-2 lg:order-1">
            <p className="eyebrow inline-flex items-center gap-2 text-[var(--ig-purple)]">
              <CalendarDaysIcon className="h-4 w-4" />
              {t("eyebrow")}
            </p>
            <h2 id="ig-publish-title" className="heading-section mt-3">
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

          <div className="ig-publish__widget order-1 lg:order-2">
            <header className="flex items-center justify-between border-b border-line px-4 py-3">
              <p className="text-sm font-semibold text-ink">{t("widget.month")}</p>
              <span className="ig-pill">{t("widget.scheduled")}</span>
            </header>
            <div className="grid grid-cols-7 gap-1 px-3 pt-3 text-center text-[10px] font-semibold text-ink-faint">
              {weekdays.map((d) => (
                <span key={d}>{d}</span>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1 p-3">
              {days.map((day) => (
                <div
                  key={day}
                  className={
                    marked.has(day)
                      ? "ig-publish__day is-marked"
                      : "ig-publish__day"
                  }
                >
                  <span>{day}</span>
                  {marked.has(day) ? (
                    <span className="ig-publish__dot" />
                  ) : null}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3 border-t border-line px-4 py-3">
              <div className="relative h-12 w-12 overflow-hidden rounded-lg bg-slate-100">
                <Image
                  src="/images/platforms/instagram/post-2.webp"
                  alt=""
                  fill
                  className="object-cover"
                  sizes="48px"
                  unoptimized
                />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-ink">
                  {t("widget.caption")}
                </p>
                <p className="text-xs text-ink-faint">{t("widget.draft")}</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
