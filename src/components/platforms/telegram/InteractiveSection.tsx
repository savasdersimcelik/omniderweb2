import Image from "next/image";
import {
  CheckIcon,
  ImagesIcon,
  ListChecksIcon,
  MessageCircleIcon,
  MousePointerClickIcon,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";

const FEATURES = [
  { id: "menus", icon: MousePointerClickIcon },
  { id: "polls", icon: ListChecksIcon },
  { id: "albums", icon: ImagesIcon },
] as const;

const ALBUM_IMAGES = [
  "/images/hero/products/aura.jpg",
  "/images/hero/products/nova.jpg",
  "/images/hero/products/pulse.jpg",
] as const;

type PollRow = {
  title: string;
  description: string;
  picked?: boolean;
};

export async function InteractiveSection() {
  const t = await getTranslations("PlatformTelegram.interactive");
  const menuOptions = t.raw("menus.options") as string[];
  const pollRows = (t.raw("polls.rows") as PollRow[]).slice(0, 3);

  return (
    <section
      id="interactive"
      className="wa-interactive border-t border-line"
      aria-labelledby="tg-interactive-title"
    >
      <Container className="section">
        <header className="wa-interactive__header">
          <div>
            <p className="wa-section-label">
              <MessageCircleIcon aria-hidden="true" />
              {t("eyebrow")}
            </p>
            <h2
              id="tg-interactive-title"
              className="heading-section mt-3 text-balance"
            >
              {t("title")}
            </h2>
          </div>
          <div>
            <p className="text-body text-pretty">{t("subtitle")}</p>
          </div>
        </header>

        <div className="wa-interactive__grid tg-interactive__grid">
          {FEATURES.map(({ id, icon: Icon }) => (
            <article key={id} className="wa-interactive__card">
              <header className="wa-interactive__card-header">
                <span className="wa-interactive__icon" aria-hidden="true">
                  <Icon />
                </span>
                <div>
                  <h3>{t(`tabs.${id}`)}</h3>
                  <p>{t(`cards.${id}`)}</p>
                </div>
              </header>

              <div className="wa-interactive__preview">
                <p className="wa-interactive__preview-label">{t("preview")}</p>

                {id === "menus" && (
                  <>
                    <p className="wa-interactive__message">
                      {t("menus.prompt")}
                    </p>
                    <ul className="wa-interactive__choices">
                      {menuOptions.map((option, index) => (
                        <li
                          key={option}
                          data-selected={index === 0 || undefined}
                        >
                          {option}
                          {index === 0 && <CheckIcon aria-hidden="true" />}
                        </li>
                      ))}
                    </ul>
                    <p className="wa-interactive__result">
                      {t("menus.follow")}
                    </p>
                  </>
                )}

                {id === "polls" && (
                  <>
                    <p className="wa-interactive__message">
                      {t("polls.intro")}
                    </p>
                    <ul className="wa-interactive__products">
                      {pollRows.map((row) => (
                        <li
                          key={row.title}
                          data-selected={row.picked || undefined}
                        >
                          <span className="wa-interactive__product-name">
                            {row.picked && <CheckIcon aria-hidden="true" />}
                            {row.title}
                          </span>
                          <span>{row.description}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {id === "albums" && (
                  <div className="wa-interactive__tracking">
                    <div className="tg-interactive__album" aria-hidden>
                      {ALBUM_IMAGES.map((src) => (
                        <span key={src} className="relative overflow-hidden">
                          <Image
                            src={src}
                            alt=""
                            fill
                            className="object-cover"
                            sizes="120px"
                            unoptimized
                          />
                        </span>
                      ))}
                    </div>
                    <p className="wa-interactive__message">
                      {t("albums.title")}
                    </p>
                    <p className="tg-interactive__album-caption">
                      {t("albums.subtitle")}
                    </p>
                    <p className="wa-interactive__result">
                      {t("albums.follow")}
                    </p>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
