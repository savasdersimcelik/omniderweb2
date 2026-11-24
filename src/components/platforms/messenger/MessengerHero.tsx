import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { HeroTrust } from "@/components/trust";
import { MessengerHeroBackdrop } from "./MessengerHeroBackdrop";
import { ProductArt } from "./ProductArt";

export async function MessengerHero() {
  const t = await getTranslations("PlatformMessenger");
  const steps = t.raw("hero.steps") as string[];
  const chips = t.raw("hero.chat.chips") as string[];
  const pageName = t("hero.chat.pageName");

  return (
    <section
      className="ms-biz-hero viewport-hero relative w-full overflow-hidden border-b border-line"
      aria-labelledby="ms-biz-hero-title"
    >
      <MessengerHeroBackdrop />

      <div className="ms-biz-hero__shell relative z-10">
        <div className="ms-biz-hero__copy">
          <p className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-messenger-blue)]">
            <Image
              src="/icons/platforms/messenger.png"
              alt=""
              width={20}
              height={20}
              className="h-5 w-5 object-contain"
              unoptimized
            />
            {t("hero.badge")}
          </p>
          <h1
            id="ms-biz-hero-title"
            className="ms-biz-hero__title font-bold tracking-tight text-ink"
          >
            <span>{t("hero.titleLine1")}</span>
            <span className="ms-biz-hero__accent">{t("hero.titleLine2")}</span>
          </h1>
          <p className="ms-biz-hero__desc text-ink-subtle">
            {t("hero.description")}
          </p>
          <ol className="ms-hero__steps">
            {steps.map((step, index) => (
              <li key={step} className="ms-hero__step">
                <span>{index + 1}</span>
                {step}
              </li>
            ))}
          </ol>
          <HeroTrust className="ms-biz-hero__trust" />
        </div>

        <div className="ms-biz-hero__scene" aria-hidden>
          <article className="ms-window">
            <header className="ms-window__top">
              <span className="ms-window__avatar">{pageName.slice(0, 1)}</span>
              <span className="min-w-0">
                <strong>{pageName}</strong>
                <small>{t("hero.chat.status")}</small>
              </span>
            </header>
            <div className="ms-window__thread">
              <p className="ms-bubble is-in">{t("hero.chat.incoming")}</p>
              <article className="ms-product">
                <div className="ms-product__art is-bag">
                  <ProductArt tone="bag" />
                </div>
                <p className="ms-product__name">{t("hero.chat.productName")}</p>
                <p className="ms-product__price">{t("hero.chat.productPrice")}</p>
                <span className="ms-product__cta">{t("hero.chat.productCta")}</span>
              </article>
              <div className="ms-chips">
                {chips.map((chip) => (
                  <span key={chip} className="ms-chip">
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
