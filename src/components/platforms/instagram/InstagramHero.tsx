import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { HeroTrust } from "@/components/trust";
import { InstagramHeroBackdrop } from "./InstagramHeroBackdrop";
import { InstagramHeroChat } from "./InstagramHeroChat";

export async function InstagramHero() {
  const t = await getTranslations("PlatformInstagram");
  const steps = t.raw("hero.chat.steps") as Array<{
    kind: "customer" | "ai" | "agent" | "typing" | "transfer";
    text?: string;
  }>;

  return (
    <section
      className="ig-biz-hero viewport-hero relative w-full overflow-hidden border-b border-line"
      aria-labelledby="ig-biz-hero-title"
    >
      <InstagramHeroBackdrop />

      <div className="ig-biz-hero__shell relative z-10">
        <div className="ig-biz-hero__copy">
          <p className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-[var(--ig-purple)]">
            <Image
              src="/icons/platforms/instagram.png"
              alt=""
              width={20}
              height={20}
              className="h-5 w-5 object-contain"
              unoptimized
            />
            {t("hero.badge")}
          </p>
          <h1
            id="ig-biz-hero-title"
            className="ig-biz-hero__title font-bold tracking-tight text-ink"
          >
            <span>{t("hero.titleLine1")}</span>
            <span className="ig-biz-hero__accent">{t("hero.titleLine2")}</span>
          </h1>
          <p className="ig-biz-hero__desc text-ink-subtle">
            {t("hero.description")}
          </p>
          <HeroTrust className="ig-biz-hero__trust" />
        </div>

        <div className="ig-biz-hero__phone">
          <InstagramHeroChat
            online={t("hero.chat.online")}
            typing={t("hero.chat.typing")}
            aiLabel={t("hero.chat.aiLabel")}
            agentLabel={t("hero.chat.agentLabel")}
            customerName={t("hero.chat.customerName")}
            composerPlaceholder={t("hero.chat.composerPlaceholder")}
            steps={steps}
          />
        </div>
      </div>
    </section>
  );
}
