"use client";

import type { CSSProperties } from "react";
import { Check, Megaphone, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export type CampaignOption = {
  name: string;
  active?: boolean;
};

export type CampaignEvent = {
  name: string;
  detail: string;
  state: "sent" | "delivered" | "read" | "clicked";
};

export type CampaignStat = {
  label: string;
  value: string;
};

type CampaignWidgetProps = {
  campaignTitle: string;
  campaignMeta: string;
  statusLabel: string;
  typesLabel: string;
  types: CampaignOption[];
  channelsLabel: string;
  channels: CampaignOption[];
  audienceLabel: string;
  audienceValue: string;
  templateLabel: string;
  messagePreview: string;
  feedLabel: string;
  events: CampaignEvent[];
  stats: CampaignStat[];
  progressLabel: string;
  progressValue: string;
  progressPercent: number;
  resultLabel: string;
  liveLabel: string;
};

export function CampaignWidget({
  campaignTitle,
  campaignMeta,
  statusLabel,
  typesLabel,
  types,
  channelsLabel,
  channels,
  audienceLabel,
  audienceValue,
  templateLabel,
  messagePreview,
  feedLabel,
  events,
  stats,
  progressLabel,
  progressValue,
  progressPercent,
  resultLabel,
  liveLabel,
}: CampaignWidgetProps) {
  return (
    <div className="campaign-widget" aria-hidden="true">
      <div className="campaign-widget__glow" />

      <div className="campaign-widget__grid">
        <div className="campaign-widget__panel campaign-widget__panel--builder">
          <div className="campaign-widget__panel-head">
            <span className="campaign-widget__icon">
              <Megaphone className="size-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="campaign-widget__title">{campaignTitle}</p>
              <p className="campaign-widget__meta">{campaignMeta}</p>
            </div>
            <span className="campaign-widget__status">{statusLabel}</span>
          </div>

          <p className="campaign-widget__label">{typesLabel}</p>
          <div className="campaign-widget__channels">
            {types.map((type) => (
              <span
                key={type.name}
                className={cn(
                  "campaign-widget__channel",
                  type.active && "campaign-widget__channel--active",
                )}
              >
                {type.name}
              </span>
            ))}
          </div>

          <p className="campaign-widget__label">{channelsLabel}</p>
          <div className="campaign-widget__channels">
            {channels.map((channel) => (
              <span
                key={channel.name}
                className={cn(
                  "campaign-widget__channel",
                  channel.active && "campaign-widget__channel--active",
                )}
              >
                {channel.name}
              </span>
            ))}
          </div>

          <div className="campaign-widget__audience">
            <span>{audienceLabel}</span>
            <strong>{audienceValue}</strong>
          </div>

          <div className="campaign-widget__compose">
            <div className="campaign-widget__compose-head">
              <span className="campaign-widget__chip">{templateLabel}</span>
            </div>
            <div className="campaign-widget__bubble">
              <MessageCircle className="campaign-widget__bubble-icon size-3.5" />
              <p>{messagePreview}</p>
            </div>
          </div>
        </div>

        <div className="campaign-widget__panel campaign-widget__panel--feed">
          <div className="campaign-widget__compose-head">
            <span className="campaign-widget__chip campaign-widget__chip--feed">
              {feedLabel}
            </span>
            <span className="campaign-widget__live">
              <span className="campaign-widget__live-dot" />
              {liveLabel}
            </span>
          </div>

          <div className="campaign-widget__stats">
            {stats.map((stat) => (
              <div key={stat.label} className="campaign-widget__stat">
                <span className="campaign-widget__stat-value">{stat.value}</span>
                <span className="campaign-widget__stat-label">{stat.label}</span>
              </div>
            ))}
          </div>

          <div className="campaign-widget__events">
            {events.map((event, index) => (
              <div
                key={`${event.name}-${event.state}`}
                className={cn(
                  "campaign-widget__event",
                  `campaign-widget__event--${event.state}`,
                )}
                style={{ animationDelay: `${0.08 + index * 0.1}s` }}
              >
                <span className="campaign-widget__event-dot" />
                <div className="min-w-0">
                  <p className="campaign-widget__event-name">{event.name}</p>
                  <p className="campaign-widget__event-detail">{event.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="campaign-widget__progress">
            <div className="campaign-widget__progress-top">
              <span>{progressLabel}</span>
              <strong>{progressValue}</strong>
            </div>
            <div className="campaign-widget__progress-track">
              <span
                className="campaign-widget__progress-bar"
                style={
                  {
                    "--campaign-progress": `${progressPercent}%`,
                  } as CSSProperties
                }
              />
            </div>
          </div>

          <div className="campaign-widget__result">
            <Check className="size-3.5" />
            {resultLabel}
          </div>
        </div>
      </div>
    </div>
  );
}
