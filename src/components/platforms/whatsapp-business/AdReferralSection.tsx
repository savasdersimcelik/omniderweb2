import Image from "next/image";
import {
  ChartNoAxesColumnIcon,
  ContactIcon,
  ImageIcon,
  MegaphoneIcon,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";

const ITEMS = [
  { key: "card", Icon: ImageIcon },
  { key: "utm", Icon: ChartNoAxesColumnIcon },
  { key: "contact", Icon: ContactIcon },
] as const;

export async function AdReferralSection() {
  const t = await getTranslations("PlatformWhatsAppBusiness.adReferral");

  return (
    <section
      id="ad-referral"
      className="wa-ad-referral border-t border-line bg-surface-subtle/40"
      aria-labelledby="wa-ad-referral-title"
    >
      <Container className="section">
        <div className="wa-section-stack">
          <header className="mx-auto max-w-3xl text-center">
            <p className="eyebrow inline-flex items-center gap-2 text-[var(--wa-teal)]">
              <MegaphoneIcon className="h-3.5 w-3.5" />
              {t("eyebrow")}
            </p>
            <h2 id="wa-ad-referral-title" className="heading-section mt-3">
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
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[color-mix(in_srgb,var(--wa-green)_12%,white)] text-[var(--wa-teal)]">
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

          <div className="wa-ad-referral__scene mt-10">
            <article className="wa-ad-referral__ad">
              <div className="relative aspect-4/5 overflow-hidden rounded-xl bg-slate-100">
                <Image
                  src="/images/platforms/whatsapp/ad-creative.webp"
                  alt=""
                  fill
                  className="object-cover"
                  sizes="280px"
                  unoptimized
                />
              </div>
              <div className="mt-3 flex items-center justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold text-ink">
                    {t("scene.brand")}
                  </p>
                  <p className="text-[11px] text-ink-faint">
                    {t("scene.sponsored")}
                  </p>
                </div>
                <Image
                  src="/icons/platforms/whatsapp-business.png"
                  alt=""
                  width={22}
                  height={22}
                  className="h-5.5 w-5.5 object-contain"
                  unoptimized
                />
              </div>
              <p className="mt-2 text-sm font-semibold text-ink">
                {t("scene.headline")}
              </p>
              <button
                type="button"
                className="mt-3 inline-flex h-10 w-full items-center justify-center rounded-lg bg-[var(--wa-green)] text-sm font-bold text-white"
                tabIndex={-1}
              >
                {t("scene.send")}
              </button>
            </article>

            <article className="wa-ad-referral__inbox">
              <header className="flex items-center justify-between border-b border-line px-4 py-3">
                <p className="text-sm font-semibold text-ink">
                  {t("scene.inbox")}
                </p>
                <span className="rounded-full bg-[color-mix(in_srgb,var(--wa-green)_14%,white)] px-2 py-0.5 text-[10px] font-bold tracking-wide text-[var(--wa-deep)] uppercase">
                  {t("scene.adBadge")}
                </span>
              </header>
              <div className="space-y-3 p-4">
                <div className="overflow-hidden rounded-xl ring-1 ring-line">
                  <div className="relative h-28 bg-slate-100">
                    <Image
                      src="/images/platforms/whatsapp/ad-creative.webp"
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

                <div className="wa-chat__row wa-chat__row--out">
                  <div className="wa-chat__bubble wa-chat__bubble--out max-w-[90%]">
                    <p className="text-[11px] font-semibold opacity-70">
                      {t("scene.customer")}
                    </p>
                    <p>{t("scene.bubble")}</p>
                    <span className="wa-chat__ticks">✓✓</span>
                  </div>
                </div>

                <div className="rounded-xl bg-surface-subtle px-3 py-2 ring-1 ring-line">
                  <p className="text-[11px] font-semibold text-ink-faint uppercase tracking-wide">
                    {t("scene.referralLabel")}
                  </p>
                  <p className="mt-0.5 text-sm font-semibold text-ink">
                    {t("scene.referralPrefix")} · {t("scene.adId")}
                  </p>
                </div>
              </div>
            </article>
          </div>

          <p className="mt-6 text-center text-xs text-ink-faint">{t("footnote")}</p>
        </div>
      </Container>
    </section>
  );
}
