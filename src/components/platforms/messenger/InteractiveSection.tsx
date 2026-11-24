"use client";

import {
  ExternalLinkIcon,
  GalleryHorizontalIcon,
  MailIcon,
  MessageCircleIcon,
  MousePointerClickIcon,
  PhoneIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";
import { ProductArt } from "./ProductArt";

const COLUMNS = [
  { id: "cards" as const, Icon: GalleryHorizontalIcon },
  { id: "quick" as const, Icon: MessageCircleIcon },
  { id: "actions" as const, Icon: MousePointerClickIcon },
];

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

export function InteractiveSection() {
  const t = useTranslations("PlatformMessenger.interactive");
  const products = t.raw("demo.products") as Product[];
  const quick = t.raw("demo.quick") as string[];
  const actions = t.raw("demo.actions") as Action[];
  const picked = t("demo.quickPicked");

  return (
    <section
      id="interactive"
      className="ms-interactive border-t border-line"
      aria-labelledby="ms-interactive-title"
    >
      <Container className="section">
        <div className="wa-section-stack">
          <header className="mx-auto max-w-3xl text-center">
            <p className="eyebrow inline-flex items-center justify-center gap-2 text-[var(--color-messenger-blue)]">
              <MessageCircleIcon className="h-3.5 w-3.5" />
              {t("eyebrow")}
            </p>
            <h2 id="ms-interactive-title" className="heading-section mt-3">
              {t("title")}
            </h2>
            <p className="ms-interactive__subtitle text-body mt-4">
              {t("subtitle")}
            </p>
          </header>

          <div className="ms-interactive__cols">
            {COLUMNS.map(({ id, Icon }) => (
              <article key={id} className="ms-interactive__col">
                <div className="ms-interactive__col-copy">
                  <div className="ms-interactive__col-heading">
                    <span className="ms-interactive__col-icon">
                      <Icon className="h-4 w-4" />
                    </span>
                    <h3 className="ms-interactive__col-title">{t(`tabs.${id}`)}</h3>
                  </div>
                  <p className="ms-interactive__col-desc">
                    {t(`facts.${id}.body`)}
                    {id === "cards" ? ` ${t("facts.flow.body")}` : null}
                  </p>
                </div>

                <div className="ms-interactive__widget">
                  {id === "cards" ? (
                    <div className="ms-interactive__widget-inner">
                      <p className="ms-interactive__bubble is-in">
                        {t("demo.cardsIntro")}
                      </p>
                      <div className="ms-interactive__rail">
                        {products.map((product, index) => (
                          <article
                            key={product.name}
                            className={cn(
                              "ms-interactive__pcard",
                              index === 0 && "is-hit",
                            )}
                          >
                            <div className="ms-interactive__shot">
                              <ProductArt tone={product.tone} />
                            </div>
                            <p className="ms-interactive__card-body">{product.name}</p>
                            <p className="ms-interactive__card-sub">{product.price}</p>
                            <span className="ms-interactive__choice">
                              {t("demo.viewProduct")}
                            </span>
                          </article>
                        ))}
                      </div>
                      <p className="ms-interactive__bubble is-out">
                        {t("demo.cardsFollow")}
                      </p>
                    </div>
                  ) : null}

                  {id === "quick" ? (
                    <div className="ms-interactive__widget-inner">
                      <article className="ms-interactive__card">
                        <p className="ms-interactive__card-body">
                          {t("demo.quickIntro")}
                        </p>
                        <div className="ms-interactive__actions">
                          {quick.map((label) => (
                            <span
                              key={label}
                              className={cn(
                                "ms-interactive__choice",
                                label === picked && "is-hit",
                              )}
                            >
                              {label}
                            </span>
                          ))}
                        </div>
                      </article>
                      <p className="ms-interactive__bubble is-out">{picked}</p>
                    </div>
                  ) : null}

                  {id === "actions" ? (
                    <div className="ms-interactive__widget-inner">
                      <article className="ms-interactive__card">
                        <p className="ms-interactive__card-body">
                          {t("demo.actionsIntro")}
                        </p>
                        <div className="ms-interactive__actions">
                          {actions.map((action, index) => {
                            const ActionIcon = ACTION_ICONS[action.id];
                            return (
                              <span
                                key={action.id}
                                className={cn(
                                  "ms-interactive__choice",
                                  index === 0 && "is-hit",
                                )}
                              >
                                <ActionIcon className="h-3.5 w-3.5" />
                                {action.label}
                              </span>
                            );
                          })}
                        </div>
                      </article>
                    </div>
                  ) : null}
                </div>
              </article>
            ))}
          </div>

          <p className="ms-interactive__note">{t("note")}</p>
        </div>
      </Container>
    </section>
  );
}
