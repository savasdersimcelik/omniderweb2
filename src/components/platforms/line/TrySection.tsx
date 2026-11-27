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

const ACCOUNT = {
  url: "https://line.me/R/oaMessage/@653nqviy/",
  image: "/images/platforms/qr/line.svg",
} as const;

const PROMPTS = ["price", "booking", "order"] as const;

type PromptKey = (typeof PROMPTS)[number];

export function TrySection() {
  const t = useTranslations("PlatformLine.try");
  const [prompt, setPrompt] = useState<PromptKey>("price");

  const prefill = t(`prompts.${prompt}.message`);

  const href = useMemo(
    () => `${ACCOUNT.url}?${encodeURIComponent(prefill)}`,
    [prefill],
  );

  return (
    <section
      id="try-line"
      className="closing-cta"
      aria-labelledby="ln-try-title"
    >
      <div className="closing-cta__orbit" aria-hidden />
      <Container className="section closing-cta__inner">
        <div className="wa-biz-try">
          <div className="wa-biz-try__copy">
            <p className="closing-cta__eyebrow">
              <QrCodeIcon className="size-3.5" aria-hidden />
              {t("eyebrow")}
            </p>
            <h2 id="ln-try-title" className="wa-biz-try__title">
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
            <article className="wa-biz-try__card">
              <div className="wa-biz-try__qr">
                <Image
                  src={ACCOUNT.image}
                  alt={t("account.imageAlt")}
                  width={174}
                  height={174}
                  className="h-auto w-full"
                  unoptimized
                />
                <span>{t("account.handle")}</span>
              </div>

              <div className="wa-biz-try__panel">
                <div className="wa-biz-try__panel-head">
                  <div>
                    <h3>{t("account.title")}</h3>
                    <p>{t("account.lang")}</p>
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
                  title={t("account.ctaTitle")}
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
