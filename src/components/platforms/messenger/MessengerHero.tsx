import type { CSSProperties } from "react";
import Image from "next/image";
import { Bot, Check, Sparkles } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { HeroTrust } from "@/components/trust";
import { cn } from "@/lib/utils";

type ChatCard = {
  title: string;
  detail: string;
};

type HeroDetails = {
  aiValue: string;
  aiLabel: string;
  chats: ChatCard[];
  inboxTitle: string;
  inboxDetail: string;
  tags: string[];
  assistTitle: string;
  assistDetail: string;
};

const lift =
  "motion-safe:transition motion-safe:duration-200 motion-safe:ease-out motion-safe:hover:-translate-y-1";

function MessengerMark() {
  return (
    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#0072e6] text-white shadow-[0_8px_16px_-10px_rgba(0,84,180,0.9)]">
      <svg viewBox="0 0 24 24" className="size-[1.15rem]" aria-hidden>
        <path
          fill="currentColor"
          d="M12 2C6.36 2 2 6.13 2 11.7c0 2.91 1.19 5.44 3.14 7.17.16.14.26.34.27.55l.05 1.72a.75.75 0 0 0 1.05.66l1.92-.85a.9.9 0 0 1 .6-.04c.94.26 1.94.4 2.97.4 5.64 0 10-4.13 10-9.7C22 6.13 17.64 2 12 2Zm5.92 7.55-2.94 4.66a1.12 1.12 0 0 1-1.62.3l-2.34-1.76a.45.45 0 0 0-.54 0l-3.16 2.4c-.31.24-.72-.14-.5-.46l2.94-4.66a1.12 1.12 0 0 1 1.62-.3l2.34 1.76a.45.45 0 0 0 .54 0l3.16-2.4c.31-.24.72.14.5.46Z"
        />
      </svg>
    </span>
  );
}

function AiBadge({
  icon,
  value,
  label,
  dense = false,
  className,
}: {
  icon: "bot" | "spark";
  value: string;
  label: string;
  dense?: boolean;
  className?: string;
}) {
  const Icon = icon === "bot" ? Bot : Sparkles;

  return (
    <p
      className={cn(
        "flex items-center bg-[#0072e6] text-white shadow-[0_18px_34px_-16px_rgba(0,84,180,0.85)]",
        dense
          ? "gap-2 rounded-xl px-2.5 py-2"
          : "gap-2.5 rounded-2xl px-3 py-2.5",
        lift,
        className,
      )}
    >
      <span
        className={cn(
          "grid shrink-0 place-items-center rounded-lg bg-white/20",
          dense ? "size-8" : "size-10 rounded-xl",
        )}
      >
        <Icon className={dense ? "size-4" : "size-5"} aria-hidden />
      </span>
      <span className="min-w-0">
        <strong
          className={cn(
            "block font-bold leading-none tracking-tight",
            dense ? "text-sm" : "text-lg",
          )}
        >
          {value}
        </strong>
        <span
          className={cn(
            "block font-medium leading-snug text-white",
            dense ? "mt-0.5 text-[10px]" : "mt-1 text-xs",
          )}
        >
          {label}
        </span>
      </span>
    </p>
  );
}

function ChatCards({
  chats,
  dense = false,
  className,
}: {
  chats: ChatCard[];
  dense?: boolean;
  className?: string;
}) {
  return (
    <ul className={cn("flex flex-col", dense ? "gap-1.5" : "gap-2.5", className)}>
      {chats.map((chat) => (
        <li
          key={chat.title}
          className={cn(
            "flex items-center justify-between border border-slate-200/80 bg-white shadow-[0_18px_40px_-22px_rgba(15,23,42,0.45)]",
            dense
              ? "gap-2 rounded-xl px-2.5 py-1.5"
              : "gap-3 rounded-2xl px-3.5 py-2.5",
            lift,
          )}
        >
          <span className="min-w-0">
            <span
              className={cn(
                "block font-semibold leading-tight text-slate-950",
                dense ? "text-xs" : "text-sm",
              )}
            >
              {chat.title}
            </span>
            <span
              className={cn(
                "block leading-tight text-slate-600",
                dense ? "text-[10px]" : "mt-0.5 text-xs",
              )}
            >
              {chat.detail}
            </span>
          </span>
          <span
            className={cn(
              "grid shrink-0 place-items-center rounded-full bg-[#059669] text-white",
              dense ? "size-5" : "size-7",
            )}
          >
            <Check className={dense ? "size-3" : "size-3.5"} strokeWidth={3} aria-hidden />
          </span>
        </li>
      ))}
    </ul>
  );
}

