import type { CSSProperties } from "react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { HeroTrust } from "@/components/trust";

/** Mobile: soft top fade into copy only — no bottom blur. */
const photoMaskMobile: CSSProperties = {
  WebkitMaskImage:
    "linear-gradient(180deg, transparent 0%, #000 14%, #000 100%)",
  maskImage:
    "linear-gradient(180deg, transparent 0%, #000 14%, #000 100%)",
};

/** Desktop: left soft fade only — no bottom blur. */
const photoMask: CSSProperties = {
  WebkitMaskImage: "linear-gradient(90deg, transparent 0%, #000 38%, #000 100%)",
  maskImage: "linear-gradient(90deg, transparent 0%, #000 38%, #000 100%)",
};

export async function WhatsAppBusinessHero() {
  const t = await getTranslations("PlatformWhatsAppBusiness");

  return (
    <section
      className="wa-biz-hero wa-biz-hero--photo relative isolate flex h-[calc(100svh-var(--header-height)-1px)] max-h-[calc(100svh-var(--header-height)-1px)] min-h-0 w-full overflow-hidden border-b border-[color-mix(in_srgb,var(--wa-deep)_10%,transparent)]"
      aria-labelledby="wa-biz-hero-title"
    >
      <Image
        src="/images/platforms/whatsapp/hero-woman.jpg"
        alt=""
        width={2400}
        height={1600}
        priority
        unoptimized
        sizes="65vw"
        className="pointer-events-none absolute top-0 right-0 bottom-0 z-0 hidden h-full w-auto max-w-none object-cover lg:block"
        style={photoMask}
      />

      <div className="relative z-10 mx-auto flex h-full min-h-0 w-full max-w-360 flex-col px-4 py-4 sm:px-6 lg:pointer-events-none lg:grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-center lg:px-10 lg:py-0 xl:px-14">
        <div className="flex min-h-0 min-w-0 flex-1 flex-col items-center justify-center text-center lg:pointer-events-auto lg:flex-none lg:items-start lg:py-6 lg:pr-6 lg:text-left">
          <p className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-[var(--wa-deep)] lg:mb-5 lg:gap-2.5 lg:text-[15px]">
            <Image
              src="/icons/platforms/whatsapp-business.png"
              alt=""
              width={20}
              height={20}
              className="h-5 w-5 object-contain"
              unoptimized
            />
            {t("hero.badge")}
          </p>
          <h1
            id="wa-biz-hero-title"
            className="font-sans text-[clamp(1.85rem,6.5vw,2.35rem)] font-bold leading-[1.08] tracking-[-0.035em] text-[var(--wa-deep)] lg:text-5xl lg:leading-[1.06] xl:text-6xl"
          >
            <span className="block whitespace-nowrap">{t("hero.titleLine1")}</span>
            <span className="block whitespace-nowrap">{t("hero.titleLine2")}</span>
          </h1>
          <p className="mt-4 line-clamp-2 max-w-lg text-pretty text-lg leading-snug text-[var(--color-ink-muted)] lg:mt-7 lg:max-w-xl lg:text-xl lg:leading-relaxed xl:max-w-2xl xl:text-2xl">
            {t("hero.description")}
          </p>
          <HeroTrust className="home-hero__trust mt-5 max-w-none flex-row flex-nowrap items-center justify-center lg:mt-8 lg:origin-left lg:scale-105 lg:justify-start" />
        </div>

        <div className="relative mt-2 h-[42%] shrink-0 lg:mt-0 lg:h-full">
          <div
            className="absolute inset-0 overflow-hidden lg:hidden"
            style={photoMaskMobile}
          >
            <Image
              src="/images/platforms/whatsapp/hero-woman-mobile.jpg"
              alt=""
              fill
              priority
              unoptimized
              sizes="100vw"
              className="object-cover object-[48%_18%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
