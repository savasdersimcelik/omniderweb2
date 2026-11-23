"use client";

import { PhoneIncoming, PhoneOutgoing, Sparkles } from "lucide-react";

type CallCard = {
  code: string;
  label: string;
  kind: "inbound" | "outbound";
};

type AiCallsWidgetProps = {
  inbound: CallCard[];
  outbound: CallCard[];
  engineTitle: string;
  engineStatus: string;
  inboundLabel: string;
  outboundLabel: string;
  liveLabel: string;
};

export function AiCallsWidget({
  inbound,
  outbound,
  engineTitle,
  engineStatus,
  inboundLabel,
  outboundLabel,
  liveLabel,
}: AiCallsWidgetProps) {
  return (
    <div className="ai-calls-widget" aria-hidden="true">
      <div className="ai-calls-widget__grid" />

      <div className="ai-calls-widget__stage">
        <svg
          className="ai-calls-widget__routes"
          viewBox="0 0 640 360"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="ai-call-line" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4f46e5" stopOpacity="0" />
              <stop offset="35%" stopColor="#6366f1" stopOpacity="0.85" />
              <stop offset="65%" stopColor="#6366f1" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#4f46e5" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[72, 132, 192, 252].map((y, i) => (
            <path
              key={`in-${y}`}
              className="ai-calls-widget__path"
              d={`M 150 ${y} C 230 ${y}, 250 180, 320 180`}
              style={{ animationDelay: `${i * 0.35}s` }}
            />
          ))}
          {[108, 180, 252].map((y, i) => (
            <path
              key={`out-${y}`}
              className="ai-calls-widget__path ai-calls-widget__path--out"
              d={`M 320 180 C 400 180, 420 ${y}, 490 ${y}`}
              style={{ animationDelay: `${0.5 + i * 0.4}s` }}
            />
          ))}
        </svg>

        <div className="ai-calls-widget__col ai-calls-widget__col--in">
          <span className="ai-calls-widget__lane">{inboundLabel}</span>
          {inbound.map((call, index) => (
            <div
              key={call.code}
              className="ai-calls-widget__card"
              style={{ animationDelay: `${index * 0.12}s` }}
            >
              <span className="ai-calls-widget__icon ai-calls-widget__icon--in">
                <PhoneIncoming className="size-3.5" />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[13px] font-semibold text-ink">
                  {call.code}
                </span>
                <span className="block truncate text-[11px] text-ink-subtle">
                  {call.label}
                </span>
              </span>
            </div>
          ))}
        </div>

        <div className="ai-calls-widget__engine">
          <div className="ai-calls-widget__orb">
            <span className="ai-calls-widget__orb-ring" />
            <span className="ai-calls-widget__orb-ring ai-calls-widget__orb-ring--delay" />
            <span className="ai-calls-widget__orb-core">
              <Sparkles className="size-6 text-white" />
            </span>
          </div>
          <div className="ai-calls-widget__engine-copy">
            <p className="text-[11px] font-bold tracking-[0.16em] text-brand-700 uppercase">
              {engineTitle}
            </p>
            <div className="mt-2 flex items-center justify-center gap-2">
              <span className="ai-calls-widget__live-dot" />
              <p className="text-xs font-medium text-ink-muted">{engineStatus}</p>
            </div>
            <div className="ai-calls-widget__bars" aria-hidden>
              {Array.from({ length: 12 }).map((_, i) => (
                <span
                  key={i}
                  style={{ animationDelay: `${i * 0.08}s` }}
                />
              ))}
            </div>
            <p className="mt-3 text-[10px] font-semibold tracking-[0.14em] text-ink-faint uppercase">
              {liveLabel}
            </p>
          </div>
        </div>

        <div className="ai-calls-widget__col ai-calls-widget__col--out">
          <span className="ai-calls-widget__lane">{outboundLabel}</span>
          {outbound.map((call, index) => (
            <div
              key={call.code}
              className="ai-calls-widget__card"
              style={{ animationDelay: `${0.2 + index * 0.12}s` }}
            >
              <span className="ai-calls-widget__icon ai-calls-widget__icon--out">
                <PhoneOutgoing className="size-3.5" />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[13px] font-semibold text-ink">
                  {call.code}
                </span>
                <span className="block truncate text-[11px] text-ink-subtle">
                  {call.label}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
