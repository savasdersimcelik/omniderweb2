import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";

const CARDS = [
  {
    key: "sync" as const,
    image: "/images/platforms/whatsapp/templates/sync-gold.jpg",
    imageAlt: "",
  },
  {
    key: "types" as const,
    image: "/images/platforms/whatsapp/templates/types-gold.jpg",
    imageAlt: "",
  },
  {
    key: "status" as const,
    image: "/images/platforms/whatsapp/templates/status-gold.jpg",
    imageAlt: "",
  },
] as const;

export async function TemplatesSection() {
  const t = await getTranslations("PlatformWhatsAppBusiness.templates");

  return (
    <section
      id="templates"
      className="wa-templates border-t border-line"
      aria-labelledby="wa-templates-title"
    >
      <Container className="section">
        <header className="wa-templates__header mx-auto max-w-3xl text-center">
          <p className="eyebrow inline-flex items-center justify-center gap-2 text-[var(--wa-teal)]">
            {t("eyebrow")}
          </p>
          <h2 id="wa-templates-title" className="heading-section mt-3">
            {t("title")}
          </h2>
          <p className="wa-templates__subtitle text-body mt-4">
            {t("subtitle")}
          </p>
        </header>

        <div className="wa-templates__grid">
          {CARDS.map((card) => (
            <article key={card.key} className="wa-templates__shot">
              <Image
                src={card.image}
                alt={card.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="wa-templates__shot-img object-cover"
              />
              <div className="wa-templates__glass">
                <div className="wa-templates__glass-top">
                  <p className="wa-templates__glass-label">
                    {t(`cards.${card.key}.label`)}
                  </p>
                  <span className="wa-templates__glass-menu" aria-hidden>
                    ···
                  </span>
                </div>

                {card.key === "sync" ? (
                  <div className="wa-templates__glass-body">
                    <div className="wa-templates__field">
                      <span>{t("cards.sync.field")}</span>
                      <span aria-hidden>▾</span>
                    </div>
                    <div className="wa-templates__field is-muted">
                      <span>{t("cards.sync.meta")}</span>
                      <span aria-hidden>▾</span>
                    </div>
                  </div>
                ) : null}

                {card.key === "types" ? (
                  <div className="wa-templates__glass-body">
                    {(
                      ["utility", "marketing", "auth"] as const
                    ).map((opt) => (
                      <div
                        key={opt}
                        className={
                          opt === "utility"
                            ? "wa-templates__radio is-on"
                            : "wa-templates__radio"
                        }
                      >
                        <span className="wa-templates__radio-dot" aria-hidden />
                        <span>{t(`cards.types.options.${opt}`)}</span>
                      </div>
                    ))}
                  </div>
                ) : null}

                {card.key === "status" ? (
                  <div className="wa-templates__glass-body">
                    <div className="wa-templates__pills">
                      {(
                        ["approved", "pending", "quality"] as const
                      ).map((pill) => (
                        <span
                          key={pill}
                          className={
                            pill === "approved"
                              ? "wa-templates__pill is-on"
                              : "wa-templates__pill"
                          }
                        >
                          {t(`cards.status.pills.${pill}`)}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}

                <div className="wa-templates__cta">
                  <span>{t(`cards.${card.key}.cta`)}</span>
                  <span aria-hidden>→</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
