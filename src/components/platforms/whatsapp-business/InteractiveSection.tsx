import {
  ArrowUpRightIcon,
  CalendarDaysIcon,
  CheckIcon,
  Link2Icon,
  ListIcon,
  MessageCircleIcon,
  PackageCheckIcon,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";

const FEATURES = [
  { id: "buttons", icon: MessageCircleIcon },
  { id: "list", icon: ListIcon },
  { id: "link", icon: Link2Icon },
  { id: "form", icon: CalendarDaysIcon },
] as const;

const OPTIONS = [0, 1, 2] as const;

export async function InteractiveSection() {
  const t = await getTranslations("PlatformWhatsAppBusiness.interactive");

  return (
    <section
      id="interactive"
      className="wa-interactive border-t border-line"
      aria-labelledby="wa-interactive-title"
    >
      <Container className="section">
        <header className="wa-interactive__header">
          <div>
            <p className="wa-section-label">
              <MessageCircleIcon aria-hidden="true" />
              {t("eyebrow")}
            </p>
            <h2 id="wa-interactive-title" className="heading-section mt-3 text-balance">
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

                {id === "buttons" && (
                  <>
                    <ul className="wa-interactive__choices">
                      {OPTIONS.map((option) => (
                        <li key={option} data-selected={option === 0 || undefined}>
                          {t(`buttons.options.${option}`)}
                          {option === 0 && <CheckIcon aria-hidden="true" />}
                        </li>
                      ))}
                    </ul>
                    <p className="wa-interactive__result">{t("buttons.follow")}</p>
                  </>
                )}

                {id === "list" && (
                  <ul className="wa-interactive__products">
                    {OPTIONS.map((option) => (
                      <li key={option} data-selected={option === 0 || undefined}>
                        <span className="wa-interactive__product-name">
                          {option === 0 && <CheckIcon aria-hidden="true" />}
                          {t(`list.rows.${option}.title`)}
                        </span>
                        <span>{t(`list.rows.${option}.description`)}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {id === "link" && (
                  <div className="wa-interactive__tracking">
                    <div className="wa-interactive__destination">
                      <span className="wa-interactive__target-icon" aria-hidden="true">
                        <Link2Icon />
                      </span>
                      <div>
                        <p>{t("link.previewTitle")}</p>
                        <p>{t("link.previewUrl")}</p>
                      </div>
                      <ArrowUpRightIcon aria-hidden="true" />
                    </div>
                    <p className="wa-interactive__result">
                      <PackageCheckIcon aria-hidden="true" />
                      {t("link.status")}
                    </p>
                  </div>
                )}

                {id === "form" && (
                  <>
                    <div className="wa-interactive__appointment">
                      <p>{t("form.chooseTime")}</p>
                      <ul className="wa-interactive__choices">
                        {OPTIONS.map((option) => (
                          <li key={option} data-selected={option === 1 || undefined}>
                            {t(`form.times.${option}`)}
                            {option === 1 && <CheckIcon aria-hidden="true" />}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <p className="wa-interactive__result">
                      <CheckIcon aria-hidden="true" />
                      {t("form.success", { time: t("form.times.1") })}
                    </p>
                  </>
                )}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
