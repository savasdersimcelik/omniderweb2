"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  BotIcon,
  HeadsetIcon,
  QrCodeIcon,
  SendIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";

const REGIONS = [
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
] as const;

const PROMPTS = ["price", "booking", "order"] as const;

type RegionKey = (typeof REGIONS)[number]["key"];
type PromptKey = (typeof PROMPTS)[number];

export function TrySection() {
  const t = useTranslations("PlatformWhatsAppBusiness.try");
  const [region, setRegion] = useState<RegionKey>("turkey");
  const [prompt, setPrompt] = useState<PromptKey>("price");

  const active = REGIONS.find((item) => item.key === region) ?? REGIONS[0];
  const prefill = t(`prompts.${prompt}.message`);

  const href = useMemo(() => {
    const url = new URL(active.url);
    url.searchParams.set("text", prefill);
    return url.toString();
  }, [active.url, prefill]);

  return (
    <section
      id="try-whatsapp"
      className="closing-cta"
      aria-labelledby="wa-try-title"
    >
      <div className="closing-cta__orbit" aria-hidden />
      <Container className="section closing-cta__inner">
        <div className="wa-biz-try">
          <div className="wa-biz-try__copy">
            <p className="closing-cta__eyebrow">
              <QrCodeIcon className="size-3.5" aria-hidden />
              {t("eyebrow")}
            </p>
            <h2 id="wa-try-title" className="wa-biz-try__title">
              {t("title")}
            </h2>
            <p className="wa-biz-try__body">{t("body")}</p>

            <div className="wa-biz-try__prompts">
              <p className="wa-biz-try__prompts-label">{t("promptsLabel")}</p>
              <div
                className="wa-biz-try__prompt-list"
                role="tablist"
                aria-label={t("promptsLabel")}
              >
                {PROMPTS.map((id) => (
                  <button
                    key={id}
                    type="button"
                    role="tab"
                    aria-selected={prompt === id}
                    className={cn(
                      "wa-biz-try__prompt",
                      prompt === id && "is-on",
                    )}
                    onClick={() => setPrompt(id)}
                  >
                    {t(`prompts.${id}.tab`)}
                  </button>
                ))}
              </div>
            </div>

            <div className="wa-biz-try__trust">
              <div className="wa-biz-try__trust-item">
                <BotIcon aria-hidden />
                <span>{t("trust.ai")}</span>
              </div>
              <div className="wa-biz-try__trust-item">
                <HeadsetIcon aria-hidden />
                <span>{t("trust.handoff")}</span>
              </div>
            </div>
          </div>

          <div className="wa-biz-try__console">
            <div
              className="wa-biz-try__regions"
              role="tablist"
              aria-label={t("regionsLabel")}
            >
              {REGIONS.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  role="tab"
                  aria-selected={region === item.key}
                  className={cn(
                    "wa-biz-try__region",
                    region === item.key && "is-on",
                  )}
                  onClick={() => setRegion(item.key)}
                >
                  <span>{t(`lines.${item.key}.title`)}</span>
                  <span>{t(`lines.${item.key}.phone`)}</span>
                </button>
              ))}
            </div>

            <article className="wa-biz-try__card">
              <div className="wa-biz-try__qr">
                <Image
                  src={active.image}
                  alt={t(`lines.${region}.imageAlt`)}
                  width={174}
                  height={174}
                  className="h-auto w-full"
                  unoptimized
                />
                <span>{t(`lines.${region}.phone`)}</span>
              </div>

              <div className="wa-biz-try__panel">
                <div className="wa-biz-try__panel-head">
                  <div>
                    <h3>{t(`lines.${region}.title`)}</h3>
                    <p>{t(`lines.${region}.lang`)}</p>
                  </div>
                  <span className="wa-biz-try__online">{t("online")}</span>
                </div>

                <div className="wa-biz-try__prefill">
                  <span>{t("prefillLabel")}</span>
                  <p>{`“${prefill}”`}</p>
                </div>

                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={t(`lines.${region}.ctaTitle`)}
                  className="wa-biz-try__cta"
                >
                  <SendIcon className="h-4 w-4" />
                  {t("cta")}
                </a>
              </div>
            </article>
          </div>
        </div>
      </Container>
    </section>
  );
}
