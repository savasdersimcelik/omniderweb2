import { ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { DemoRequestButton } from "@/components/demo";
import {
  HeroChatWidget,
  type HeroChatCopy,
} from "@/components/home/HeroChatWidget";
import { Link } from "@/i18n/navigation";

export async function InboxSection() {
  const t = await getTranslations("PlatformMessenger.inbox");
  const nav = await getTranslations("Nav");

  const chat: HeroChatCopy = {
    browserUrl: t("chat.browserUrl"),
    inboxTitle: t("chat.inboxTitle"),
    aiLabel: t("chat.aiLabel"),
    agentLabel: t("chat.agentLabel"),
    customerName: t("chat.customerName"),
    deptName: t("chat.deptName"),
    transferLabel: t("chat.transferLabel"),
    typingLabel: t("chat.typingLabel"),
    inStockLabel: t("chat.inStockLabel"),
    outOfStockLabel: t("chat.outOfStockLabel"),
    viewProductLabel: t("chat.viewProductLabel"),
    carouselHint: t.raw("chat.carouselHint") as string,
    products: t.raw("chat.products") as HeroChatCopy["products"],
    sidebar: t.raw("chat.sidebar") as HeroChatCopy["sidebar"],
    steps: t.raw("chat.steps") as HeroChatCopy["steps"],
  };

  return (
    <section className="ms-inbox" aria-labelledby="ms-inbox-title">
      <div className="home-hero relative z-10 flex w-full flex-col items-stretch px-4 pt-8 pb-0 sm:items-center sm:px-6 sm:pt-12 lg:px-8 lg:pt-16">
        <div className="home-hero__intro relative z-10 flex w-full max-w-7xl flex-col items-center self-center text-center">
          <h2
            id="ms-inbox-title"
            className="home-hero__title mx-auto text-center font-bold tracking-tight text-ink"
          >
            <span className="home-hero__title-line">{t("titleLine1")}</span>
            <span className="home-hero__title-line">{t("titleLine2")}</span>
          </h2>

          <p className="home-hero__desc mx-auto text-center text-muted-foreground">
            {t("description")}
          </p>

          <div className="home-hero__actions">
            <DemoRequestButton source="messenger-inbox" className="btn-primary">
              {t("cta")}
              <ArrowUpRight className="size-4" aria-hidden />
            </DemoRequestButton>
            <Link href="/register" className="btn-secondary">
              {nav("startFree")}
            </Link>
          </div>
        </div>

        <div className="hero-chat-shell relative z-10 mt-6 flex min-h-0 w-full flex-col sm:mt-8">
          <HeroChatWidget copy={chat} />
        </div>
      </div>
    </section>
  );
}
