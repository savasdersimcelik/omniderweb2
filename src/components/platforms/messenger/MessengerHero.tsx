import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { HeroTrust } from "@/components/trust";
import { MessengerHeroBackdrop } from "./MessengerHeroBackdrop";

export async function MessengerHero() {
  const t = await getTranslations("PlatformMessenger");

  return (
    <section
      className="ms-biz-hero viewport-hero relative w-full overflow-hidden border-b border-line"
      aria-labelledby="ms-biz-hero-title"
    >
      <MessengerHeroBackdrop />

      <div className="ms-biz-hero__shell relative z-10">
        <div className="ms-biz-hero__copy">
          <p className="mb-3 inline-flex items-center justify-center gap-2 text-sm font-semibold text-[var(--color-messenger-blue)]">
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
          <HeroTrust className="ms-biz-hero__trust" />
        </div>
      </div>
    </section>
  );
}
