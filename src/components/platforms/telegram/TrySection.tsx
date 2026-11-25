import Image from "next/image";
import { ScanLineIcon, SendIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";

type TryCard = {
  key: "bot" | "personal";
  image: string;
};

const CARDS: TryCard[] = [
  { key: "bot", image: "/images/platforms/qr/telegram-bot.svg" },
  { key: "personal", image: "/images/platforms/qr/telegram-personal.svg" },
];

export async function TrySection() {
  const t = await getTranslations("PlatformTelegram.try");

  return (
    <section
      id="try-telegram"
      className="tg-try border-t border-line"
      aria-labelledby="tg-try-title"
    >
      <Container className="section">
        <header className="mx-auto max-w-3xl text-center">
          <p className="eyebrow inline-flex items-center justify-center gap-2 text-[var(--color-telegram)]">
            <ScanLineIcon className="h-4 w-4" />
            {t("eyebrow")}
          </p>
          <h2 id="tg-try-title" className="heading-section mt-3 text-balance">
            {t("title")}
          </h2>
          <p className="tg-lede text-body mt-4">{t("body")}</p>
        </header>

        <div className="tg-try__grid mt-10">
          {CARDS.map((card) => (
            <article key={card.key} className="tg-try__card">
              <div className="px-5 pt-5">
                <h3 className="text-lg font-semibold tracking-tight text-ink">
                  {t(`${card.key}.title`)}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-subtle text-pretty">
                  {t(`${card.key}.body`)}
                </p>
                <p className="mt-2 inline-flex rounded-full bg-[color-mix(in_srgb,var(--color-telegram)_10%,white)] px-2.5 py-1 text-xs font-bold text-[var(--color-telegram)]">
                  {t(`${card.key}.handle`)}
                </p>
              </div>
              <div className="flex flex-col items-center gap-4 px-5 pt-4 pb-5">
                <div className="w-full max-w-[220px] rounded-lg bg-white p-3 ring-1 ring-line">
                  <Image
                    src={card.image}
                    alt={t(`${card.key}.imageAlt`)}
                    width={174}
                    height={174}
                    className="h-auto w-full"
                    unoptimized
                  />
                </div>
                <a
                  href={t(`${card.key}.url`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={t(`${card.key}.ctaTitle`)}
                  className="btn-telegram inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg px-4 text-sm font-bold"
                >
                  <SendIcon className="h-4 w-4" />
                  {t(`${card.key}.cta`)}
                </a>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
