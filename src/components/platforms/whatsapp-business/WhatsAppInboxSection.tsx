import { ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { DemoRequestButton } from "@/components/demo";
import { Link } from "@/i18n/navigation";
import {
  WhatsAppHeroChat,
  type WaHeroStep,
  type WaSidebarItem,
} from "./WhatsAppHeroChat";

type WhatsAppInboxSectionProps = {
  namespace: "PlatformWhatsAppBusiness" | "PlatformWhatsAppPersonal";
  platformIcon?: string;
};

export async function WhatsAppInboxSection({
  namespace,
  platformIcon,
}: WhatsAppInboxSectionProps) {
  const t = await getTranslations(namespace);
  const nav = await getTranslations("Nav");
  const steps = t.raw("hero.chat.steps") as WaHeroStep[];
  const sidebar = t.raw("hero.chat.sidebar") as WaSidebarItem[];
  const isBusiness = namespace === "PlatformWhatsAppBusiness";
  const titleId = isBusiness ? "wa-biz-inbox-title" : "wa-personal-inbox-title";

  return (
    <section className="wa-inbox" aria-labelledby={titleId}>
      <div className="home-hero relative z-10 flex w-full flex-col items-stretch px-4 pt-8 pb-0 sm:items-center sm:px-6 sm:pt-12 lg:px-8 lg:pt-16">
        <div className="home-hero__intro relative z-10 flex w-full max-w-7xl flex-col items-center self-center text-center">
          <h2
            id={titleId}
            className="home-hero__title mx-auto text-center font-bold tracking-tight text-ink"
          >
            <span className="home-hero__title-line">{t("inbox.titleLine1")}</span>
            <span className="home-hero__title-line">{t("inbox.titleLine2")}</span>
          </h2>

          <p className="home-hero__desc mx-auto text-center text-muted-foreground">
            {t("inbox.description")}
          </p>

          {!isBusiness && (
            <div className="home-hero__actions">
              <DemoRequestButton
                source="whatsapp-personal-inbox"
                className="btn-primary"
              >
                {t("inbox.cta")}
                <ArrowUpRight className="size-4" aria-hidden />
              </DemoRequestButton>
              <Link href="/register" className="btn-secondary">
                {nav("startFree")}
              </Link>
            </div>
          )}
        </div>

        <div className="hero-chat-shell relative z-10 mt-6 flex min-h-0 w-full flex-col sm:mt-8">
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
            platformIcon={platformIcon}
          />
        </div>
      </div>
    </section>
  );
}
