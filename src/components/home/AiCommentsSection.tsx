import { getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { DemoRequestButton } from "@/components/demo";
import { Container } from "@/components/layout/Container";
import { Link } from "@/i18n/navigation";
import {
  AiCommentsWidget,
  type CommentPreview,
} from "./AiCommentsWidget";

export async function AiCommentsSection() {
  const t = await getTranslations("HomePage.aiComments");
  const nav = await getTranslations("Nav");

  const comments = t.raw("comments") as CommentPreview[];

  return (
    <section id="ai-comments" className="ai-comments-section home-section--plain">
      <Container className="section">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div className="max-w-xl space-y-6">
            <p className="eyebrow flex items-center gap-2">
              <span
                className="inline-block size-2 shrink-0 rounded-xs bg-brand-600"
                aria-hidden
              />
              {t("eyebrow")}
            </p>

            <h2 className="heading-section text-[1.85rem] leading-[1.15] sm:text-4xl lg:text-[2.65rem]">
              <span className="text-ink">{t("title")}</span>{" "}
              <span className="text-ink-subtle">{t("titleAccent")}</span>
            </h2>

            <p className="text-body max-w-md">{t("description")}</p>

            <ul className="space-y-2.5 text-sm text-ink-muted">
              {(t.raw("bullets") as string[]).map((bullet) => (
                <li key={bullet} className="flex items-start gap-2.5">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand-600" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3 pt-1">
              <DemoRequestButton
                source="home-ai-comments"
                className="btn-primary"
              >
                {t("ctaPrimary")}
                <ArrowUpRight className="size-4" aria-hidden />
              </DemoRequestButton>
              <Link href="/register" id="cta-register" className="btn-secondary">
                {nav("startFree")}
              </Link>
            </div>
          </div>

          <AiCommentsWidget
            comments={comments}
            aiLabel={t("aiLabel")}
            replyLabel={t("replyLabel")}
            replyText={t("replyText")}
            statusLabel={t("statusLabel")}
            platformLabels={{
              instagram: t("platforms.instagram"),
              google: t("platforms.google"),
              marketplace: t("platforms.marketplace"),
            }}
          />
        </div>
      </Container>
    </section>
  );
}
