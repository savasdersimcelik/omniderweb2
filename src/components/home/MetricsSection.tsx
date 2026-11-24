import Image from "next/image";
import { ArrowUpRight, Zap } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { DemoRequestButton } from "@/components/demo";
import { Container } from "@/components/layout/Container";
import { Link } from "@/i18n/navigation";

const channelMarks = [
  { src: "/icons/platforms/whatsapp.png", label: "WhatsApp" },
  { src: "/icons/platforms/instagram.png", label: "Instagram" },
  { src: "/icons/platforms/messenger.png", label: "Messenger" },
  { src: "/icons/platforms/telegram.png", label: "Telegram" },
];

export async function MetricsSection() {
  const t = await getTranslations("HomePage.metrics");
  const nav = await getTranslations("Nav");

  return (
    <section
      id="metrics"
      className="home-metrics"
      aria-labelledby="home-metrics-title"
    >
      <Container className="home-metrics__layout">
        <div className="home-metrics__bento">
          <article className="home-metrics__card">
            <p className="home-metrics__value">{t("reply.value")}</p>
            <p className="home-metrics__label">{t("reply.label")}</p>
          </article>

          <article className="home-metrics__card home-metrics__card--lead">
            <div className="home-metrics__lead-row">
              <span className="home-metrics__mark" aria-hidden>
                <Zap className="size-4" />
              </span>
              <p className="home-metrics__value">{t("lead.value")}</p>
            </div>
            <p className="home-metrics__label">{t("lead.label")}</p>
          </article>

          <article className="home-metrics__card home-metrics__card--order">
            <p className="home-metrics__value">{t("order.value")}</p>
            <p className="home-metrics__label">{t("order.label")}</p>
            <p className="home-metrics__note">{t("order.note")}</p>
          </article>

          <article className="home-metrics__card home-metrics__card--photo">
            <Image
              src="/images/home/metrics-woman.jpg"
              alt=""
              width={687}
              height={1024}
              className="home-metrics__photo"
            />
          </article>

          <article className="home-metrics__card home-metrics__card--always">
            <p className="home-metrics__value">{t("always.value")}</p>
            <p className="home-metrics__label">{t("always.label")}</p>
          </article>

          <article className="home-metrics__card">
            <p className="home-metrics__value">{t("customers.value")}</p>
            <p className="home-metrics__label">{t("customers.label")}</p>
            <ul className="home-metrics__marks">
              {channelMarks.map((mark) => (
                <li key={mark.label}>
                  <Image src={mark.src} alt={mark.label} width={22} height={22} />
                </li>
              ))}
            </ul>
          </article>
        </div>

        <div className="home-metrics__copy">
          <p className="home-metrics__eyebrow">{t("eyebrow")}</p>
          <h2 id="home-metrics-title" className="home-metrics__title">
            {t("title")}{" "}
            <span className="home-metrics__accent">{t("titleAccent")}</span>
          </h2>
          <p className="home-metrics__body">{t("body")}</p>
          <p className="home-metrics__note-line">{t("note")}</p>
          <div className="home-metrics__actions">
            <DemoRequestButton source="home-metrics" className="btn-primary">
              {t("cta")}
              <ArrowUpRight className="size-4" aria-hidden />
            </DemoRequestButton>
            <Link href="/register" className="home-metrics__ghost">
              {nav("startFree")}
              <ArrowUpRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
