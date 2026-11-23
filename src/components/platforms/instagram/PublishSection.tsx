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
        <div className="wa-section-stack">
          <header className="mx-auto max-w-3xl text-center">
            <p className="eyebrow inline-flex items-center gap-2 text-[var(--ig-purple)]">
              <CalendarDaysIcon className="h-4 w-4" />
              {t("eyebrow")}
            </p>
            <h2 id="ig-publish-title" className="heading-section mt-3">
              {t("title")}
            </h2>
            <p className="text-body mt-4">{t("subtitle")}</p>
          </header>

          <ul className="mx-auto mt-8 grid w-full max-w-5xl gap-3 md:grid-cols-3 md:gap-4">
            {ITEMS.map(({ key, Icon }) => (
              <li
                key={key}
                className="flex gap-3 rounded-2xl bg-white/70 px-4 py-3.5 ring-1 ring-line"
              >
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

          <div className="ig-publish__stage mx-auto mt-8 w-full max-w-5xl">
            <div className="ig-publish__widget">
              <header className="flex items-center justify-between border-b border-line px-4 py-3.5 sm:px-6">
                <p className="text-sm font-semibold text-ink sm:text-base">
                  {t("widget.month")}
                </p>
                <span className="ig-pill">{t("widget.scheduled")}</span>
              </header>
              <div className="grid grid-cols-7 gap-1.5 px-4 pt-4 text-center text-xs font-semibold text-ink-faint sm:gap-2 sm:px-6 sm:text-sm">
                {weekdays.map((d) => (
                  <span key={d}>{d}</span>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1.5 p-4 sm:gap-2 sm:px-6 sm:pb-5">
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
              <div className="flex items-center gap-3 border-t border-line px-4 py-3.5 sm:gap-4 sm:px-6 sm:py-4">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:h-16 sm:w-16">
                  <Image
                    src="/images/platforms/instagram/post-2.webp"
                    alt=""
                    fill
                    className="object-cover"
                    sizes="64px"
                    unoptimized
                  />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-ink sm:text-base">
                    {t("widget.caption")}
                  </p>
                  <p className="text-xs text-ink-faint sm:text-sm">
                    {t("widget.draft")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
