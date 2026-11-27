import {
  CheckIcon,
  ExternalLinkIcon,
  GalleryHorizontalIcon,
  MailIcon,
  MessageCircleIcon,
  MousePointerClickIcon,
  PhoneIcon,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";
import { ProductArt } from "./ProductArt";

const FEATURES = [
  { id: "cards", icon: GalleryHorizontalIcon },
  { id: "quick", icon: MessageCircleIcon },
  { id: "actions", icon: MousePointerClickIcon },
] as const;

const ACTION_ICONS = {
  url: ExternalLinkIcon,
  call: PhoneIcon,
  email: MailIcon,
} as const;

type Product = {
  name: string;
  price: string;
  tone: "bag" | "shoe" | "watch";
};

type Action = {
  id: keyof typeof ACTION_ICONS;
  label: string;
};

export async function InteractiveSection() {
  const t = await getTranslations("PlatformMessenger.interactive");
  const featured = (t.raw("products.items") as Product[])[0];
  const quickOptions = t.raw("quick.options") as string[];
  const actions = t.raw("actions.buttons") as Action[];

  return (
    <section
      id="interactive"
      className="wa-interactive border-t border-line"
      aria-labelledby="ms-interactive-title"
    >
      <Container className="section">
        <header className="wa-interactive__header">
          <div>
            <p className="wa-section-label">
              <MessageCircleIcon aria-hidden="true" />
              {t("eyebrow")}
            </p>
            <h2
              id="ms-interactive-title"
              className="heading-section mt-3 text-balance"
            >
              {t("title")}
            </h2>
          </div>
          <div>
            <p className="text-body text-pretty">{t("subtitle")}</p>
          </div>
        </header>

        <div className="wa-interactive__grid ms-interactive__grid">
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

                {id === "cards" && featured && (
                  <div className="wa-interactive__tracking">
                    <div className="ms-interactive__card-shot">
                      <ProductArt tone={featured.tone} />
                    </div>
                    <p className="wa-interactive__message">{featured.name}</p>
                    <p className="ms-interactive__card-price">
                      {featured.price}
                    </p>
                    <ul className="wa-interactive__choices">
                      <li data-selected>
                        <ExternalLinkIcon aria-hidden="true" />
                        {t("products.view")}
                      </li>
                    </ul>
                    <p className="wa-interactive__result">
                      {t("products.follow")}
                    </p>
                  </div>
                )}

                {id === "quick" && (
                  <>
                    <p className="wa-interactive__message">
                      {t("quick.prompt")}
                    </p>
                    <ul className="wa-interactive__choices">
                      {quickOptions.map((option, index) => (
                        <li
                          key={option}
                          data-selected={index === 1 || undefined}
                        >
                          {option}
                          {index === 1 && <CheckIcon aria-hidden="true" />}
                        </li>
                      ))}
                    </ul>
                    <p className="wa-interactive__result">
                      {t("quick.follow")}
                    </p>
                  </>
                )}

                {id === "actions" && (
                  <>
                    <p className="wa-interactive__message">
                      {t("actions.prompt")}
                    </p>
                    <ul className="wa-interactive__choices">
                      {actions.map((action, index) => {
                        const ActionIcon = ACTION_ICONS[action.id];
                        return (
                          <li
                            key={action.id}
                            data-selected={index === 0 || undefined}
                          >
                            <ActionIcon aria-hidden="true" />
                            {action.label}
                          </li>
                        );
                      })}
                    </ul>
                  </>
                )}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
