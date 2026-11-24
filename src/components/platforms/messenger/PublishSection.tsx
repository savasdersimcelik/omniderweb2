import { CalendarDaysIcon, FilePenLineIcon, KeyRoundIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";

const ITEMS = [
  { key: "calendar", Icon: CalendarDaysIcon },
  { key: "draft", Icon: FilePenLineIcon },
  { key: "scope", Icon: KeyRoundIcon },
] as const;

export async function PublishSection() {
  const t = await getTranslations("PlatformMessenger.publish");
  const weekdays = t.raw("widget.weekdays") as string[];
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const marked = new Set([5, 12, 18, 23]);

  return (
    <section
      id="publish"
      className="ms-publish border-t border-line bg-surface-subtle/40"
      aria-labelledby="ms-publish-title"
    >
      <Container className="section">
        <div className="wa-section-stack">
          <header className="mx-auto max-w-3xl text-center">
            <p className="eyebrow inline-flex items-center gap-2 text-[var(--color-messenger-blue)]">
              <CalendarDaysIcon className="h-4 w-4" />
              {t("eyebrow")}
            </p>
            <h2 id="ms-publish-title" className="heading-section mt-3">
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
                <span className="ms-ico mt-0.5">
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

          <div className="mx-auto mt-8 w-full max-w-5xl">
            <div className="ms-publish__widget">
              <header className="flex items-center justify-between border-b border-line px-4 py-3.5 sm:px-6">
                <p className="text-sm font-semibold text-ink sm:text-base">
                  {t("widget.month")}
                </p>
                <span className="ms-pill">{t("widget.scheduled")}</span>
              </header>
              <div className="grid grid-cols-7 gap-1.5 px-4 pt-4 text-center text-xs font-semibold text-ink-faint sm:gap-2 sm:px-6 sm:text-sm">
                {weekdays.map((day) => (
                  <span key={day}>{day}</span>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1.5 p-4 sm:gap-2 sm:px-6 sm:pb-5">
                {days.map((day) => (
                  <div
                    key={day}
                    className={
                      marked.has(day)
                        ? "ms-publish__day is-marked"
                        : "ms-publish__day"
                    }
                  >
                    <span>{day}</span>
                    {marked.has(day) ? <span className="ms-publish__dot" /> : null}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-3 border-t border-line px-4 py-3.5 sm:gap-4 sm:px-6 sm:py-4">
                <div className="ms-publish__swatch" aria-hidden />
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
