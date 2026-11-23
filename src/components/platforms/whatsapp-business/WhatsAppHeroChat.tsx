"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  MicIcon,
  MoreVerticalIcon,
  PhoneIcon,
  SearchIcon,
  SmileIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type WaHeroStep = {
  kind: "customer" | "ai" | "agent" | "typing" | "transfer" | "buttons";
  text?: string;
  buttons?: string[];
};

export type WaSidebarItem = {
  name: string;
  preview: string;
  time: string;
  unread?: number;
};

type WhatsAppHeroChatProps = {
  businessName: string;
  online: string;
  typing: string;
  aiLabel: string;
  agentLabel: string;
  customerName: string;
  browserUrl: string;
  inboxTitle: string;
  searchPlaceholder: string;
  composerPlaceholder: string;
  sidebar: WaSidebarItem[];
  steps: WaHeroStep[];
  /** Defaults to WhatsApp Business icon */
  platformIcon?: string;
};

type Visible =
  | { id: number; kind: "customer" | "ai" | "agent"; text: string }
  | { id: number; kind: "typing" }
  | { id: number; kind: "transfer"; text: string }
  | { id: number; kind: "buttons"; buttons: string[] };

const STEP_MS = 1600;
const LOOP_PAUSE_MS = 2800;

function DoubleTicks() {
  return (
    <span className="wa-chat__ticks" aria-hidden>
      <svg viewBox="0 0 16 11" width="16" height="11" fill="none">
        <path
          d="M11.07 1.14 5.4 7.5 2.93 4.86"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.07 1.14 8.4 7.5 7.2 6.2"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function ThreadMessages({
  visible,
  typing,
  aiLabel,
  agentLabel,
  threadRef,
}: {
  visible: Visible[];
  typing: string;
  aiLabel: string;
  agentLabel: string;
  threadRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div ref={threadRef} className="wa-chat__thread">
      {visible.map((item) => {
        if (item.kind === "typing") {
          return (
            <div key={item.id} className="wa-chat__row wa-chat__row--in">
              <div className="wa-chat__bubble wa-chat__bubble--in wa-chat__typing">
                <span />
                <span />
                <span />
                <span className="sr-only">{typing}</span>
              </div>
            </div>
          );
        }

        if (item.kind === "transfer") {
          return (
            <p key={item.id} className="wa-chat__system">
              {item.text}
            </p>
          );
        }

        if (item.kind === "buttons") {
          return (
            <div key={item.id} className="wa-chat__row wa-chat__row--out">
              <div className="wa-chat__actions">
                {item.buttons.map((label) => (
                  <span key={label} className="wa-chat__action">
                    {label}
                  </span>
                ))}
              </div>
            </div>
          );
        }

        const outgoing = item.kind === "ai" || item.kind === "agent";
        const label =
          item.kind === "ai"
            ? aiLabel
            : item.kind === "agent"
              ? agentLabel
              : null;

        return (
          <div
            key={item.id}
            className={cn(
              "wa-chat__row",
              outgoing ? "wa-chat__row--out" : "wa-chat__row--in",
            )}
          >
            <div
              className={cn(
                "wa-chat__bubble",
                outgoing ? "wa-chat__bubble--out" : "wa-chat__bubble--in",
              )}
            >
              {label ? <span className="wa-chat__role">{label}</span> : null}
              <p>{item.text}</p>
              {outgoing ? <DoubleTicks /> : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function WhatsAppHeroChat({
  businessName,
  online,
  typing,
  aiLabel,
  agentLabel,
  customerName,
  browserUrl,
  inboxTitle,
  searchPlaceholder,
  composerPlaceholder,
  sidebar,
  steps,
  platformIcon = "/icons/platforms/whatsapp-business.png",
}: WhatsAppHeroChatProps) {
  const [visible, setVisible] = useState<Visible[]>([]);
  const mobileThreadRef = useRef<HTMLDivElement>(null);
  const desktopThreadRef = useRef<HTMLDivElement>(null);
  const msgId = useRef(0);
  const runGen = useRef(0);

  useEffect(() => {
    for (const el of [mobileThreadRef.current, desktopThreadRef.current]) {
      if (!el) continue;
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    }
  }, [visible]);

  useEffect(() => {
    const gen = ++runGen.current;
    let timer: ReturnType<typeof setTimeout>;
    setVisible([]);

    const alive = () => gen === runGen.current;

    const run = (index: number) => {
      if (!alive()) return;

      if (index >= steps.length) {
        timer = setTimeout(() => {
          if (!alive()) return;
          setVisible([]);
          run(0);
        }, LOOP_PAUSE_MS);
        return;
      }

      const item = steps[index];
      const id = ++msgId.current;

      if (item.kind === "typing") {
        setVisible((prev) => [...prev, { id, kind: "typing" }]);
      } else if (item.kind === "buttons") {
        setVisible((prev) => [
          ...prev.filter((v) => v.kind !== "typing"),
          { id, kind: "buttons", buttons: item.buttons ?? [] },
        ]);
      } else if (item.kind === "transfer") {
        setVisible((prev) => [
          ...prev.filter((v) => v.kind !== "typing"),
          { id, kind: "transfer", text: item.text ?? "" },
        ]);
      } else if (item.kind === "customer") {
        const next: Visible = {
          id,
          kind: "customer",
          text: item.text ?? "",
        };
        setVisible((prev) => [
          ...prev.filter((v) => v.kind !== "typing"),
          next,
        ]);
      } else if (item.kind === "ai") {
        const next: Visible = { id, kind: "ai", text: item.text ?? "" };
        setVisible((prev) => [
          ...prev.filter((v) => v.kind !== "typing"),
          next,
        ]);
      } else if (item.kind === "agent") {
        const next: Visible = { id, kind: "agent", text: item.text ?? "" };
        setVisible((prev) => [
          ...prev.filter((v) => v.kind !== "typing"),
          next,
        ]);
      }

      timer = setTimeout(() => run(index + 1), STEP_MS);
    };

    run(0);
    return () => {
      clearTimeout(timer);
      runGen.current += 1;
    };
  }, [steps]);

  const threadProps = { visible, typing, aiLabel, agentLabel };

  return (
    <div className="wa-hero-chat hero-chat" aria-hidden>
      {/* Mobile: phone WhatsApp — same pattern as home hero-chat__phone */}
      <div className="wa-hero-chat__mobile hero-chat__phone lg:hidden">
        <div className="wa-chat__notch hero-chat__phone-notch" />
        <header className="wa-chat__topbar">
          <Image
            src={platformIcon}
            alt=""
            width={28}
            height={28}
            className="h-7 w-7 rounded-full object-contain"
            unoptimized
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-white">
              {customerName}
            </p>
            <p className="text-[11px] text-white/75">{online}</p>
          </div>
          <PhoneIcon className="h-4 w-4 text-white/85" />
          <MoreVerticalIcon className="h-4 w-4 text-white/85" />
        </header>

        <ThreadMessages {...threadProps} threadRef={mobileThreadRef} />

        <div className="wa-chat__composer">
          <SmileIcon className="h-5 w-5 opacity-70" />
          <span className="wa-chat__composer-field">{composerPlaceholder}</span>
          <MicIcon className="h-5 w-5 opacity-70" />
        </div>
      </div>

      {/* Desktop: browser chrome like home hero-chat__browser */}
      <div className="wa-hero-chat__desktop hero-chat__browser hidden w-full lg:flex">
        <div className="hero-chat__chrome">
          <span className="hero-chat__dot hero-chat__dot--r" />
          <span className="hero-chat__dot hero-chat__dot--y" />
          <span className="hero-chat__dot hero-chat__dot--g" />
          <div className="hero-chat__url">{browserUrl}</div>
        </div>

        <div className="wa-browser-desk hero-chat__desk">
          <aside className="wa-browser-side">
            <div className="wa-browser-side__head">
              <Image
                src={platformIcon}
                alt=""
                width={28}
                height={28}
                className="h-7 w-7 rounded-full object-contain"
                unoptimized
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-ink">
                  {businessName}
                </p>
                <p className="truncate text-[11px] font-semibold uppercase tracking-wide text-ink-faint">
                  {inboxTitle}
                </p>
              </div>
            </div>

            <div className="wa-browser-side__search">
              <SearchIcon className="h-3.5 w-3.5 text-ink-faint" />
              <span>{searchPlaceholder}</span>
            </div>

            <ul className="wa-browser-side__list">
              {sidebar.map((item, index) => (
                <li
                  key={item.name}
                  className={cn(
                    "wa-browser-side__item",
                    index === 0 && "is-active",
                  )}
                >
                  <span className="wa-browser-side__avatar">
                    {item.name.slice(0, 1)}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center justify-between gap-2">
                      <span className="truncate text-[13px] font-semibold text-ink">
                        {item.name}
                      </span>
                      <span className="shrink-0 text-[11px] text-ink-faint">
                        {item.time}
                      </span>
                    </span>
                    <span className="mt-0.5 flex items-center justify-between gap-2">
                      <span className="truncate text-[12px] text-ink-subtle">
                        {item.preview}
                      </span>
                      {item.unread ? (
                        <span className="wa-desk__unread">{item.unread}</span>
                      ) : null}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </aside>

          <section className="wa-browser-main">
            <header className="wa-browser-main__bar">
              <span className="wa-browser-side__avatar wa-browser-side__avatar--lg">
                {customerName.slice(0, 1)}
              </span>
              <div className="min-w-0 flex-1 text-left">
                <p className="truncate text-sm font-semibold text-ink">
                  {customerName}
                </p>
                <p className="truncate text-xs text-ink-subtle">{online}</p>
              </div>
              <SearchIcon className="h-4 w-4 text-ink-faint" />
              <MoreVerticalIcon className="h-4 w-4 text-ink-faint" />
            </header>

            <ThreadMessages {...threadProps} threadRef={desktopThreadRef} />

            <div className="wa-browser-main__composer">
              <SmileIcon className="h-5 w-5 text-ink-faint" />
              <span className="wa-browser-main__composer-field">
                {composerPlaceholder}
              </span>
              <MicIcon className="h-5 w-5 text-ink-faint" />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
