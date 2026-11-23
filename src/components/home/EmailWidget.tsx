"use client";

import { Check, FolderOpen, Mail, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export type EmailFolder = {
  name: string;
  count: string;
  active?: boolean;
};

export type InboxMail = {
  from: string;
  subject: string;
  preview: string;
  folder: string;
  action: "sorted" | "reply";
};

type EmailWidgetProps = {
  inboxLabel: string;
  foldersLabel: string;
  folders: EmailFolder[];
  mails: InboxMail[];
  sortedLabel: string;
  replyPanelTitle: string;
  fromLabel: string;
  subjectLabel: string;
  replyFrom: string;
  replySubject: string;
  replyDraft: string;
  replyStatus: string;
  aiLabel: string;
};

export function EmailWidget({
  inboxLabel,
  foldersLabel,
  folders,
  mails,
  sortedLabel,
  replyPanelTitle,
  fromLabel,
  subjectLabel,
  replyFrom,
  replySubject,
  replyDraft,
  replyStatus,
  aiLabel,
}: EmailWidgetProps) {
  return (
    <div className="email-widget" aria-hidden="true">
      <div className="email-widget__glow" />

      <div className="email-widget__grid">
        <div className="email-widget__panel email-widget__panel--inbox">
          <div className="email-widget__panel-head">
            <span className="email-widget__icon">
              <Mail className="size-4" />
            </span>
            <div className="min-w-0">
              <p className="email-widget__title">{inboxLabel}</p>
              <p className="email-widget__meta">{foldersLabel}</p>
            </div>
          </div>

          <div className="email-widget__folders">
            {folders.map((folder) => (
              <span
                key={folder.name}
                className={cn(
                  "email-widget__folder",
                  folder.active && "email-widget__folder--active",
                )}
              >
                <FolderOpen className="size-3" />
                {folder.name}
                <em>{folder.count}</em>
              </span>
            ))}
          </div>

          <div className="email-widget__mails">
            {mails.map((mail) => (
              <div key={mail.subject} className="email-widget__mail">
                <div className="email-widget__mail-top">
                  <span className="email-widget__mail-from">{mail.from}</span>
                  <span
                    className={cn(
                      "email-widget__mail-tag",
                      mail.action === "sorted"
                        ? "email-widget__mail-tag--sorted"
                        : "email-widget__mail-tag--reply",
                    )}
                  >
                    {mail.action === "sorted" ? sortedLabel : aiLabel}
                  </span>
                </div>
                <p className="email-widget__mail-subject">{mail.subject}</p>
                <p className="email-widget__mail-preview">{mail.preview}</p>
                <p className="email-widget__mail-folder">→ {mail.folder}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="email-widget__panel email-widget__panel--reply">
          <div className="email-widget__chat-head">
            <span className="email-widget__chip">{replyPanelTitle}</span>
            <span className="email-widget__ai">
              <Sparkles className="size-3.5" />
              {aiLabel}
            </span>
          </div>

          <div className="email-widget__reply-meta">
            <p>
              <strong>{fromLabel}</strong> {replyFrom}
            </p>
            <p>
              <strong>{subjectLabel}</strong> {replySubject}
            </p>
          </div>

          <div className="email-widget__draft">{replyDraft}</div>

          <div className="email-widget__sent">
            <Check className="size-3.5" />
            {replyStatus}
          </div>
        </div>
      </div>
    </div>
  );
}
