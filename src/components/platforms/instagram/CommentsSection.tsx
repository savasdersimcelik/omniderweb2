"use client";

import {
  EyeOffIcon,
  MessageCircleIcon,
  ShieldIcon,
  SparklesIcon,
  Trash2Icon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/Container";

type ModRow = {
  user: string;
  text: string;
  action: string;
};

export function CommentsSection() {
  const t = useTranslations("PlatformInstagram.comments");
  const tm = useTranslations("PlatformInstagram.moderation");
  const rows = tm.raw("widget.rows") as ModRow[];
  const scene = t.raw("widget.scenes.price") as {
    user: string;
    comment: string;
    reply: string;
    badge: string;
  };

  return (
    <section
      id="comments"
      className="ig-cm border-t border-line"
      aria-labelledby="ig-cm-title"
    >
      <Container className="section">
        <header className="mx-auto max-w-3xl text-center">
          <p className="eyebrow inline-flex items-center justify-center gap-2 text-[var(--ig-purple)]">
            <MessageCircleIcon className="h-3.5 w-3.5" />
            {t("eyebrow")}
          </p>
          <h2 id="ig-cm-title" className="heading-section mt-3">
            {t("title")}
          </h2>
          <p className="ig-cm__subtitle text-body mt-4">{t("subtitle")}</p>
        </header>

        <div className="ig-cm__bento">
          <article className="ig-cm__tile is-reply">
            <div className="ig-cm__tile-copy">
              <p className="ig-cm__tile-eyebrow">
                <SparklesIcon className="h-3.5 w-3.5" />
                {t("tiles.reply.eyebrow")}
              </p>
              <h3 className="ig-cm__tile-title">{t("tiles.reply.title")}</h3>
              <p className="ig-cm__tile-desc">{t("tiles.reply.desc")}</p>
            </div>

            <div className="ig-cm__reply">
              <div className="ig-cm__reply-comment">
                <span className="ig-cm__avatar">{scene.user.slice(0, 1)}</span>
                <div className="min-w-0">
                  <p className="ig-cm__reply-user">{scene.user}</p>
                  <p className="ig-cm__reply-text">{scene.comment}</p>
                </div>
              </div>
              <div className="ig-cm__reply-ai">
                <p className="ig-cm__reply-ai-label">
                  <SparklesIcon className="h-3.5 w-3.5" />
                  {t("widget.aiLabel")}
                </p>
                <p>{scene.reply}</p>
              </div>
              <p className="ig-cm__reply-badge">{scene.badge}</p>
            </div>
          </article>

          <article className="ig-cm__tile is-queue">
            <div className="ig-cm__tile-copy">
              <p className="ig-cm__tile-eyebrow">
                <ShieldIcon className="h-3.5 w-3.5" />
                {t("tiles.queue.eyebrow")}
              </p>
              <h3 className="ig-cm__tile-title">{t("tiles.queue.title")}</h3>
              <p className="ig-cm__tile-desc">{t("tiles.queue.desc")}</p>
            </div>

            <div className="ig-cm__queue">
              <p className="ig-cm__queue-title">{tm("widget.title")}</p>
              <ul className="ig-cm__queue-list">
                {rows.map((row) => (
                  <li key={`${row.user}-${row.text}`}>
                    <span className="min-w-0">
                      <strong>{row.user}</strong>
                      <small>{row.text}</small>
                    </span>
                    <em>{row.action}</em>
                  </li>
                ))}
              </ul>
            </div>
          </article>

          <article className="ig-cm__tile is-action">
            <span className="ig-cm__action-ico">
              <EyeOffIcon className="h-4 w-4" />
            </span>
            <h3 className="ig-cm__tile-title">{tm("items.hide.title")}</h3>
            <p className="ig-cm__tile-desc">{tm("items.hide.body")}</p>
          </article>

          <article className="ig-cm__tile is-action">
            <span className="ig-cm__action-ico">
              <Trash2Icon className="h-4 w-4" />
            </span>
            <h3 className="ig-cm__tile-title">{tm("items.delete.title")}</h3>
            <p className="ig-cm__tile-desc">{tm("items.delete.body")}</p>
          </article>
        </div>
      </Container>
    </section>
  );
}
