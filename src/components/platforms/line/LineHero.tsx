import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { DemoRequestButton } from "@/components/demo";
import { HeroTrust } from "@/components/trust";
import { Link } from "@/i18n/navigation";

export async function LineHero() {
  const t = await getTranslations("PlatformLine.hero");

  return (
    <section
      className="ln-biz-hero viewport-hero relative isolate flex w-full flex-col items-center justify-center overflow-hidden border-b border-[color-mix(in_srgb,var(--ln-hero)_18%,transparent)]"
      aria-labelledby="ln-hero-title"
    >
      <div className="ln-biz-hero__glow ln-biz-hero__glow--a" aria-hidden />
      <div className="ln-biz-hero__glow ln-biz-hero__glow--b" aria-hidden />

      <div className="relative z-10 mx-auto flex w-full max-w-360 flex-col items-center px-4 py-14 text-center sm:px-6 lg:px-10 lg:py-20 xl:px-14">
        <p className="mb-4 inline-flex items-center gap-2.5 text-sm font-semibold text-[var(--ln-hero-deep)] lg:text-[15px]">
          <Image
            src="/icons/platforms/line.png"
            alt=""
            width={20}
            height={20}
            className="h-5 w-5 object-contain"
            unoptimized
          />
          {t("badge")}
        </p>

        <h1
          id="ln-hero-title"
          className="text-[clamp(2rem,6.5vw,3.75rem)] font-bold leading-[1.06] tracking-[-0.035em] text-ink"
        >
          <span className="block">{t("titleLine1")}</span>
          <span className="block text-[var(--ln-hero-deep)]">{t("titleLine2")}</span>
        </h1>

        <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-ink-subtle lg:mt-7 lg:text-xl">
          {t("description")}
        </p>

        <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm text-ink shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--ln-hero)_16%,transparent)]">
          <Image
            src="/icons/platforms/line.png"
            alt=""
            width={18}
            height={18}
            className="h-[18px] w-[18px]"
            unoptimized
          />
          <span>
            <strong className="font-semibold text-ink">{t("account")}</strong>
            <span className="text-ink-subtle"> · {t("accountNote")}</span>
          </span>
        </p>

        <div className="mt-8 flex w-full max-w-md flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:items-center sm:justify-center">
          <DemoRequestButton
            source="line-hero"
            className="btn-primary inline-flex h-12 items-center justify-center px-7"
          >
            {t("ctaPrimary")}
          </DemoRequestButton>
          <Link
            href="/register"
            className="btn-secondary inline-flex h-12 items-center justify-center px-7"
          >
            {t("ctaSecondary")}
          </Link>
        </div>

        <HeroTrust
          showMeta={false}
          className="mt-8 flex-row flex-wrap items-center justify-center gap-x-4 gap-y-3"
        />
      </div>
    </section>
  );
}