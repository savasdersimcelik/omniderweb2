import {
  ArrowUpRightIcon,
  CalendarDaysIcon,
  GitBranchIcon,
  LanguagesIcon,
  LifeBuoyIcon,
  MessageSquareIcon,
  SparklesIcon,
  ZapIcon,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import { DemoRequestButton } from "@/components/demo";
import { Container } from "@/components/layout/Container";
import { Link } from "@/i18n/navigation";

const MODELS = [
  { id: "assist", icon: LifeBuoyIcon },
  { id: "standard", icon: MessageSquareIcon },
  { id: "flow", icon: ZapIcon },
  { id: "advanced", icon: GitBranchIcon },
  { id: "expert", icon: CalendarDaysIcon },
  { id: "ultra", icon: SparklesIcon },
] as const;

export async function AiAutomationSection() {
  const t = await getTranslations("PlatformWhatsAppBusiness.aiAutomation");

  return (
    <section id="ai" className="wa-ai border-y border-line" aria-labelledby="wa-ai-title">
      <Container className="section">
        <header className="wa-ai__header">
          <div>
            <p className="wa-section-label">
              <SparklesIcon aria-hidden="true" />
              {t("eyebrow")}
            </p>
            <h2 id="wa-ai-title" className="heading-section mt-3 text-balance">
              {t("title")}
            </h2>
          </div>
          <div>
            <p className="text-body text-pretty">{t("subtitle")}</p>
            <div className="wa-ai__actions">
              <DemoRequestButton
                source="whatsapp-business-ai"
                className="btn-primary wa-ai__demo"
              >
                {t("ctaPrimary")}
              </DemoRequestButton>
              <Link href="/register" className="btn-secondary wa-ai__register">
                {t("ctaSecondary")}
                <ArrowUpRightIcon size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </header>

        <div className="wa-ai__catalog">
          <div className="wa-ai__catalog-header">
            <h3 id="wa-ai-catalog-title">{t("catalogTitle")}</h3>
            <p>
              <LanguagesIcon size={17} aria-hidden="true" />
              {t("langDetect")}
            </p>
          </div>

          <ul className="wa-ai__models" aria-labelledby="wa-ai-catalog-title">
            {MODELS.map(({ id, icon: Icon }) => (
              <li className="wa-ai__model" data-model={id} key={id}>
                <div className="wa-ai__model-header">
                  <div>
                    <h4>{t(`models.${id}.short`)}</h4>
                    <p className="wa-ai__model-tag">{t(`models.${id}.tag`)}</p>
                  </div>
                  <span className="wa-ai__model-icon" aria-hidden="true">
                    <Icon />
                  </span>
                </div>
                <p className="wa-ai__model-description">{t(`models.${id}.description`)}</p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
