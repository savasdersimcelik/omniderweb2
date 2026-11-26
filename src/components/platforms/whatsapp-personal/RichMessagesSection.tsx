import {
  CheckIcon,
  FileTextIcon,
  LayersIcon,
  MapPinIcon,
  MessageCircleIcon,
  MousePointerClickIcon,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";

const FEATURES = [
  { id: "text", icon: MessageCircleIcon },
  { id: "button", icon: MousePointerClickIcon },
  { id: "document", icon: FileTextIcon },
  { id: "location", icon: MapPinIcon },
] as const;

const OPTIONS = [0, 1, 2] as const;

export async function RichMessagesSection() {
  const t = await getTranslations("PlatformWhatsAppPersonal.richMessages");

  return (
    <section
      id="rich-messages"
      className="wa-interactive border-t border-line"
      aria-labelledby="wap-rich-title"
    >
      <Container className="section">
        <header className="wa-interactive__header">
          <div>
            <p className="wa-section-label">
              <LayersIcon aria-hidden="true" />
              {t("eyebrow")}
            </p>
            <h2 id="wap-rich-title" className="heading-section mt-3 text-balance">
              {t("title")}
            </h2>
          </div>
          <div>
            <p className="text-body text-pretty">{t("subtitle")}</p>
          </div>
        </header>

        <div className="wa-interactive__grid">
          {FEATURES.map(({ id, icon: Icon }) => (
            <article key={id} className="wa-interactive__card">
              <header className="wa-interactive__card-header">
                <span className="wa-interactive__icon" aria-hidden="true">
                  <Icon />
                </span>
                <div>
                  <h3>{t(`labels.${id}`)}</h3>
                  <p>{t(`cards.${id}`)}</p>
                </div>
              </header>

              <div className="wa-interactive__preview">
                <p className="wa-interactive__preview-label">{t("preview")}</p>
                <p className="wa-interactive__message">{t(`${id}.body`)}</p>

                {id === "text" && (
                  <p className="wa-interactive__result">
                    {t("text.edited")} · {t("text.reaction")}
                  </p>
                )}

                {id === "button" && (
                  <>
                    <ul className="wa-interactive__choices">
                      {OPTIONS.map((option) => (
                        <li key={option} data-selected={option === 0 || undefined}>
                          {t(`button.options.${option}`)}
                          {option === 0 && <CheckIcon aria-hidden="true" />}
                        </li>
                      ))}
                    </ul>
                    <p className="wa-interactive__result">{t("button.follow")}</p>
                  </>
                )}

                {id === "document" && (
                  <div className="wa-interactive__tracking">
                    <div className="wa-interactive__destination">
                      <span className="wa-interactive__target-icon" aria-hidden="true">
                        <FileTextIcon />
                      </span>
                      <div>
                        <p>{t("document.fileName")}</p>
                        <p>{t("document.fileMeta")}</p>
                      </div>
                    </div>
                    <p className="wa-interactive__result">
                      <CheckIcon aria-hidden="true" />
                      {t("document.status")}
                    </p>
                  </div>
                )}

                {id === "location" && (
                  <div className="wa-interactive__tracking">
                    <div className="wa-interactive__destination">
                      <span className="wa-interactive__target-icon" aria-hidden="true">
                        <MapPinIcon />
                      </span>
                      <div>
                        <p>{t("location.title")}</p>
                        <p>{t("location.address")}</p>
                      </div>
                    </div>
                    <p className="wa-interactive__result">
                      <MapPinIcon aria-hidden="true" />
                      {t("location.status")}
                    </p>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
