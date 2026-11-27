import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { UserTrust } from "@/components/trust";

export async function WebchatHero() {
  const t = await getTranslations("PlatformWebchat");
  const tTrust = await getTranslations("Trust");

  return (
    <section
      className="wc-biz-hero wc-biz-hero--photo relative isolate flex h-[calc(100svh-var(--header-height)-1px)] max-h-[calc(100svh-var(--header-height)-1px)] min-h-0 w-full overflow-hidden border-b"
      aria-labelledby="wc-hero-title"
    >
      <div className="relative z-10 mx-auto flex h-full min-h-0 w-full max-w-360 flex-col px-4 py-4 sm:px-6 lg:grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-center lg:px-10 lg:py-0 xl:px-14">
        <div className="flex min-h-0 min-w-0 flex-1 flex-col items-center justify-center text-center lg:flex-none lg:items-start lg:py-6 lg:pr-6 lg:text-left">
          <p className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-[var(--wc-primary)] lg:mb-5 lg:gap-2.5 lg:text-[15px]">
            <Image
              src="/icons/platforms/webchat.svg"
              alt=""
              width={20}
              height={20}
              className="h-5 w-5 object-contain"
              unoptimized
            />
            {t("hero.badge")}
          </p>
          <h1
            id="wc-hero-title"
            className="font-sans text-[clamp(1.85rem,6.5vw,2.35rem)] font-bold leading-[1.08] tracking-[-0.035em] text-ink lg:text-5xl lg:leading-[1.06] xl:text-6xl"
          >
            <span className="block whitespace-nowrap">{t("hero.titleLine1")}</span>
            <span className="block whitespace-nowrap text-[var(--wc-primary)]">
              {t("hero.titleLine2")}
            </span>
          </h1>
          <p className="mt-4 line-clamp-2 max-w-lg text-pretty text-lg leading-snug text-ink-subtle lg:mt-7 lg:max-w-xl lg:text-xl lg:leading-relaxed xl:max-w-2xl xl:text-2xl">
            {t("hero.description")}
          </p>

          <div className="hero-trust home-hero__trust mt-5 max-w-none flex-row flex-nowrap items-center justify-center gap-x-4 lg:mt-8 lg:origin-left lg:scale-105 lg:justify-start">
            <p className="meta-tech-provider wc-hero__provider">
              <Image
                src="/icons/platforms/webchat.svg"
                alt=""
                width={30}
                height={30}
                className="meta-tech-provider__mark object-contain"
                unoptimized
              />
              <span>
                <strong>{t("hero.provider.title")}</strong>
                <span>{t("hero.provider.body")}</span>
              </span>
            </p>
            <UserTrust
              rating={tTrust("rating")}
              before={tTrust("before")}
              count={tTrust("count")}
              after={tTrust("after")}
            />
          </div>
        </div>

        {/* Hero visual slot — photo / widget preview later */}
        <div className="relative mt-2 hidden h-[42%] shrink-0 lg:mt-0 lg:block lg:h-full" aria-hidden />
      </div>
    </section>
  );
}
