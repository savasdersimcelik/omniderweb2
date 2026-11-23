"use client";

import { Bot, Check, Sparkles, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";

export type FlowStep = {
  label: string;
  active?: boolean;
};

type AiAssistantWidgetProps = {
  channelLabel: string;
  aiLabel: string;
  knowledgeLabel: string;
  knowledgeItems: string[];
  customerMessage: string;
  aiReply: string;
  handoffLabel: string;
  agentLabel: string;
  flowLabel: string;
  flowSteps: FlowStep[];
  statusLabel: string;
};

export function AiAssistantWidget({
  channelLabel,
  aiLabel,
  knowledgeLabel,
  knowledgeItems,
  customerMessage,
  aiReply,
  handoffLabel,
  agentLabel,
  flowLabel,
  flowSteps,
  statusLabel,
}: AiAssistantWidgetProps) {
  return (
    <div className="ai-assistant-widget" aria-hidden="true">
      <div className="ai-assistant-widget__glow" />

      <div className="ai-assistant-widget__grid">
        <div className="ai-assistant-widget__panel ai-assistant-widget__panel--chat">
          <div className="ai-assistant-widget__panel-head">
            <span className="ai-assistant-widget__chip">{channelLabel}</span>
            <span className="ai-assistant-widget__ai">
              <Sparkles className="size-3.5" />
              {aiLabel}
            </span>
          </div>

          <div className="ai-assistant-widget__bubble ai-assistant-widget__bubble--customer">
            {customerMessage}
          </div>

          <div className="ai-assistant-widget__knowledge">
            <p className="ai-assistant-widget__knowledge-label">
              {knowledgeLabel}
            </p>
            <div className="ai-assistant-widget__knowledge-tags">
              {knowledgeItems.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>

          <div className="ai-assistant-widget__bubble ai-assistant-widget__bubble--ai">
            <Bot className="size-3.5 shrink-0 opacity-90" />
            <p>{aiReply}</p>
          </div>

          <div className="ai-assistant-widget__handoff">
            <UserRound className="size-3.5" />
            <span>{handoffLabel}</span>
            <strong>{agentLabel}</strong>
          </div>
        </div>

        <div className="ai-assistant-widget__panel ai-assistant-widget__panel--flow">
          <div className="ai-assistant-widget__panel-head">
            <span className="ai-assistant-widget__icon">
              <Bot className="size-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="ai-assistant-widget__title">{flowLabel}</p>
              <p className="ai-assistant-widget__meta">{statusLabel}</p>
            </div>
          </div>

          <div className="ai-assistant-widget__steps">
            {flowSteps.map((step, index) => (
              <div
                key={step.label}
                className={cn(
                  "ai-assistant-widget__step",
                  step.active && "ai-assistant-widget__step--active",
                )}
                style={{ animationDelay: `${0.08 + index * 0.1}s` }}
              >
                <span className="ai-assistant-widget__step-index">
                  {index + 1}
                </span>
                <span className="ai-assistant-widget__step-label">
                  {step.label}
                </span>
                {step.active ? (
                  <Check className="size-3.5 text-emerald-600" />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
