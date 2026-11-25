import {
  ImagesIcon,
  ListChecksIcon,
  MessageCircleIcon,
  MousePointerClickIcon,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";

const CARD_ICONS = {
  menus: MousePointerClickIcon,
  polls: ListChecksIcon,
  albums: ImagesIcon,
} as const;

type Card = {
  id: keyof typeof CARD_ICONS;
  title: string;
  desc: string;
  points?: string[];
};

export async function InteractiveSection() {
  const t = await getTranslations("PlatformTelegram.interactive");
  const cards = t.raw("cards") as Card[];
  const keys = t.raw("demo.keys") as string[];
  const options = t.raw("demo.options") as string[];

  return (
    <section
      id="interactive"
      className="tg-interactive border-t border-line"
      aria-labelledby="tg-interactive-title"
    >
      <Container className="section">
        <div className="wa-section-stack">
          <header className="mx-auto max-w-3xl text-center">
            <p className="eyebrow inline-flex items-center justify-center gap-2 text-[var(--color-telegram)]">
              <MessageCircleIcon className="h-3.5 w-3.5" />
              {t("eyebrow")}
            </p>
            <h2
              id="tg-interactive-title"
              className="heading-section mt-3 text-balance"
            >
              {t("title")}
            </h2>
            <p className="tg-lede text-body mt-4">{t("subtitle")}</p>
          </header>

          <div className="tg-interactive__grid">
            <ul className="tg-interactive__cards">
              {cards.map((card) => {
                const Icon = CARD_ICONS[card.id] ?? MousePointerClickIcon;
                return (
                  <li key={card.id}>
                    <article className="tg-interactive__card">
                      <span className="tg-interactive__ico">
                        <Icon className="h-4 w-4" />
                      </span>
                      <div className="tg-interactive__card-copy">
                        <h3>{card.title}</h3>
                        <p>{card.desc}</p>
                        {card.points?.length ? (
                          <ul className="tg-interactive__points">
                            {card.points.map((point) => (
                              <li key={point}>{point}</li>
                            ))}
                          </ul>
                        ) : null}
                      </div>
                    </article>
                  </li>
                );
              })}
            </ul>

            <div className="tg-interactive__widget" aria-hidden>
              <header className="tg-modes__phone-top">
                <span className="tg-modes__avatar">
                  <MessageCircleIcon className="h-4 w-4" />
                </span>
                <span className="min-w-0">
                  <strong>{t("demo.botName")}</strong>
                  <small>{t("demo.online")}</small>
                </span>
              </header>
              <div className="tg-modes__chat">
                <p className="tg-modes__bubble">{t("demo.greeting")}</p>
                <div className="tg-modes__keys">
                  {keys.map((key) => (
                    <span key={key}>{key}</span>
                  ))}
                </div>
                <div className="tg-modes__album">
                  <span />
                  <span />
                  <span />
                </div>
                <p className="tg-modes__typing">
                  <span className="tg-modes__dots">
                    <i />
                    <i />
                    <i />
                  </span>
                  {t("demo.typing")}
                </p>
                <div className="tg-modes__poll">
                  <p>{t("demo.poll")}</p>
                  <ul className="tg-modes__opts">
                    {options.map((option, index) => (
                      <li
                        key={option}
                        className={cn(
                          "tg-modes__opt",
                          index === 0 && "is-on",
                        )}
                      >
                        <span className="tg-modes__opt-dot" />
                        <span>{option}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
