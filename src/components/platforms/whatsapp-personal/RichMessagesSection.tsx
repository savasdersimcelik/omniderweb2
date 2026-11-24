import {
  FileTextIcon,
  LayersIcon,
  MapPinIcon,
  MessageCircleIcon,
  MousePointerClickIcon,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";

const CARDS = [
  { id: "text" as const, size: "wide", Icon: MessageCircleIcon },
  { id: "button" as const, size: "wide", Icon: MousePointerClickIcon },
  { id: "document" as const, size: "sm", Icon: FileTextIcon },
  { id: "location" as const, size: "sm", Icon: MapPinIcon },
  { id: "poll" as const, size: "sm", Icon: LayersIcon },
];

export async function RichMessagesSection() {
  const t = await getTranslations("PlatformWhatsAppPersonal.richMessages");
  const pollOptions = t.raw("phone.pollOptions") as string[];
  const buttons = t.raw("phone.buttons") as string[];

  return (
    <section
      id="rich-messages"
      className="wap-rich border-t border-line"
      aria-labelledby="wap-rich-title"
    >
      <Container className="section">
        <header className="mx-auto max-w-3xl text-center">
          <p className="eyebrow inline-flex items-center justify-center gap-2 text-[var(--wa-teal)]">
            <LayersIcon className="h-3.5 w-3.5" />
            {t("eyebrow")}
          </p>
          <h2 id="wap-rich-title" className="heading-section mt-3">
            {t("title")}
          </h2>
          <p className="text-body mt-4">{t("subtitle")}</p>
        </header>

        <div className="wap-rich__bento mt-10">
          {CARDS.map(({ id, size, Icon }) => (
            <article
              key={id}
              className={cn(
                "wap-rich__tile",
                size === "wide" ? "is-wide" : "is-sm",
              )}
            >
              <div className="wap-rich__tile-copy">
                <p className="wap-rich__tile-badge">
                  <Icon className="h-3.5 w-3.5" />
                  {t(`tabs.${id}`)}
                </p>
                <h3 className="wap-rich__tile-title">
                  {t(`cards.${id}.title`)}
                </h3>
                <p className="wap-rich__tile-desc">{t(`cards.${id}.desc`)}</p>
              </div>

              <div className="wap-rich__tile-widget">
                {id === "text" ? (
                  <div className="wap-rich__mini-chat">
                    <p className="wap-rich__bubble is-in">{t("phone.text")}</p>
                    <p className="wap-rich__meta">
                      {t("phone.edited")} · {t("phone.reaction")}
                    </p>
                  </div>
                ) : null}

                {id === "location" ? (
                  <article className="wap-rich__card">
                    <div className="flex h-20 items-center justify-center bg-[color-mix(in_srgb,var(--wa-green)_10%,#e8f5e9)]">
                      <MapPinIcon className="h-7 w-7 text-[var(--wa-teal)]" />
                    </div>
                    <div className="p-3">
                      <p className="text-sm font-semibold text-ink">
                        {t("phone.locationTitle")}
                      </p>
                      <p className="mt-1 text-xs text-ink-subtle">
                        {t("phone.locationAddress")}
                      </p>
                    </div>
                  </article>
                ) : null}

                {id === "poll" ? (
                  <article className="wap-rich__card p-3">
                    <p className="text-sm font-semibold text-ink">
                      {t("phone.pollQuestion")}
                    </p>
                    <ul className="mt-3 space-y-2">
                      {pollOptions.map((opt, i) => (
                        <li
                          key={opt}
                          className={cn(
                            "rounded-lg px-3 py-2 text-sm ring-1",
                            i === 0
                              ? "bg-[color-mix(in_srgb,var(--wa-green)_12%,white)] font-semibold text-[var(--wa-teal)] ring-[color-mix(in_srgb,var(--wa-green)_28%,transparent)]"
                              : "bg-white text-ink ring-line",
                          )}
                        >
                          {opt}
                        </li>
                      ))}
                    </ul>
                  </article>
                ) : null}

                {id === "button" ? (
                  <article className="wap-rich__card overflow-hidden">
                    <p className="border-b border-line px-3 py-2.5 text-sm text-ink">
                      {t("phone.buttonBody")}
                    </p>
                    <div className="divide-y divide-line">
                      {buttons.map((label) => (
                        <p
                          key={label}
                          className="px-3 py-2.5 text-center text-sm font-semibold text-[var(--wa-teal)]"
                        >
                          {label}
                        </p>
                      ))}
                    </div>
                  </article>
                ) : null}

                {id === "document" ? (
                  <article className="wap-rich__card flex items-center gap-3 p-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-[var(--wa-teal)]">
                      <FileTextIcon className="h-5 w-5" />
                    </span>
                    <p className="text-sm font-semibold text-ink">
                      {t("phone.fileName")}
                    </p>
                  </article>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
