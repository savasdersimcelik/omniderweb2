import { getTranslations } from "next-intl/server";
import { ArrowUpRight, Phone } from "lucide-react";
import { DemoRequestButton } from "@/components/demo";
import { Container } from "@/components/layout/Container";
import { Link } from "@/i18n/navigation";
import { AiCallsWidget } from "./AiCallsWidget";

export async function AiCallsSection() {
  const t = await getTranslations("HomePage.aiCalls");

  const inbound = t.raw("inbound") as Array<{
    code: string;
    label: string;
  }>;
  const outbound = t.raw("outbound") as Array<{
    code: string;
    label: string;
  }>;

  return (
    <section id="ai-calls" className="ai-calls-section">
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
              <DemoRequestButton source="home-ai-calls" className="btn-primary">
                {t("ctaPrimary")}
                <ArrowUpRight className="size-4" aria-hidden />
              </DemoRequestButton>
              <Link href="/contact" className="btn-secondary">
                <Phone className="size-4 text-brand-600" aria-hidden />
                {t("ctaSecondary")}
              </Link>
            </div>
          </div>

          <AiCallsWidget
            inbound={inbound.map((item) => ({ ...item, kind: "inbound" }))}
            outbound={outbound.map((item) => ({ ...item, kind: "outbound" }))}
            engineTitle={t("engineTitle")}
            engineStatus={t("engineStatus")}
            inboundLabel={t("inboundLabel")}
            outboundLabel={t("outboundLabel")}
            liveLabel={t("liveLabel")}
          />
        </div>
      </Container>
    </section>
  );
}
