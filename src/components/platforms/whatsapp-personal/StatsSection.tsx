import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";

type StatsSectionProps = {
  id: string;
  namespace: "PlatformWhatsAppPersonal.stats";
};

export async function StatsSection({ id, namespace }: StatsSectionProps) {
  const t = await getTranslations(namespace);
  const titleId = `${id}-title`;

  return (
    <section
      id={id}
      className="wap-stats border-t border-line"
      aria-labelledby={titleId}
    >
      <Container className="section">
        <header className="wap-stats__head">
          <p className="wap-stats__eyebrow">{t("eyebrow")}</p>
          <h2 id={titleId} className="wap-stats__title">
            {t("title")}
          </h2>
          <p className="wap-stats__body">{t("body")}</p>
        </header>

        <div className="wap-stats__grid">
          <article className="wap-stats__photo">
            <Image
              src="/images/platforms/whatsapp/mid-cta-woman.png"
              alt=""
              width={408}
              height={691}
              className="wap-stats__person"
              aria-hidden
            />
            <div className="wap-stats__float">
              <p className="wap-stats__num">{t("reply.value")}</p>
              <p className="wap-stats__hint">{t("reply.label")}</p>
            </div>
          </article>

          <article className="wap-stats__lead">
            <p className="wap-stats__kicker">{t("lead.kicker")}</p>
            <p className="wap-stats__figure">{t("lead.value")}</p>
            <p className="wap-stats__note">{t("lead.label")}</p>
          </article>

          <article className="wap-stats__order">
            <p className="wap-stats__kicker">{t("order.kicker")}</p>
            <p className="wap-stats__figure">{t("order.value")}</p>
            <p className="wap-stats__note">{t("order.label")}</p>
          </article>

          <article className="wap-stats__always">
            <p className="wap-stats__kicker">{t("always.kicker")}</p>
            <p className="wap-stats__figure">{t("always.value")}</p>
          </article>
        </div>
      </Container>
    </section>
  );
}
