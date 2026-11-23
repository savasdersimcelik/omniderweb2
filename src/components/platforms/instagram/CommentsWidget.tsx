"use client";

import Image from "next/image";
import {
  BookmarkIcon,
  HeartIcon,
  MessageCircleIcon,
  MoreHorizontalIcon,
  SendIcon,
  SparklesIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";

const POST_IMAGE = "/images/platforms/instagram/comment-post.jpg";

type TabId = "price" | "stock" | "dm";

type CommentsWidgetProps = {
  tab: TabId;
};

export function CommentsWidget({ tab }: CommentsWidgetProps) {
  const t = useTranslations("PlatformInstagram.comments.widget");

  return (
    <article className="ig-cmt" key={tab} aria-hidden>
      <header className="ig-cmt__head">
        <span className="ig-cmt__avatar">
          <Image
            src="/icons/platforms/instagram.png"
            alt=""
            width={28}
            height={28}
            className="h-7 w-7 object-contain"
            unoptimized
          />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-ink">
            {t("brand")}
          </p>
          <p className="text-[11px] text-ink-faint">{t("handle")}</p>
        </div>
        <MoreHorizontalIcon className="h-4 w-4 shrink-0 text-ink-faint" />
      </header>

      <div className="ig-cmt__media relative">
        <Image
          src={POST_IMAGE}
          alt=""
          fill
          className="object-cover"
          sizes="320px"
          unoptimized
        />
      </div>

      <div className="ig-cmt__actions">
        <div className="flex items-center gap-3.5">
          <HeartIcon className="h-5 w-5 text-ink" />
          <MessageCircleIcon className="h-5 w-5 text-ink" />
          <SendIcon className="h-5 w-5 text-ink" />
        </div>
        <BookmarkIcon className="h-5 w-5 text-ink" />
      </div>

      <div className="ig-cmt__body">
        <p className="text-xs font-semibold text-ink">{t("likes")}</p>
        <p className="mt-1 text-sm leading-5 text-ink">
          <span className="font-semibold">{t("brand")}</span>{" "}
          <span className="text-ink-subtle">{t("caption")}</span>
        </p>

        <div className="ig-cmt__thread">
          <div className="ig-cmt__comment">
            <span className="ig-cmt__dot" />
            <div className="min-w-0">
              <p className="text-sm text-ink">
                <span className="font-semibold">{t(`scenes.${tab}.user`)}</span>{" "}
                {t(`scenes.${tab}.comment`)}
              </p>
            </div>
          </div>

          <div className="ig-cmt__ai">
            <div className="mb-1 flex items-center gap-1.5">
              <SparklesIcon className="h-3.5 w-3.5 text-[var(--ig-purple)]" />
              <span className="text-[11px] font-bold tracking-wide text-[var(--ig-purple)] uppercase">
                {t("aiLabel")}
              </span>
            </div>
            <p className="text-sm leading-5 text-ink">
              {t(`scenes.${tab}.reply`)}
            </p>
          </div>
        </div>

        <p className="ig-cmt__badge">{t(`scenes.${tab}.badge`)}</p>
      </div>
    </article>
  );
}
