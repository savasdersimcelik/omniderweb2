import {
  CircleHelpIcon,
  ClipboardListIcon,
  LayoutPanelTopIcon,
  MessageCircleIcon,
  ShoppingBagIcon,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";
import { WidgetDemo, type DemoProduct } from "./WidgetDemo";

const POINTS = [
  { id: "chat", icon: MessageCircleIcon },
  { id: "faq", icon: CircleHelpIcon },
  { id: "products", icon: ShoppingBagIcon },
  { id: "orders", icon: ClipboardListIcon },
] as const;

export async function WidgetDemoSection() {
  const t = await getTranslations("PlatformWebchat.widgetDemo");
  const tInbox = await getTranslations("PlatformWebchat.inbox");
  const products = tInbox.raw("chat.products") as DemoProduct[];

  return (
    <section
      id="widget-tabs"
      className="wc-feature wc-widget-demo border-t border-line"
      aria-labelledby="wc-widget-title"
    >
      <Container className="section wc-widget-demo__grid">
        <div className="wc-widget-demo__copy">
          <p className="wa-section-label">
            <LayoutPanelTopIcon aria-hidden="true" />
            {t("eyebrow")}
          </p>
          <h2 id="wc-widget-title" className="heading-section text-balance">
            {t("title")}
          </h2>
          <p className="text-body text-pretty">{t("description")}</p>
          <ul className="wc-widget-demo__points">
            {POINTS.map(({ id, icon: Icon }) => (
              <li key={id}>
                <span className="wc-widget-demo__point-icon" aria-hidden="true">
                  <Icon />
                </span>
                <div>
                  <strong>{t(`points.${id}.title`)}</strong>
                  <p>{t(`points.${id}.body`)}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="wc-widget-demo__note">{t("note")}</p>
        </div>

        <div className="wc-widget-demo__visual">
          <WidgetDemo products={products} />
        </div>
      </Container>
    </section>
  );
}
