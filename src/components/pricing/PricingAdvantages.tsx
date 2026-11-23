import {
  Bot,
  Building2,
  Inbox,
  Layers,
  Sparkles,
  Users,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";

const ICONS = {
  users: Users,
  inbox: Inbox,
  departments: Building2,
  sparkle: Sparkles,
  bot: Bot,
  channels: Layers,
} as const;

export async function PricingAdvantages() {
  const t = await getTranslations("PricingPage.advantages");
  const items = t.raw("items") as Array<{
    icon: keyof typeof ICONS;
    title: string;
    desc: string;
  }>;

  return (
    <section className="pricing-advantages" aria-labelledby="pricing-advantages-title">
      <Container>
        <div className="pricing-section-head">
          <p className="pricing-section-eyebrow">{t("eyebrow")}</p>
          <h2 id="pricing-advantages-title" className="pricing-section-title">
            {t("title")}
          </h2>
          <p className="pricing-section-subtitle">{t("subtitle")}</p>
        </div>

        <ul className="pricing-advantages__grid">
          {items.map((item) => {
            const Icon = ICONS[item.icon] || Sparkles;
            return (
              <li key={item.title} className="pricing-advantages__item">
                <span className="pricing-advantages__icon">
                  <Icon className="size-5" aria-hidden />
                </span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
