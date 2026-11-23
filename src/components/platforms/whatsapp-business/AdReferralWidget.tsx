"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRightIcon, MoreHorizontalIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

const AD_CREATIVE = "/images/platforms/whatsapp/ad-creative.jpg";

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

const STEP_MS = 1100;
const LOOP_PAUSE_MS = 2400;

export function AdReferralWidget() {
  const t = useTranslations("PlatformWhatsAppBusiness.adReferral");
  const [step, setStep] = useState(0);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const run = (index: number) => {
      setStep(index);
      if (index >= STEPS.length - 1) {
        timer = setTimeout(() => run(0), LOOP_PAUSE_MS);
        return;
      }
      timer = setTimeout(() => run(index + 1), STEP_MS);
    };
    timer = setTimeout(() => run(0), 400);
    return () => clearTimeout(timer);
  }, []);

  const current = STEPS[step] as Step;
  const at = (name: Step) => STEPS.indexOf(current) >= STEPS.indexOf(name);
  const chips = [
    "utm_source=omnider_whatsapp",
    "utm_medium=chat_referral",
    "utm_campaign=meta_ad",
    `utm_term=${t("scene.adId")}`,
  ];

  return (
    <div
      className={cn(
        "wa-ad-referral__scene",
        at("tap") && "has-tap",
        at("beam") && "has-beam",
      )}
      aria-hidden
    >
      <article className="wa-ad-referral__ad">
        <header className="wa-ad-referral__ad-head">
          <span className="wa-ad-referral__ad-avatar">
            <Image
              src="/icons/platforms/whatsapp-business.png"
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
            <p className="text-[11px] text-ink-faint">{t("scene.sponsored")}</p>
          </div>
          <MoreHorizontalIcon className="h-4 w-4 shrink-0 text-ink-faint" />
        </header>

        <div className="wa-ad-referral__ad-media relative aspect-square overflow-hidden bg-slate-100">
          <Image
            src={AD_CREATIVE}
            alt=""
            fill
            className="object-cover"
            sizes="320px"
            unoptimized
          />
          <span className="wa-ad-referral__sponsored">{t("scene.sponsored")}</span>
        </div>

        <div className="wa-ad-referral__ad-body">
          <p className="text-sm font-semibold leading-snug text-ink">
            {t("scene.headline")}
          </p>
          <button
            type="button"
            className={cn(
              "wa-ad-referral__cta mt-3 inline-flex h-10 w-full items-center justify-center gap-1.5 rounded-lg bg-[var(--wa-green)] text-sm font-bold text-white",
              at("tap") && "is-tap",
            )}
            tabIndex={-1}
          >
            <Image
              src="/icons/platforms/whatsapp-business.png"
              alt=""
              width={16}
              height={16}
              className="h-4 w-4 object-contain brightness-0 invert"
              unoptimized
            />
            {t("scene.send")}
          </button>
        </div>
      </article>

      <div className="wa-ad-referral__beam" aria-hidden>
        <span className="wa-ad-referral__beam-line" />
        <span className="wa-ad-referral__beam-dot">
          <ArrowRightIcon className="h-3.5 w-3.5" />
        </span>
      </div>

      <article className="wa-ad-referral__inbox">
        <header className="flex items-center justify-between border-b border-line px-4 py-3">
          <p className="text-sm font-semibold text-ink">{t("scene.inbox")}</p>
          <span
            className={cn(
              "wa-ad-referral__badge rounded-full bg-[color-mix(in_srgb,var(--wa-green)_14%,white)] px-2 py-0.5 text-[10px] font-bold tracking-wide text-[var(--wa-deep)] uppercase",
              at("card") && "is-on",
            )}
          >
            {t("scene.adBadge")}
          </span>
        </header>

        <div className="wa-ad-referral__thread space-y-3 p-4">
          {at("card") ? (
            <div className="wa-ad-referral__card is-in overflow-hidden rounded-xl ring-1 ring-line">
              <div className="relative h-28 bg-slate-100">
                <Image
                  src={AD_CREATIVE}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="320px"
                  unoptimized
                />
              </div>
              <div className="bg-white px-3 py-2">
                <p className="text-xs font-semibold text-ink">
                  {t("scene.headline")}
                </p>
                <p className="text-[11px] text-[var(--wa-teal)]">
                  {t("scene.link")}
                </p>
              </div>
            </div>
          ) : null}

          {at("typing") && !at("bubble") ? (
            <div className="wa-chat__row wa-chat__row--in">
              <div className="wa-chat__bubble wa-chat__bubble--in wa-chat__typing">
                <span />
                <span />
                <span />
              </div>
            </div>
          ) : null}

          {at("bubble") ? (
            <div className="wa-chat__row wa-chat__row--in wa-ad-referral__msg is-in">
              <div className="wa-chat__bubble wa-chat__bubble--in max-w-[92%]">
                <p className="text-[11px] font-semibold text-[var(--wa-teal)]">
                  {t("scene.customer")}
                </p>
                <p>{t("scene.bubble")}</p>
              </div>
            </div>
          ) : null}

          {at("referral") ? (
            <div className="wa-ad-referral__meta is-in rounded-xl bg-surface-subtle px-3 py-2 ring-1 ring-line">
              <p className="text-[11px] font-semibold tracking-wide text-ink-faint uppercase">
                {t("scene.referralLabel")}
              </p>
              <p className="mt-0.5 text-sm font-semibold text-ink">
                {t("scene.referralPrefix")} · {t("scene.adId")}
              </p>
            </div>
          ) : null}

          {at("chips") ? (
            <ul className="wa-ad-referral__chips is-in">
              {chips.map((chip, index) => (
                <li
                  key={chip}
                  style={{ animationDelay: `${index * 80}ms` }}
                  className="wa-ad-referral__chip"
                >
                  {chip}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </article>
    </div>
  );
}
