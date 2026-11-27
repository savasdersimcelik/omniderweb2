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

const LINES = [
  {
    key: "bot" as const,
    url: "https://t.me/omnider_bot",
    image: "/images/platforms/qr/telegram-bot.svg",
  },
  {
    key: "personal" as const,
    url: "https://t.me/omnidertech",
    image: "/images/platforms/qr/telegram-personal.svg",
  },
] as const;

const PROMPTS = ["price", "booking", "order"] as const;

type LineKey = (typeof LINES)[number]["key"];
type PromptKey = (typeof PROMPTS)[number];

export function TrySection() {
  const t = useTranslations("PlatformTelegram.try");
  const [line, setLine] = useState<LineKey>("bot");
  const [prompt, setPrompt] = useState<PromptKey>("price");

  const active = LINES.find((item) => item.key === line) ?? LINES[0];
  const prefill = t(`prompts.${prompt}.message`);

  const href = useMemo(() => {
    const url = new URL(active.url);
    if (active.key === "bot") {
      url.searchParams.set("start", prompt);
    }
    return url.toString();
  }, [active.key, active.url, prompt]);

  return (
    <section
      id="try-telegram"
      className="closing-cta"
      aria-labelledby="tg-try-title"
    >
      <div className="closing-cta__orbit" aria-hidden />
      <Container className="section closing-cta__inner">
        <div className="wa-biz-try">
          <div className="wa-biz-try__copy">
            <p className="closing-cta__eyebrow">
              <QrCodeIcon className="size-3.5" aria-hidden />
              {t("eyebrow")}
            </p>
            <h2 id="tg-try-title" className="wa-biz-try__title">
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
              aria-label={t("linesLabel")}
            >
              {LINES.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  role="tab"
                  aria-selected={line === item.key}
                  className={cn(
                    "wa-biz-try__region",
                    line === item.key && "is-on",
                  )}
                  onClick={() => setLine(item.key)}
                >
                  <span>{t(`lines.${item.key}.title`)}</span>
                  <span>{t(`lines.${item.key}.handle`)}</span>
                </button>
              ))}
            </div>

            <article className="wa-biz-try__card">
              <div className="wa-biz-try__qr">
                <Image
                  src={active.image}
                  alt={t(`lines.${line}.imageAlt`)}
                  width={174}
                  height={174}
                  className="h-auto w-full"
                  unoptimized
                />
                <span>{t(`lines.${line}.handle`)}</span>
              </div>

              <div className="wa-biz-try__panel">
                <div className="wa-biz-try__panel-head">
                  <div>
                    <h3>{t(`lines.${line}.title`)}</h3>
                    <p>{t(`lines.${line}.lang`)}</p>
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
                  title={t(`lines.${line}.ctaTitle`)}
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
