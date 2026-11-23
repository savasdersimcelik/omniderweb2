import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { HeroTrust } from "@/components/trust";
import { WhatsAppHeroBackdrop } from "./WhatsAppHeroBackdrop";
import { WhatsAppHeroChat } from "./WhatsAppHeroChat";

export async function WhatsAppBusinessHero() {
  const t = await getTranslations("PlatformWhatsAppBusiness");
  const steps = t.raw("hero.chat.steps") as Array<{
    kind: "customer" | "ai" | "agent" | "typing" | "transfer" | "buttons";
    text?: string;
    buttons?: string[];
  }>;
  const sidebar = t.raw("hero.chat.sidebar") as Array<{
    name: string;
    preview: string;
    time: string;
    unread?: number;
  }>;

  return (
    <section
      className="wa-biz-hero viewport-hero relative w-full overflow-hidden border-b border-[color-mix(in_srgb,var(--wa-deep)_14%,transparent)]"
      aria-labelledby="wa-biz-hero-title"
    >
      <WhatsAppHeroBackdrop />

      <div className="home-hero relative z-10 flex h-full min-h-0 w-full flex-1 flex-col items-stretch px-4 pt-0 pb-0 sm:items-center sm:px-6 sm:pt-8 lg:px-8 lg:pt-14">
        <div className="home-hero__intro relative z-10 flex w-full max-w-7xl flex-col items-center self-center text-center sm:shrink-0">
          <p className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-[var(--wa-teal)]">
            <Image
              src="/icons/platforms/whatsapp-business.png"
              alt=""
              width={20}
              height={20}
              className="h-5 w-5 object-contain"
              unoptimized
            />
            {t("hero.badge")}
          </p>
          <h1
            id="wa-biz-hero-title"
            className="wa-biz-hero__title mx-auto text-center font-bold tracking-tight text-[var(--wa-deep)]"
          >
            <span>{t("hero.titleLine1")}</span>
            <span>{t("hero.titleLine2")}</span>
          </h1>

          <p className="wa-biz-hero__desc mx-auto text-center text-[color-mix(in_srgb,var(--wa-deep)_72%,transparent)]">
            {t("hero.description")}
          </p>

          <HeroTrust className="home-hero__trust" />
        </div>

        <div className="hero-chat-shell relative z-10 mt-0 flex min-h-0 w-full flex-col items-center self-center sm:mt-8 sm:flex-1 lg:mt-10">
          <WhatsAppHeroChat
            businessName={t("hero.chat.businessName")}
            online={t("hero.chat.online")}
            typing={t("hero.chat.typing")}
            aiLabel={t("hero.chat.aiLabel")}
            agentLabel={t("hero.chat.agentLabel")}
            customerName={t("hero.chat.customerName")}
            browserUrl={t("hero.chat.browserUrl")}
            inboxTitle={t("hero.chat.inboxTitle")}
            searchPlaceholder={t("hero.chat.searchPlaceholder")}
            composerPlaceholder={t("hero.chat.composerPlaceholder")}
            sidebar={sidebar}
            steps={steps}
          />
        </div>
      </div>
    </section>
  );
}
