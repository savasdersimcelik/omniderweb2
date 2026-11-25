import Image from "next/image";
import {
  ArrowUpRight,
  CalendarDays,
  MessageCircle,
  MousePointerClick,
  TrendingUp,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import { DemoRequestButton } from "@/components/demo";
import { HeroTrust } from "@/components/trust";
import { Link } from "@/i18n/navigation";
import { MessengerHeroBackdrop } from "./MessengerHeroBackdrop";

const FLOW_ICONS = [MousePointerClick, MessageCircle, CalendarDays, TrendingUp];

type FlowStep = {
  title: string;
  detail: string;
};

export async function MessengerHero() {
  const t = await getTranslations("PlatformMessenger");
  const nav = await getTranslations("Nav");
  const steps = t.raw("hero.flow") as FlowStep[];

  return (
    <section
      className="ms-biz-hero viewport-hero relative w-full overflow-hidden border-b border-line"
      aria-labelledby="ms-biz-hero-title"
    >
      <MessengerHeroBackdrop />

      <div className="ms-biz-hero__shell relative z-10">
        <div className="ms-biz-hero__copy">
          <p className="mb-3 inline-flex items-center justify-center gap-2 text-sm font-semibold text-[var(--color-messenger-blue)]">
            <Image
              src="/icons/platforms/messenger.png"
              alt=""
              width={20}
              height={20}
              className="h-5 w-5 object-contain"
              unoptimized
            />
            {t("hero.badge")}
          </p>
          <h1
            id="ms-biz-hero-title"
            className="ms-biz-hero__title font-bold tracking-tight text-ink"
          >
            <span>{t("hero.titleLine1")}</span>
            <span className="ms-biz-hero__accent">{t("hero.titleLine2")}</span>
          </h1>
          <p className="ms-biz-hero__desc text-ink-subtle">
            {t("hero.description")}
          </p>
          <HeroTrust className="ms-biz-hero__trust" />
          <ol className="ms-hero-flow" aria-label={t("hero.flowLabel")}>
            {steps.map((step, index) => {
              const Icon = FLOW_ICONS[index] ?? MessageCircle;
              const active = index === 1;
              return (
                <li
                  key={step.title}
                  className={
                    active
                      ? "ms-hero-flow__step ms-hero-flow__step--active"
                      : "ms-hero-flow__step"
                  }
                >
                  <span className="ms-hero-flow__icon" aria-hidden>
                    <Icon />
                  </span>
                  <span className="ms-hero-flow__text">
                    <span className="ms-hero-flow__title">{step.title}</span>
                    <span className="ms-hero-flow__detail">{step.detail}</span>
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
        <div className="ms-biz-hero__actions">
          <DemoRequestButton source="messenger-hero" className="btn-primary">
            {t("hero.cta")}
            <ArrowUpRight className="size-4" aria-hidden />
          </DemoRequestButton>
          <Link href="/register" className="btn-secondary">
            {nav("startFree")}
          </Link>
        </div>
      </div>
    </section>
  );
}
