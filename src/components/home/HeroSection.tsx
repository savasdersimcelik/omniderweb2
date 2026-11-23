import { getTranslations } from "next-intl/server";
import {
  HeroChatWidget,
  type HeroChatCopy,
} from "@/components/home/HeroChatWidget";
import { HeroTrust } from "@/components/trust";
import { OrbitingCircles } from "@/components/ui/orbiting-circles";

export async function HeroSection() {
  const t = await getTranslations("HomePage");

  const chat: HeroChatCopy = {
    browserUrl: t("heroChat.browserUrl"),
    inboxTitle: t("heroChat.inboxTitle"),
    aiLabel: t("heroChat.aiLabel"),
    agentLabel: t("heroChat.agentLabel"),
    customerName: t("heroChat.customerName"),
    deptName: t("heroChat.deptName"),
    transferLabel: t("heroChat.transferLabel"),
    typingLabel: t("heroChat.typingLabel"),
    inStockLabel: t("heroChat.inStockLabel"),
    outOfStockLabel: t("heroChat.outOfStockLabel"),
    viewProductLabel: t("heroChat.viewProductLabel"),
    carouselHint: t.raw("heroChat.carouselHint") as string,
    products: t.raw("heroChat.products") as HeroChatCopy["products"],
    sidebar: t.raw("heroChat.sidebar") as HeroChatCopy["sidebar"],
    steps: t.raw("heroChat.steps") as HeroChatCopy["steps"],
  };

  return (
    <section
      className="viewport-hero relative w-full overflow-hidden border-b border-line bg-background"
      aria-labelledby="home-hero-title"
    >
      <div
        className="absolute top-0 left-1/2 -z-10 flex size-40 -translate-x-1/2 rounded-full bg-brand-500 blur-[10rem] lg:hidden"
        aria-hidden
      />

      <div className="home-hero relative flex h-full min-h-0 w-full flex-1 flex-col items-stretch px-4 pt-0 pb-0 sm:items-center sm:px-6 sm:pt-8 lg:px-8 lg:pt-14">
        <div
          className="pointer-events-none absolute inset-0 -z-10 hidden overflow-visible sm:block"
          aria-hidden
        >
          <OrbitingCircles
            speed={0.5}
            radius={300}
            stroke="stroke-brand-200/60"
          />
          <OrbitingCircles
            speed={0.25}
            radius={400}
            stroke="stroke-brand-200/45"
          />
          <OrbitingCircles
            speed={0.1}
            radius={500}
            stroke="stroke-brand-200/30"
          />
        </div>

        <div className="home-hero__intro relative z-10 flex w-full max-w-7xl flex-col items-center self-center text-center sm:shrink-0">
          <h1
            id="home-hero-title"
            className="home-hero__title mx-auto text-center font-bold tracking-tight text-ink"
          >
            <span className="home-hero__title-line">{t("titleLine1")}</span>
            <span className="home-hero__title-line">{t("titleLine2")}</span>
          </h1>

          <p className="home-hero__desc mx-auto text-center text-muted-foreground">
            {t("description")}
          </p>

          <HeroTrust className="home-hero__trust" />
        </div>

        <div className="hero-chat-shell relative z-10 mt-0 flex min-h-0 w-full flex-col sm:mt-8 sm:flex-1 lg:mt-14">
          <div
            className="absolute top-1/8 left-1/2 -z-10 h-1/4 w-1/2 -translate-x-1/2 -translate-y-1/2 bg-linear-to-r from-sky-500 to-brand-600 blur-[4rem] animate-image-glow lg:w-3/4 lg:blur-[10rem]"
            aria-hidden
          />
          <div
            className="absolute -top-1/8 left-1/2 -z-20 hidden h-1/4 w-1/4 -translate-x-1/2 -translate-y-1/2 bg-brand-600 blur-[10rem] animate-image-glow lg:block"
            aria-hidden
          />
          <HeroChatWidget copy={chat} />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-16 bg-linear-to-t from-background to-transparent sm:block"
            aria-hidden
          />
        </div>
      </div>
    </section>
  );
}
