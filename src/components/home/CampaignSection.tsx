import { getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { DemoRequestButton } from "@/components/demo";
import { Container } from "@/components/layout/Container";
import { Link } from "@/i18n/navigation";
import {
  CampaignWidget,
  type CampaignEvent,
  type CampaignOption,
  type CampaignStat,
} from "./CampaignWidget";

export async function CampaignSection() {
  const t = await getTranslations("HomePage.campaigns");
  const nav = await getTranslations("Nav");
  const types = t.raw("types") as CampaignOption[];
  const channels = t.raw("channels") as CampaignOption[];
  const events = t.raw("events") as CampaignEvent[];
  const stats = t.raw("stats") as CampaignStat[];
  const progressPercent = Number(t("progressPercent")) || 68;

  return (
    <section id="campaigns" className="campaign-section home-section--dotted">
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
              source="home-campaigns"
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

        <div className="mt-10 lg:mt-14">
          <CampaignWidget
            campaignTitle={t("campaignTitle")}
            campaignMeta={t("campaignMeta")}
            statusLabel={t("statusLabel")}
            typesLabel={t("typesLabel")}
            types={types}
            channelsLabel={t("channelsLabel")}
            channels={channels}
            audienceLabel={t("audienceLabel")}
            audienceValue={t("audienceValue")}
            templateLabel={t("templateLabel")}
            messagePreview={t("messagePreview")}
            feedLabel={t("feedLabel")}
            events={events}
            stats={stats}
            progressLabel={t("progressLabel")}
            progressValue={t("progressValue")}
            progressPercent={progressPercent}
            resultLabel={t("resultLabel")}
            liveLabel={t("liveLabel")}
          />
        </div>
      </Container>
    </section>
  );
}
