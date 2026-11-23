import { getTranslations } from "next-intl/server";
import { ArrowUpRight, Mail } from "lucide-react";
import { DemoRequestButton } from "@/components/demo";
import { Container } from "@/components/layout/Container";
import { Link } from "@/i18n/navigation";
import {
  EmailWidget,
  type EmailFolder,
  type InboxMail,
} from "./EmailWidget";

export async function EmailSection() {
  const t = await getTranslations("HomePage.emailSystem");
  const folders = t.raw("folders") as EmailFolder[];
  const mails = t.raw("mails") as InboxMail[];

  return (
    <section id="email-system" className="email-section home-section--dotted">
      <Container className="section">
        <div className="mx-auto max-w-5xl space-y-5 text-center">
          <p className="eyebrow inline-flex items-center justify-center gap-2">
            <span
              className="inline-block size-2 shrink-0 rounded-xs bg-brand-600"
              aria-hidden
            />
            {t("eyebrow")}
          </p>

          <h2 className="home-section-title heading-section text-[1.85rem] leading-[1.15] sm:text-4xl lg:text-[2.45rem]">
            <span className="text-ink">{t("title")}</span>{" "}
            <span className="home-section-title__accent text-ink-subtle">
              {t("titleAccent")}
            </span>
          </h2>

          <p className="text-body mx-auto max-w-2xl">{t("description")}</p>

          <div className="flex flex-wrap justify-center gap-3 pt-1">
            <DemoRequestButton
              source="home-email-system"
              className="btn-primary"
            >
              {t("ctaPrimary")}
              <ArrowUpRight className="size-4" aria-hidden />
            </DemoRequestButton>
            <Link href="/contact" className="btn-secondary">
              <Mail className="size-4 text-brand-600" aria-hidden />
              {t("ctaSecondary")}
            </Link>
          </div>
        </div>

        <div className="mt-10 lg:mt-14">
          <EmailWidget
            inboxLabel={t("inboxLabel")}
            foldersLabel={t("foldersLabel")}
            folders={folders}
            mails={mails}
            sortedLabel={t("sortedLabel")}
            replyPanelTitle={t("replyPanelTitle")}
            fromLabel={t("fromLabel")}
            subjectLabel={t("subjectLabel")}
            replyFrom={t("replyFrom")}
            replySubject={t("replySubject")}
            replyDraft={t("replyDraft")}
            replyStatus={t("replyStatus")}
            aiLabel={t("aiLabel")}
          />
        </div>
      </Container>
    </section>
  );
}
