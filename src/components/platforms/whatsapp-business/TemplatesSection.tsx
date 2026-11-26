import {
  ArrowUpRightIcon,
  BadgeCheckIcon,
  ClockIcon,
  FileTextIcon,
  LayersIcon,
  MegaphoneIcon,
  RefreshCwIcon,
  ShieldCheckIcon,
  SignalIcon,
  WorkflowIcon,
} from "lucide-react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { DemoRequestButton } from "@/components/demo";
import { Container } from "@/components/layout/Container";
import { Link } from "@/i18n/navigation";

const CARDS = [
  {
    key: "sync",
    image: "/images/platforms/whatsapp/templates/sync-gold.jpg",
    icon: RefreshCwIcon,
    items: [{ key: "field", icon: WorkflowIcon }],
  },
  {
    key: "types",
    image: "/images/platforms/whatsapp/templates/types-gold.jpg",
    icon: LayersIcon,
    items: [
      { key: "options.utility", icon: FileTextIcon },
      { key: "options.marketing", icon: MegaphoneIcon },
      { key: "options.auth", icon: ShieldCheckIcon },
    ],
  },
  {
    key: "status",
    image: "/images/platforms/whatsapp/templates/status-gold.jpg",
    icon: BadgeCheckIcon,
    items: [
      { key: "pills.approved", icon: BadgeCheckIcon, tone: "green" },
      { key: "pills.pending", icon: ClockIcon, tone: "amber" },
      { key: "pills.quality", icon: SignalIcon, tone: "green" },
    ],
  },
] as const;

export async function TemplatesSection() {
  const t = await getTranslations("PlatformWhatsAppBusiness.templates");

  return (
    <section
      id="templates"
      className="wa-templates border-y border-line"
      aria-labelledby="wa-templates-title"
    >
      <Container className="section">
        <header className="wa-templates__header">
          <div>
            <p className="wa-section-label">
              <FileTextIcon aria-hidden="true" />
              {t("eyebrow")}
            </p>
            <h2 id="wa-templates-title" className="heading-section mt-3 text-balance">
              {t("title")}
            </h2>
          </div>
          <div>
            <p className="text-body text-pretty">{t("subtitle")}</p>
            <div className="wa-templates__actions">
              <DemoRequestButton
                source="whatsapp-business-templates"
                className="btn-primary wa-templates__demo"
              >
                {t("ctaPrimary")}
              </DemoRequestButton>
              <Link href="/register" className="btn-secondary wa-templates__register">
                {t("ctaSecondary")}
                <ArrowUpRightIcon size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </header>

        <div className="wa-templates__grid">
          {CARDS.map(({ key, image, icon: Icon, items }) => (
            <article key={key} className="wa-templates__card">
              <div className="wa-templates__art">
                <Image
                  src={image}
                  alt=""
                  fill
                  sizes="(min-width: 1320px) 416px, (min-width: 900px) 33vw, (min-width: 600px) 36vw, 100vw"
                />
              </div>
              <div className="wa-templates__content">
                <span className="wa-templates__icon" aria-hidden="true">
                  <Icon />
                </span>
                <h3>{t(`cards.${key}.label`)}</h3>
                <p>{t(`cards.${key}.description`)}</p>
                <ul className="wa-templates__items">
                  {items.map((item) => (
                    <li key={item.key}>
                      <item.icon
                        aria-hidden="true"
                        data-tone={"tone" in item ? item.tone : undefined}
                      />
                      <span>
                        {t(`cards.${key}.${item.key}`)}
                        {key === "sync" && (
                          <span className="wa-templates__account">
                            {t("cards.sync.meta")}
                          </span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
