"use client";

import { MessageSquareText, Sparkles, Star } from "lucide-react";
import { cn } from "@/lib/utils";

export type CommentPreview = {
  platform: "instagram" | "google" | "marketplace";
  author: string;
  text: string;
  rating?: number;
};

type AiCommentsWidgetProps = {
  comments: CommentPreview[];
  aiLabel: string;
  replyLabel: string;
  replyText: string;
  statusLabel: string;
  platformLabels: {
    instagram: string;
    google: string;
    marketplace: string;
  };
};

const platformTone: Record<CommentPreview["platform"], string> = {
  instagram: "ai-comments-widget__chip--ig",
  google: "ai-comments-widget__chip--gmb",
  marketplace: "ai-comments-widget__chip--mp",
};

export function AiCommentsWidget({
  comments,
  aiLabel,
  replyLabel,
  replyText,
  statusLabel,
  platformLabels,
}: AiCommentsWidgetProps) {
  return (
    <div className="ai-comments-widget" aria-hidden="true">
      <div className="ai-comments-widget__glow" />

      <div className="ai-comments-widget__header">
        <span className="ai-comments-widget__badge">
          <Sparkles className="size-3.5" />
          {aiLabel}
        </span>
        <span className="ai-comments-widget__status">
          <span className="ai-comments-widget__pulse" />
          {statusLabel}
        </span>
      </div>

      <div className="ai-comments-widget__feed">
        {comments.map((comment, index) => (
          <article
            key={`${comment.platform}-${comment.author}`}
            className="ai-comments-widget__card"
            style={{ animationDelay: `${index * 0.12}s` }}
          >
            <div className="ai-comments-widget__card-top">
              <span
                className={cn(
                  "ai-comments-widget__chip",
                  platformTone[comment.platform],
                )}
              >
                {platformLabels[comment.platform]}
              </span>
              {typeof comment.rating === "number" ? (
                <span className="ai-comments-widget__rating">
                  <Star className="size-3 fill-current" />
                  {comment.rating.toFixed(1)}
                </span>
              ) : (
                <MessageSquareText className="size-3.5 text-ink-faint" />
              )}
            </div>
            <p className="ai-comments-widget__author">{comment.author}</p>
            <p className="ai-comments-widget__text">{comment.text}</p>
          </article>
        ))}
      </div>

      <div className="ai-comments-widget__reply">
        <div className="ai-comments-widget__reply-head">
          <span className="ai-comments-widget__reply-icon">
            <Sparkles className="size-3.5" />
          </span>
          <span className="ai-comments-widget__reply-label">{replyLabel}</span>
        </div>
        <p className="ai-comments-widget__reply-text">{replyText}</p>
      </div>
    </div>
  );
}
