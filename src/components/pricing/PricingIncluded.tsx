import {
  Bot,
  ChartColumn,
  Inbox,
  Send,
  Sparkles,
  Users,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";

const ICONS = {
  inbox: Inbox,
  ai: Sparkles,
  bot: Bot,
  campaigns: Send,
  reports: ChartColumn,
  team: Users,
} as const;

export async function PricingIncluded() {
  const t = await getTranslations("PricingPage.included");
  const items = t.raw("items") as Array<{
    icon: keyof typeof ICONS;
    label: string;
  }>;

  return (
    <section className="pricing-included" aria-labelledby="pricing-included-title">
      <Container>
        <div className="pricing-section-head pricing-section-head--center">
          <h2 id="pricing-included-title" className="pricing-section-title">
            {t("title")}
          </h2>
          <p className="pricing-section-subtitle">{t("subtitle")}</p>
        </div>

        <ul className="pricing-included__grid">
          {items.map((item) => {
            const Icon = ICONS[item.icon] || Sparkles;
            return (
              <li key={item.label}>
                <span>
                  <Icon className="size-4" aria-hidden />
                </span>
                {item.label}
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
