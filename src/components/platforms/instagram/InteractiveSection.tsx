import Image from "next/image";
import {
  ArrowUpRightIcon,
  CheckIcon,
  ExternalLinkIcon,
  MessageCircleIcon,
  SparklesIcon,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";

const FEATURES = [
  { id: "quick", icon: MessageCircleIcon },
  { id: "ice", icon: SparklesIcon },
  { id: "card", icon: ExternalLinkIcon },
] as const;

const OPTIONS = [0, 1, 2] as const;

const CARD_IMAGE = "/images/platforms/instagram/comment-post.jpg";

type IceRow = {
  title: string;
  description: string;
  picked?: boolean;
};

export async function InteractiveSection() {
  const t = await getTranslations("PlatformInstagram.interactive");
  const iceRows = (t.raw("ice.rows") as IceRow[]).slice(0, 3);

  return (
    <section
      id="interactive"
      className="wa-interactive border-t border-line"
      aria-labelledby="ig-interactive-title"
    >
      <Container className="section">
        <header className="wa-interactive__header">
          <div>
            <p className="wa-section-label">
              <MessageCircleIcon aria-hidden="true" />
              {t("eyebrow")}
            </p>
            <h2
              id="ig-interactive-title"
              className="heading-section mt-3 text-balance"
            >
              {t("title")}
            </h2>
          </div>
          <div>
            <p className="text-body text-pretty">{t("subtitle")}</p>
          </div>
        </header>

        <div className="wa-interactive__grid ig-interactive__grid">
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

                {id === "quick" && (
                  <>
                    <p className="wa-interactive__message">
                      {t("quick.prompt")}
                    </p>
                    <ul className="wa-interactive__choices">
                      {OPTIONS.map((option) => (
                        <li
                          key={option}
                          data-selected={option === 0 || undefined}
                        >
                          {t(`quick.options.${option}`)}
                          {option === 0 && <CheckIcon aria-hidden="true" />}
                        </li>
                      ))}
                    </ul>
                    <p className="wa-interactive__result">
                      {t("quick.follow")}
                    </p>
                  </>
                )}

                {id === "ice" && (
                  <>
                    <p className="wa-interactive__message">{t("ice.intro")}</p>
                    <ul className="wa-interactive__products">
                      {iceRows.map((row) => (
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

                {id === "card" && (
                  <div className="wa-interactive__tracking">
                    <div className="ig-interactive__card-shot relative">
                      <Image
                        src={CARD_IMAGE}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="280px"
                        unoptimized
                      />
                    </div>
                    <p className="wa-interactive__message">{t("card.title")}</p>
                    <p className="ig-interactive__card-price">
                      {t("card.subtitle")}
                    </p>
                    <div className="wa-interactive__destination">
                      <span
                        className="wa-interactive__target-icon"
                        aria-hidden="true"
                      >
                        <ExternalLinkIcon />
                      </span>
                      <div>
                        <p>{t("card.previewTitle")}</p>
                        <p>{t("card.previewUrl")}</p>
                      </div>
                      <ArrowUpRightIcon aria-hidden="true" />
                    </div>
                    <ul className="wa-interactive__choices">
                      {(t.raw("card.buttons") as string[]).map(
                        (label, index) => (
                          <li
                            key={label}
                            data-selected={index === 0 || undefined}
                          >
                            {index === 0 && (
                              <ExternalLinkIcon aria-hidden="true" />
                            )}
                            {label}
                          </li>
                        ),
                      )}
                    </ul>
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
