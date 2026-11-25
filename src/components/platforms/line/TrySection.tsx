import Image from "next/image";
import { ScanLineIcon, SendIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";

export async function TrySection() {
  const t = await getTranslations("PlatformLine.try");

  return (
    <section
      id="try-line"
      className="ln-try border-t border-line"
      aria-labelledby="ln-try-title"
    >
      <Container className="section">
        <header className="mx-auto max-w-3xl text-center">
          <p className="eyebrow inline-flex items-center justify-center gap-2 text-[var(--ln-hero-deep)]">
            <ScanLineIcon className="h-4 w-4" />
            {t("eyebrow")}
          </p>
          <h2 id="ln-try-title" className="heading-section mt-3 text-balance">
            {t("title")}
          </h2>
          <p className="ln-lede text-body mt-4">{t("body")}</p>
        </header>

        <article className="ln-try__card mx-auto mt-10 max-w-md">
          <div className="px-5 pt-5 text-center">
            <h3 className="text-lg font-semibold tracking-tight text-ink">
              {t("cardTitle")}
            </h3>
            <p className="mt-2 inline-flex rounded-full bg-[color-mix(in_srgb,var(--ln-hero)_10%,white)] px-2.5 py-1 text-xs font-bold text-[var(--ln-hero-deep)]">
              {t("handle")}
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 px-5 pt-4 pb-5">
            <div className="w-full max-w-[220px] rounded-lg bg-white p-3 ring-1 ring-line">
              <Image
                src="/images/platforms/qr/line.svg"
                alt={t("imageAlt")}
                width={174}
                height={174}
                className="h-auto w-full"
                unoptimized
              />
            </div>
            <a
              href={t("url")}
              target="_blank"
              rel="noopener noreferrer"
              title={t("ctaTitle")}
              className="btn-line inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg px-4 text-sm font-bold"
            >
              <SendIcon className="h-4 w-4" />
              {t("cta")}
            </a>
          </div>
        </article>
      </Container>
    </section>
  );
}