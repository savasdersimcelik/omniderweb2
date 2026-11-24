import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { HeroTrust } from "@/components/trust";
import { InstagramHeroBackdrop } from "./InstagramHeroBackdrop";

type Bubble = {
  name: string;
  text: string;
  side: "left" | "right";
  tone: "a" | "b" | "c" | "d";
};

export async function InstagramHero() {
  const t = await getTranslations("PlatformInstagram");
  const bubbles = t.raw("hero.bubbles") as Bubble[];

  return (
    <section
      className="ig-biz-hero viewport-hero relative w-full overflow-hidden border-b border-line"
      aria-labelledby="ig-biz-hero-title"
    >
      <InstagramHeroBackdrop />

      <div className="ig-biz-hero__shell relative z-10">
        <div className="ig-biz-hero__copy">
          <p className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-[var(--ig-purple)]">
            <Image
              src="/icons/platforms/instagram.png"
              alt=""
              width={20}
              height={20}
              className="h-5 w-5 object-contain"
              unoptimized
            />
            {t("hero.badge")}
          </p>
          <h1
            id="ig-biz-hero-title"
            className="ig-biz-hero__title font-bold tracking-tight text-ink"
          >
            <span>{t("hero.titleLine1")}</span>
            <span className="ig-biz-hero__accent">{t("hero.titleLine2")}</span>
          </h1>
          <p className="ig-biz-hero__desc text-ink-subtle">
            {t("hero.description")}
          </p>

          <HeroTrust className="ig-biz-hero__trust" />
        </div>

        <div className="ig-biz-hero__scene" aria-hidden>
          {bubbles.map((bubble, index) => (
            <div
              key={`${bubble.name}-${index}`}
              className={`ig-biz-hero__bubble is-${bubble.side} is-${bubble.tone}`}
            >
              <span className="ig-biz-hero__avatar">
                {bubble.name.slice(0, 1)}
              </span>
              <span className="min-w-0">
                <strong>{bubble.text}</strong>
                <small>{bubble.name}</small>
              </span>
            </div>
          ))}

          <div className="ig-biz-hero__portrait">
            <Image
              src="/images/platforms/instagram/hero-woman.png"
              alt=""
              fill
              priority
              className="object-contain object-bottom"
              sizes="(max-width: 768px) 80vw, 420px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
