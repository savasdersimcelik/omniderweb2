import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";
import { WidgetDemo, type DemoProduct } from "./WidgetDemo";

export async function WidgetDemoSection() {
  const t = await getTranslations("PlatformWebchat");

  return (
    <section id="widget-tabs" className="wc-feature border-t border-line" aria-labelledby="wc-widget-title">
      <Container className="section wc-feature-grid">
        <header className="wc-feature-copy">
          <h2 id="wc-widget-title" className="heading-section text-balance">{t("widgetDemo.title")}</h2>
          <p className="text-body text-pretty">{t("widgetDemo.description")}</p>
        </header>
        <div className="wc-feature-stage">
          <WidgetDemo products={t.raw("inbox.chat.products") as DemoProduct[]} />
        </div>
      </Container>
    </section>
  );
}
