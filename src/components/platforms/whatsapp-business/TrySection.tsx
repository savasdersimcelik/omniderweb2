import Image from "next/image";
import { ScanLineIcon, SendIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";

const LINES = [
  {
    key: "turkey" as const,
    url: "https://wa.me/905464199417",
    image: "/images/home/qr/whatsapp.svg",
  },
  {
    key: "europe" as const,
    url: "https://wa.me/447529760393",
    image: "/images/home/qr/whatsapp-europe.svg",
  },
  {
    key: "usa" as const,
    url: "https://wa.me/18457203266",
    image: "/images/home/qr/whatsapp-usa.svg",
  },
];

export async function TrySection() {
  const t = await getTranslations("PlatformWhatsAppBusiness.try");

  return (
    <section
      id="try-whatsapp"
      className="wa-try border-t border-line"
      aria-labelledby="wa-try-title"
    >
      <Container className="section">
        <div className="wa-try__layout">
          <div className="wa-try__copy">
            <p className="wa-section-label">
              <ScanLineIcon />
              {t("eyebrow")}
            </p>
            <h2 id="wa-try-title" className="heading-section mt-3">
              {t("title")}
            </h2>
            <p className="text-body mt-4">{t("body")}</p>
          </div>

          <div className="wa-try__cards">
            {LINES.map((line) => (
              <article
                key={line.key}
                className="wa-try__card rounded-2xl border border-line bg-white shadow-sm"
              >
                <div className="px-4 pt-4 sm:px-5 sm:pt-5">
                  <h3 className="text-base font-semibold tracking-tight text-ink sm:text-lg">
                    {t(`lines.${line.key}.title`)}
                  </h3>
                  <p className="mt-1 text-sm text-ink-subtle">
                    {t(`lines.${line.key}.phone`)}
                  </p>
                </div>
                <div className="flex flex-col items-center gap-4 px-4 pt-4 pb-5 sm:px-5">
                  <div className="w-full max-w-[220px] rounded-lg bg-white p-3 ring-1 ring-line">
                    <Image
                      src={line.image}
                      alt={t(`lines.${line.key}.imageAlt`)}
                      width={174}
                      height={174}
                      className="h-auto w-full"
                      unoptimized
                    />
                  </div>
                  <a
                    href={line.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={t(`lines.${line.key}.ctaTitle`)}
                    className="btn-whatsapp inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg px-4 text-sm font-bold"
                  >
                    <SendIcon className="h-4 w-4" />
                    {t("cta")}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
