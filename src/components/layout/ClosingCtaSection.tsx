import Image from "next/image";
import { getTranslations } from "next-intl/server";
import {
  ArrowUpRight,
  Check,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { DemoRequestButton } from "@/components/demo";
import { Container } from "@/components/layout/Container";
import { Link } from "@/i18n/navigation";

const TRUST_AVATARS = [
  "/images/hero/trust/1.jpg",
  "/images/hero/trust/2.jpg",
  "/images/hero/trust/3.jpg",
  "/images/hero/trust/4.jpg",
] as const;

const PREVIEW_THREADS = [
  {
    channel: "wa",
    nameKey: "preview.thread1Name" as const,
    msgKey: "preview.thread1Msg" as const,
    time: "2m",
    unread: 3,
  },
  {
    channel: "ig",
    nameKey: "preview.thread2Name" as const,
    msgKey: "preview.thread2Msg" as const,
    time: "8m",
    unread: 1,
  },
  {
    channel: "ms",
    nameKey: "preview.thread3Name" as const,
    msgKey: "preview.thread3Msg" as const,
    time: "14m",
    unread: 0,
  },
] as const;

export async function ClosingCtaSection() {
  const t = await getTranslations("ClosingCta");
  const perks = t.raw("perks") as string[];

  return (
    <section className="closing-cta" aria-labelledby="closing-cta-title">
      <div className="closing-cta__orbit" aria-hidden />
      <Container className="section closing-cta__inner">
        <div className="closing-cta__grid">
          <div className="closing-cta__copy">
            <p className="closing-cta__eyebrow">
              <Sparkles className="size-3.5" aria-hidden />
              {t("eyebrow")}
            </p>

            <h2 id="closing-cta-title" className="closing-cta__title">
              <span className="closing-cta__title-accent">{t("title")}</span>
              <span className="closing-cta__title-rest">{t("titleAccent")}</span>
            </h2>

            <p className="closing-cta__desc">{t("description")}</p>

            <div className="closing-cta__trust">
              <div className="closing-cta__avatars" aria-hidden>
                {TRUST_AVATARS.map((src) => (
                  <span key={src} className="closing-cta__avatar">
                    <Image
                      src={src}
                      alt=""
                      width={40}
                      height={40}
                      className="size-full object-cover"
                    />
                  </span>
                ))}
              </div>
              <p className="closing-cta__trust-text">{t("socialProof")}</p>
            </div>

            <div className="closing-cta__actions">
              <Link href="/register" className="btn-primary closing-cta__btn-primary">
                {t("ctaPrimary")}
                <ArrowUpRight className="size-4" aria-hidden />
              </Link>
              <DemoRequestButton
                source="closing-cta"
                className="btn-secondary closing-cta__btn-secondary"
              >
                {t("ctaSecondary")}
              </DemoRequestButton>
            </div>
          </div>

          <aside className="closing-cta__card" aria-hidden="true">
            <div className="closing-cta__card-glow" />

            <div className="closing-cta__card-top">
              <div className="closing-cta__badge">
                <span className="closing-cta__badge-pulse" />
                {t("trialBadge")}
              </div>
              <p className="closing-cta__card-title">{t("cardTitle")}</p>
              <p className="closing-cta__card-subtitle">{t("cardSubtitle")}</p>
            </div>

            <ul className="closing-cta__perks">
              {perks.map((perk) => (
                <li key={perk}>
                  <span className="closing-cta__perk-icon">
                    <Check className="size-3.5" />
                  </span>
                  <span>{perk}</span>
                </li>
              ))}
            </ul>

            <div className="closing-cta__inbox">
              <div className="closing-cta__inbox-bar">
                <div className="closing-cta__inbox-brand">
                  <span className="closing-cta__inbox-logo">O</span>
                  <span>Omnider</span>
                </div>
                <span className="closing-cta__inbox-live">
                  <span className="closing-cta__inbox-dot" />
                  {t("preview.live")}
                </span>
              </div>

              <div className="closing-cta__inbox-list">
                {PREVIEW_THREADS.map((thread, index) => (
                  <div
                    key={thread.nameKey}
                    className={`closing-cta__thread${index === 0 ? " is-active" : ""}`}
                    style={{ animationDelay: `${index * 120}ms` }}
                  >
                    <span
                      className={`closing-cta__thread-avatar closing-cta__thread-avatar--${thread.channel}`}
                    >
                      <MessageCircle className="size-3.5" />
                    </span>
                    <div className="closing-cta__thread-body">
                      <div className="closing-cta__thread-row">
                        <strong>{t(thread.nameKey)}</strong>
                        <time>{thread.time}</time>
                      </div>
                      <p>{t(thread.msgKey)}</p>
                    </div>
                    {thread.unread > 0 ? (
                      <span className="closing-cta__thread-badge">
                        {thread.unread}
                      </span>
                    ) : null}
                  </div>
                ))}
              </div>

              <div className="closing-cta__inbox-foot">
                <span>{t("preview.footer")}</span>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
