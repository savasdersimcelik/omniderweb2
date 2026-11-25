import type { CSSProperties } from "react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { HeroTrust } from "@/components/trust";

/** Mobile: soft top fade into copy (single mask — reliable on Safari/Android). */
const photoMaskMobile: CSSProperties = {
  WebkitMaskImage:
    "linear-gradient(180deg, transparent 0%, #000 14%, #000 86%, transparent 100%)",
  maskImage:
    "linear-gradient(180deg, transparent 0%, #000 14%, #000 86%, transparent 100%)",
};

const photoMask: CSSProperties = {
  WebkitMaskImage:
    "linear-gradient(90deg, transparent 0%, #000 38%, #000 100%), linear-gradient(transparent 0%, #000 3%, #000 98%, transparent 100%)",
  maskImage:
    "linear-gradient(90deg, transparent 0%, #000 38%, #000 100%), linear-gradient(transparent 0%, #000 3%, #000 98%, transparent 100%)",
  WebkitMaskComposite: "source-in",
  maskComposite: "intersect",
};

function MessengerMark() {
  return (
    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#0072e6] text-white shadow-[0_8px_16px_-10px_rgba(0,84,180,0.9)]">
      <svg viewBox="0 0 24 24" className="size-[1.15rem]" aria-hidden>
        <path
          fill="currentColor"
          d="M12 2C6.36 2 2 6.13 2 11.7c0 2.91 1.19 5.44 3.14 7.17.16.14.26.34.27.55l.05 1.72a.75.75 0 0 0 1.05.66l1.92-.85a.9.9 0 0 1 .6-.04c.94.26 1.94.4 2.97.4 5.64 0 10-4.13 10-9.7C22 6.13 17.64 2 12 2Zm5.92 7.55-2.94 4.66a1.12 1.12 0 0 1-1.62.3l-2.34-1.76a.45.45 0 0 0-.54 0l-3.16 2.4c-.31.24-.72-.14-.5-.46l2.94-4.66a1.12 1.12 0 0 1 1.62-.3l2.34 1.76a.45.45 0 0 0 .54 0l3.16-2.4c.31-.24.72.14.5.46Z"
        />
      </svg>
    </span>
  );
}

export async function MessengerHero() {
  const t = await getTranslations("PlatformMessenger");

  return (
    <section
      className="relative isolate flex h-[calc(100svh-var(--header-height)-1px)] max-h-[calc(100svh-var(--header-height)-1px)] min-h-0 w-full overflow-hidden border-b border-slate-200/70 bg-[linear-gradient(105deg,#ffffff_0%,#f7fbff_28%,#eef5ff_52%,#f4f8ff_72%,#ffffff_100%)]"
      aria-labelledby="ms-biz-hero-title"
    >
      <Image
        src="/images/platforms/messenger/hero-woman.jpg"
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
          <p className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-slate-950 lg:mb-5 lg:gap-2.5 lg:text-[15px]">
            <MessengerMark />
            {t("hero.badge")}
          </p>
          <h1
            id="ms-biz-hero-title"
            className="font-sans text-[clamp(1.85rem,6.5vw,2.35rem)] font-bold leading-[1.08] tracking-[-0.035em] text-slate-950 lg:text-5xl lg:leading-[1.06] xl:text-6xl"
          >
            {t.rich("hero.title", {
              line: (chunks) => <span className="block whitespace-nowrap">{chunks}</span>,
              accent: (chunks) => <span className="text-[#0072e6]">{chunks}</span>,
            })}
          </h1>
          <p className="mt-4 line-clamp-2 max-w-lg text-pretty text-lg leading-snug text-slate-600 lg:mt-7 lg:max-w-xl lg:text-xl lg:leading-relaxed xl:max-w-2xl xl:text-2xl">
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
              src="/images/platforms/messenger/hero-woman-mobile.jpg"
              alt=""
              fill
              priority
              unoptimized
              sizes="100vw"
              className="object-cover object-[48%_22%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
