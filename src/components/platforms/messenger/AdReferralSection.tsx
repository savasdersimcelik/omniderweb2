"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  ArrowRightIcon,
  ChartNoAxesColumnIcon,
  ContactIcon,
  ImageIcon,
  MegaphoneIcon,
  MoreHorizontalIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";

const ITEMS = [
  { key: "card", Icon: ImageIcon },
  { key: "utm", Icon: ChartNoAxesColumnIcon },
  { key: "contact", Icon: ContactIcon },
] as const;

const STEPS = [
  "idle",
  "tap",
  "beam",
  "card",
  "typing",
  "bubble",
  "referral",
  "chips",
] as const;
type Step = (typeof STEPS)[number];

export function AdReferralSection() {
  const t = useTranslations("PlatformMessenger.adReferral");
  const [step, setStep] = useState(0);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const run = (index: number) => {
      setStep(index);
      if (index >= STEPS.length - 1) {
        timer = setTimeout(() => run(0), 2400);
        return;
      }
      timer = setTimeout(() => run(index + 1), 1100);
    };
    timer = setTimeout(() => run(0), 400);
    return () => clearTimeout(timer);
  }, []);

  const current = STEPS[step] as Step;
  const at = (name: Step) => STEPS.indexOf(current) >= STEPS.indexOf(name);
  const chips = [
    "utm_source=omnider_messenger",
    "utm_medium=chat_referral",
    "utm_campaign=meta_ad",
    `utm_term=${t("scene.adId")}`,
  ];

  return (
    <section
      id="ad-referral"
      className="ms-ad-referral border-t border-line"
      aria-labelledby="ms-ad-referral-title"
    >
      <Container className="section">
        <div className="wa-section-stack">
          <header className="mx-auto max-w-3xl text-center">
            <p className="eyebrow inline-flex items-center gap-2 text-[var(--color-messenger-blue)]">
              <MegaphoneIcon className="h-3.5 w-3.5" />
              {t("eyebrow")}
            </p>
            <h2 id="ms-ad-referral-title" className="heading-section mt-3">
              {t("title")}
            </h2>
            <p className="text-body mt-4">{t("lead")}</p>
            <p className="mt-3 text-sm text-ink-subtle">{t("note")}</p>
          </header>

          <ul className="mx-auto mt-8 grid max-w-4xl gap-4 sm:grid-cols-3">
            {ITEMS.map(({ key, Icon }) => (
              <li
                key={key}
                className="rounded-2xl bg-white px-4 py-4 ring-1 ring-line"
              >
                <span className="ms-ico">
                  <Icon className="h-4 w-4" />
                </span>
                <h3 className="mt-3 text-sm font-semibold text-ink">
                  {t(`items.${key}.title`)}
                </h3>
                <p className="mt-1 text-xs leading-5 text-ink-subtle">
                  {t(`items.${key}.body`)}
                </p>
              </li>
            ))}
          </ul>

          <div
            className={cn("ms-ad-referral__scene mt-10", at("beam") && "has-beam")}
            aria-hidden
          >
            <article className="ms-ad-referral__ad">
              <header className="flex items-center gap-2.5 px-3.5 py-3">
                <span className="ms-ad-referral__avatar">
                  <Image
                    src="/icons/platforms/messenger.png"
                    alt=""
                    width={28}
                    height={28}
                    className="h-7 w-7 object-contain"
                    unoptimized
                  />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-ink">
                    {t("scene.brand")}
                  </p>
                  <p className="text-[11px] text-ink-faint">
                    {t("scene.sponsored")}
                  </p>
                </div>
                <MoreHorizontalIcon className="h-4 w-4 text-ink-faint" />
              </header>
              <div className="ms-ad-creative">
                <span>{t("scene.headline")}</span>
                <em>{t("scene.sponsored")}</em>
              </div>
              <div className="p-3.5">
                <p className="text-sm font-semibold text-ink">{t("scene.headline")}</p>
                <button
                  type="button"
                  className={cn("ms-ad-referral__cta mt-3", at("tap") && "is-tap")}
                  tabIndex={-1}
                >
                  {t("scene.send")}
                </button>
              </div>
            </article>

            <div className="ms-ad-referral__beam">
              <span className="ms-ad-referral__beam-line" />
              <span className="ms-ad-referral__beam-dot">
                <ArrowRightIcon className="h-3.5 w-3.5" />
              </span>
            </div>

            <article className="ms-ad-referral__inbox">
              <header className="flex items-center justify-between border-b border-line px-4 py-3">
                <p className="text-sm font-semibold text-ink">{t("scene.inbox")}</p>
                <span className={cn("ms-pill", at("card") ? "opacity-100" : "opacity-40")}>
                  {t("scene.adBadge")}
                </span>
              </header>
              <div className="space-y-3 p-4">
                {at("card") ? (
                  <div className="overflow-hidden rounded-xl ring-1 ring-line">
                    <div className="ms-ad-creative is-thumb">
                      <span>{t("scene.headline")}</span>
                    </div>
                    <div className="bg-white px-3 py-2">
                      <p className="text-xs font-semibold text-ink">{t("scene.headline")}</p>
                      <p className="text-[11px] text-[var(--color-messenger-blue)]">
                        {t("scene.link")}
                      </p>
                    </div>
                  </div>
                ) : null}
                {at("typing") && !at("bubble") ? (
                  <div className="ms-chat__row ms-chat__row--in">
                    <div className="ms-chat__bubble ms-chat__typing">
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                ) : null}
                {at("bubble") ? (
                  <div className="ms-chat__row ms-chat__row--in">
                    <div className="ms-chat__bubble max-w-[92%]">
                      <p className="text-[11px] font-semibold text-[var(--color-messenger-blue)]">
                        {t("scene.customer")}
                      </p>
                      <p>{t("scene.bubble")}</p>
                    </div>
                  </div>
                ) : null}
                {at("referral") ? (
                  <div className="rounded-xl bg-surface-subtle px-3 py-2 ring-1 ring-line">
                    <p className="text-[11px] font-semibold tracking-wide text-ink-faint uppercase">
                      {t("scene.referralLabel")}
                    </p>
                    <p className="mt-0.5 text-sm font-semibold text-ink">
                      {t("scene.referralPrefix")} · {t("scene.adId")}
                    </p>
                  </div>
                ) : null}
                {at("chips") ? (
                  <ul className="ms-ad-referral__chips">
                    {chips.map((chip) => (
                      <li key={chip} className="ms-ad-referral__chip">
                        {chip}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </article>
          </div>

          <p className="mt-6 text-center text-xs text-ink-faint">{t("footnote")}</p>
        </div>
      </Container>
    </section>
  );
}
