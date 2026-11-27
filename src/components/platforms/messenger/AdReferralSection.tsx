import Image from "next/image";
import {
  CheckCircle2Icon,
  MessageCircleIcon,
  MousePointerClickIcon,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";

const AD_CREATIVE = "/images/platforms/instagram/ad-creative.jpg";

export async function AdReferralSection() {
  const t = await getTranslations("PlatformMessenger.adReferral");
  const checks = t.raw("checks") as string[];

  return (
    <section
      id="ad-referral"
      className="wa-ad-referral border-t border-line"
      aria-labelledby="ms-ads-title"
    >
      <Container className="section">
        <div className="wa-ad-referral__grid">
          <div className="wa-ad-referral__copy">
            <p className="wa-section-label">
              <MousePointerClickIcon />
              {t("eyebrow")}
            </p>
            <h2 id="ms-ads-title" className="heading-section mt-3 text-balance">
              {t("title")}
            </h2>
            <p className="text-body mt-4 text-pretty">{t("lead")}</p>

            <ul className="wa-ad-referral__checks">
              {checks.map((item) => (
                <li key={item}>
                  <CheckCircle2Icon className="h-5 w-5 shrink-0 text-[var(--ms-primary)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="wa-ad-referral__previews">
            <article className="wa-ad-referral__ad">
              <header className="wa-ad-referral__ad-head">
                <span className="truncate font-semibold text-ink">
                  {t("scene.brand")}
                </span>
                <span className="shrink-0 text-xs text-ink-subtle">
                  {t("scene.sponsored")}
                </span>
              </header>
              <div className="wa-ad-referral__ad-media relative overflow-hidden bg-slate-100">
                <Image
                  src={AD_CREATIVE}
                  alt={t("scene.imageAlt")}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 320px"
                  unoptimized
                />
              </div>
              <div className="wa-ad-referral__ad-body">
                <p className="text-sm leading-snug text-ink">
                  {t("scene.headline")}
                </p>
                <span className="wa-ad-referral__cta">
                  <MessageCircleIcon className="h-4 w-4" />
                  {t("scene.send")}
                </span>
              </div>
            </article>

            <article className="wa-ad-referral__inbox">
              <div className="wa-ad-referral__referral">
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded bg-[color-mix(in_srgb,var(--ms-primary)_12%,white)] px-2 py-0.5 text-[11px] font-semibold text-[var(--ms-deep)]">
                    {t("scene.referralBadge")}
                  </span>
                  <span className="font-mono text-[11px] text-ink-subtle">
                    ad_id: {t("scene.adId")}
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-3">
                  <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded bg-slate-100">
                    <Image
                      src={AD_CREATIVE}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="48px"
                      unoptimized
                    />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-ink">
                      {t("scene.campaign")}
                    </p>
                    <p className="truncate text-xs text-ink-subtle">
                      {t("scene.source")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="wa-ad-referral__thread">
                <div className="wa-ad-referral__bubble wa-ad-referral__bubble--in">
                  <p className="text-sm leading-snug text-ink">
                    {t("scene.bubble")}
                  </p>
                </div>
                <div className="wa-ad-referral__bubble wa-ad-referral__bubble--out">
                  <span className="wa-ad-referral__role">
                    {t("scene.replyRole")}
                  </span>
                  <p className="text-sm leading-snug text-ink">
                    {t("scene.reply")}
                  </p>
                </div>
                <div className="wa-ad-referral__bubble wa-ad-referral__bubble--in">
                  <p className="text-sm leading-snug text-ink">
                    {t("scene.followUp")}
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </Container>
    </section>
  );
}