function InboxCard({
  title,
  detail,
  tags,
  dense = false,
  className,
}: {
  title: string;
  detail: string;
  tags: string[];
  dense?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "border border-slate-200/80 bg-white shadow-[0_18px_40px_-22px_rgba(15,23,42,0.45)]",
        dense ? "rounded-xl px-3 py-2" : "rounded-2xl px-4 py-3",
        lift,
        className,
      )}
    >
      <p
        className={cn(
          "font-semibold leading-tight text-slate-950",
          dense ? "text-xs" : "text-sm",
        )}
      >
        {title}
      </p>
      <p
        className={cn(
          "leading-snug text-slate-600",
          dense ? "text-[10px]" : "mt-0.5 text-xs",
        )}
      >
        {detail}
      </p>
      <div className={cn("flex flex-wrap", dense ? "mt-1.5 gap-1" : "mt-2.5 gap-1.5")}>
        {tags.map((tag) => (
          <span
            key={tag}
            className={cn(
              "rounded-full bg-slate-100 font-semibold text-slate-700",
              dense ? "px-1.5 py-px text-[10px]" : "px-2 py-0.5 text-[11px]",
            )}
          >
            +{tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function HeroBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute -top-40 right-[-8%] size-144 rounded-full bg-[#b9dcff]/55 blur-3xl" />
      <div className="absolute top-[18%] right-[12%] size-80 rounded-full bg-[#e7f3ff] blur-2xl" />
      <div className="absolute -bottom-48 -left-32 size-128 rounded-full bg-[#d4e9ff]/70 blur-3xl" />
      <div className="absolute top-[14%] left-[46%] size-36 rounded-full border border-[#0072e6]/15" />
      <div className="absolute right-[8%] bottom-[16%] size-24 rounded-full border border-[#0072e6]/10" />
      <div className="absolute top-[38%] left-[8%] size-16 rounded-full border border-[#0072e6]/10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle,#c5daf2_1px,transparent_1.15px)] bg-size-[26px_26px] opacity-70 mask-[linear-gradient(90deg,transparent_0%,transparent_42%,#000_68%,transparent_100%)]" />
    </div>
  );
}

const photoMaskMobile: CSSProperties = {
  WebkitMaskImage:
    "linear-gradient(90deg, transparent 0%, #000 6%, #000 100%), linear-gradient(transparent 0%, #000 8%, #000 92%, transparent 100%)",
  maskImage:
    "linear-gradient(90deg, transparent 0%, #000 6%, #000 100%), linear-gradient(transparent 0%, #000 8%, #000 92%, transparent 100%)",
  WebkitMaskComposite: "source-in",
  maskComposite: "intersect",
};

const photoMask: CSSProperties = {
  WebkitMaskImage:
    "linear-gradient(90deg, transparent 0%, #000 22%, #000 100%), linear-gradient(transparent 0%, #000 4%, #000 97%, transparent 100%)",
  maskImage:
    "linear-gradient(90deg, transparent 0%, #000 22%, #000 100%), linear-gradient(transparent 0%, #000 4%, #000 97%, transparent 100%)",
  WebkitMaskComposite: "source-in",
  maskComposite: "intersect",
};

export async function MessengerHero() {
  const t = await getTranslations("PlatformMessenger");
  const details = t.raw("hero.details") as HeroDetails;

  return (
    <section
      className="relative isolate flex h-[calc(100svh-var(--header-height)-1px)] max-h-[calc(100svh-var(--header-height)-1px)] min-h-0 w-full overflow-hidden bg-[linear-gradient(180deg,#f7fbff_0%,#ffffff_42%,#f4f8ff_100%)]"
      aria-labelledby="ms-biz-hero-title"
    >
      <HeroBackdrop />

      <div className="pointer-events-none absolute inset-y-0 right-0 z-0 hidden w-[40%] lg:block">
        <div
          className="absolute -inset-x-10 inset-y-6 rounded-[40%] bg-[#d7ebff]/80 blur-2xl"
          aria-hidden
        />
        <Image
          src="/images/platforms/messenger/hero-woman.jpg"
          alt=""
          fill
          priority
          sizes="40vw"
          className="object-cover object-[58%_center]"
          style={photoMask}
        />
        <AiBadge
          icon="bot"
          value={details.aiValue}
          label={details.aiLabel}
          className="pointer-events-auto absolute top-[8%] right-[4%] max-w-55"
        />
        <ChatCards
          chats={details.chats}
          className="pointer-events-auto absolute top-[27%] left-[12%] w-[min(15rem,36%)] xl:left-[6%] xl:w-[min(16rem,38%)]"
        />
        <InboxCard
          title={details.inboxTitle}
          detail={details.inboxDetail}
          tags={details.tags}
          className="pointer-events-auto absolute bottom-[12%] left-[4%] w-[min(15rem,44%)] xl:bottom-[11%] xl:left-[6%] xl:w-[min(16rem,42%)]"
        />
        <AiBadge
          icon="spark"
          value={details.assistTitle}
          label={details.assistDetail}
          className="pointer-events-auto absolute right-[3%] bottom-[5%] max-w-52"
        />
      </div>

      <div className="relative z-10 mx-auto flex h-full min-h-0 w-full max-w-360 flex-col px-4 py-4 sm:px-6 lg:pointer-events-none lg:grid lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-center lg:px-10 lg:py-0 xl:px-14">
        <div className="flex min-h-0 min-w-0 flex-1 flex-col items-center justify-center text-center lg:pointer-events-auto lg:flex-none lg:items-start lg:py-6 lg:text-left">
          <p className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-slate-950 lg:mb-5 lg:gap-2.5 lg:text-[15px]">
            <MessengerMark />
            {t("hero.badge")}
          </p>
          <h1
            id="ms-biz-hero-title"
            className="line-clamp-2 max-w-[16em] font-sans text-[clamp(1.7rem,7vw,2.15rem)] font-bold leading-[1.08] tracking-[-0.04em] text-slate-950 lg:max-w-[14em] lg:text-5xl lg:leading-[1.05] xl:text-6xl"
          >
            {t.rich("hero.title", {
              line: (chunks) => <span className="block">{chunks}</span>,
              accent: (chunks) => <span className="text-[#0072e6]">{chunks}</span>,
            })}
          </h1>
          <p className="mt-4 line-clamp-2 max-w-md text-pretty text-base leading-snug text-slate-600 lg:mt-7 lg:max-w-xl lg:text-lg lg:leading-relaxed xl:max-w-2xl xl:text-xl">
            {t("hero.description")}
          </p>
          <HeroTrust className="home-hero__trust mt-5 max-w-none flex-row flex-nowrap items-center justify-center lg:mt-8 lg:origin-left lg:scale-105 lg:justify-start" />
        </div>

        <div className="relative mt-2 h-[42%] shrink-0 lg:mt-0 lg:h-full">
          <div className="absolute inset-0 lg:hidden">
            <Image
              src="/images/platforms/messenger/hero-woman.jpg"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-[40%_center]"
              style={photoMaskMobile}
            />
            <div className="absolute inset-0 flex flex-col justify-between gap-2 p-3">
              <div className="flex justify-end">
                <AiBadge
                  dense
                  icon="bot"
                  value={details.aiValue}
                  label={details.aiLabel}
                  className="max-w-44"
                />
              </div>
              <ChatCards
                dense
                chats={details.chats}
                className="w-[min(13.25rem,62%)]"
              />
              <div className="flex items-end justify-between gap-2">
                <InboxCard
                  dense
                  title={details.inboxTitle}
                  detail={details.inboxDetail}
                  tags={details.tags}
                  className="min-w-0 w-[min(13.5rem,58%)]"
                />
                <AiBadge
                  dense
                  icon="spark"
                  value={details.assistTitle}
                  label={details.assistDetail}
                  className="max-w-36 shrink-0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
