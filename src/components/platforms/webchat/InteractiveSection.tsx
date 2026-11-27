import Image from "next/image";
import {
  CheckIcon,
  ListChecksIcon,
  MessageCircleIcon,
  MousePointerClickIcon,
  PackageIcon,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";

const FEATURES = [
  { id: "buttons", icon: MousePointerClickIcon },
  { id: "polls", icon: ListChecksIcon },
  { id: "products", icon: PackageIcon },
] as const;

const PRODUCT_IMAGE = "/images/hero/products/aura.jpg";

type PollRow = {
  title: string;
  description: string;
  picked?: boolean;
};

export async function InteractiveSection() {
  const t = await getTranslations("PlatformWebchat.interactive");
  const buttonOptions = t.raw("buttons.options") as string[];
  const pollRows = (t.raw("polls.rows") as PollRow[]).slice(0, 3);

  return (
    <section
      id="interactive"
      className="wa-interactive border-t border-line"
      aria-labelledby="wc-interactive-title"
    >
      <Container className="section">
        <header className="wa-interactive__header">
          <div>
            <p className="wa-section-label">
              <MessageCircleIcon aria-hidden="true" />
              {t("eyebrow")}
            </p>
            <h2
              id="wc-interactive-title"
              className="heading-section mt-3 text-balance"
            >
              {t("title")}
            </h2>
          </div>
          <div>
            <p className="text-body text-pretty">{t("subtitle")}</p>
          </div>
        </header>

        <div className="wa-interactive__grid wc-interactive__grid">
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

                {id === "buttons" && (
                  <>
                    <p className="wa-interactive__message">
                      {t("buttons.prompt")}
                    </p>
                    <ul className="wa-interactive__choices">
                      {buttonOptions.map((option, index) => (
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
                      {t("buttons.follow")}
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

                {id === "products" && (
                  <div className="wa-interactive__tracking">
                    <div className="wc-interactive__card-shot relative">
                      <Image
                        src={PRODUCT_IMAGE}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="280px"
                        unoptimized
                      />
                    </div>
                    <p className="wa-interactive__message">
                      {t("products.name")}
                    </p>
                    <p className="wc-interactive__card-price">
                      {t("products.price")} · {t("products.stock")}
                    </p>
                    <p className="wa-interactive__result">
                      {t("products.follow")}
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
