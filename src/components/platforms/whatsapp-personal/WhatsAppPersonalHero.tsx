import Image from "next/image";
import { InfoIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { UserTrust } from "@/components/trust";
import { WhatsAppHeroBackdrop } from "../whatsapp-business/WhatsAppHeroBackdrop";
import { WhatsAppHeroChat } from "../whatsapp-business/WhatsAppHeroChat";

export async function WhatsAppPersonalHero() {
  const t = await getTranslations("PlatformWhatsAppPersonal");
  const tTrust = await getTranslations("Trust");
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
      aria-labelledby="wa-personal-hero-title"
    >
      <WhatsAppHeroBackdrop />

      <div className="home-hero relative z-10 flex h-full min-h-0 w-full flex-1 flex-col items-stretch px-4 pt-0 pb-0 sm:items-center sm:px-6">
        <div className="home-hero__intro wa-biz-hero__intro relative z-10 flex w-full max-w-7xl flex-col items-center justify-center self-center text-center">
          <p className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-[var(--wa-teal)]">
            <Image
              src="/icons/platforms/whatsapp-personal.png"
              alt=""
              width={20}
              height={20}
              className="h-5 w-5 object-contain"
              unoptimized
            />
            {t("hero.badge")}
          </p>
          <h1
            id="wa-personal-hero-title"
            className="wa-biz-hero__title mx-auto text-center font-bold tracking-tight text-[var(--wa-deep)]"
          >
            <span>{t("hero.titleLine1")}</span>
            <span>{t("hero.titleLine2")}</span>
          </h1>

          <p className="wa-biz-hero__desc mx-auto text-center text-[color-mix(in_srgb,var(--wa-deep)_72%,transparent)]">
            {t("hero.description")}
          </p>

          <div className="hero-trust home-hero__trust mt-5">
            <div className="wap-hero__disclaimer" role="note">
              <InfoIcon className="h-4 w-4 shrink-0" aria-hidden />
              <span>
                <strong>{t("hero.disclaimer.title")}</strong>
                <span>{t("hero.disclaimer.body")}</span>
              </span>
            </div>
            <UserTrust
              rating={tTrust("rating")}
              before={tTrust("before")}
              count={tTrust("count")}
              after={tTrust("after")}
            />
          </div>
        </div>

        <div className="hero-chat-shell wa-biz-hero__chat relative z-20 mt-0 flex min-h-0 w-full flex-col items-center self-center">
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
            platformIcon="/icons/platforms/whatsapp-personal.png"
          />
        </div>
      </div>
    </section>
  );
}
