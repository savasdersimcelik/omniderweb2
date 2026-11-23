"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  HeartIcon,
  ImageIcon,
  MicIcon,
  PhoneIcon,
  SmileIcon,
  VideoIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type IgHeroStep = {
  kind: "customer" | "ai" | "agent" | "typing" | "transfer";
  text?: string;
};

type Props = {
  online: string;
  typing: string;
  aiLabel: string;
  agentLabel: string;
  customerName: string;
  composerPlaceholder: string;
  steps: IgHeroStep[];
};

type Visible =
  | { id: number; kind: "customer" | "ai" | "agent"; text: string }
  | { id: number; kind: "typing" }
  | { id: number; kind: "transfer"; text: string };

const STEP_MS = 1600;
const LOOP_PAUSE_MS = 2800;

export function InstagramHeroChat({
  online,
  typing,
  aiLabel,
  agentLabel,
  customerName,
  composerPlaceholder,
  steps,
}: Props) {
  const [visible, setVisible] = useState<Visible[]>([]);
  const threadRef = useRef<HTMLDivElement>(null);
  const msgId = useRef(0);
  const runGen = useRef(0);

  useEffect(() => {
    const el = threadRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
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
      } else if (item.kind === "transfer") {
        setVisible((prev) => [
          ...prev.filter((v) => v.kind !== "typing"),
          { id, kind: "transfer", text: item.text ?? "" },
        ]);
      } else {
        setVisible((prev) => [
          ...prev.filter((v) => v.kind !== "typing"),
          { id, kind: item.kind, text: item.text ?? "" },
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

  return (
    <div className="ig-hero-chat" aria-hidden>
      <div className="ig-hero-chat__phone hero-chat__phone">
        <div className="ig-chat__notch hero-chat__phone-notch" />
        <header className="ig-chat__topbar">
          <Image
            src="/icons/platforms/instagram.png"
            alt=""
            width={28}
            height={28}
            className="h-7 w-7 rounded-full object-contain"
            unoptimized
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-ink">
              {customerName}
            </p>
            <p className="text-[11px] text-ink-subtle">{online}</p>
          </div>
          <PhoneIcon className="h-4 w-4 text-ink-subtle" />
          <VideoIcon className="h-4 w-4 text-ink-subtle" />
        </header>

        <div ref={threadRef} className="ig-chat__thread">
          {visible.map((item) => {
            if (item.kind === "typing") {
              return (
                <div key={item.id} className="ig-chat__row ig-chat__row--in">
                  <div className="ig-chat__bubble ig-chat__bubble--in ig-chat__typing">
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
                <p key={item.id} className="ig-chat__system">
                  {item.text}
                </p>
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
                  "ig-chat__row",
                  outgoing ? "ig-chat__row--out" : "ig-chat__row--in",
                )}
              >
                <div
                  className={cn(
                    "ig-chat__bubble",
                    outgoing ? "ig-chat__bubble--out" : "ig-chat__bubble--in",
                  )}
                >
                  {label ? <span className="ig-chat__role">{label}</span> : null}
                  <p>{item.text}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="ig-chat__composer">
          <SmileIcon className="h-5 w-5 opacity-60" />
          <span className="ig-chat__composer-field">{composerPlaceholder}</span>
          <ImageIcon className="h-5 w-5 opacity-60" />
          <HeartIcon className="h-5 w-5 opacity-60" />
          <MicIcon className="h-5 w-5 opacity-60" />
        </div>
      </div>
    </div>
  );
}
