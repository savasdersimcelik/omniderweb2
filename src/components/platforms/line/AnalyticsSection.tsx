import {
  ActivityIcon,
  MapPinIcon,
  ShoppingBagIcon,
  UserPlusIcon,
  ZapIcon,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";

const KPIS = [
  { key: "speed" as const, Icon: ZapIcon, accent: false },
  { key: "lead" as const, Icon: UserPlusIcon, accent: false },
  { key: "order" as const, Icon: ShoppingBagIcon, accent: true },
  { key: "location" as const, Icon: MapPinIcon, accent: false },
] as const;

const FUNNEL = [
  { key: "chats" as const, width: "100%", tone: "primary" as const },
  { key: "fast" as const, width: "99%", tone: "primary" as const },
  { key: "leads" as const, width: "59%", tone: "secondary" as const },
  { key: "orders" as const, width: "38%", tone: "secondary" as const },
] as const;

const SOURCES = [
  { key: "qr" as const, orderTone: "best" as const },
  { key: "flex" as const, orderTone: "mid" as const },
  { key: "location" as const, orderTone: "mid" as const },
  { key: "organic" as const, orderTone: "soft" as const },
] as const;

export async function AnalyticsSection() {
  const t = await getTranslations("PlatformLine.analytics");

  return (
    <section
      id="analytics"
      className="wa-analytics border-t border-line"
      aria-labelledby="ln-analytics-title"
    >
      <Container className="section">
        <div className="wa-section-stack">
          <header className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <p className="wa-section-label">
              <ActivityIcon />
              {t("eyebrow")}
            </p>
            <h2
              id="ln-analytics-title"
              className="heading-section mt-3 text-balance"
            >
              {t("title")}
            </h2>
            <p className="text-body mt-4 text-pretty">{t("subtitle")}</p>
          </header>

          <div className="wa-analytics__kpis">
            {KPIS.map(({ key, Icon, accent }) => (
              <article key={key} className="wa-analytics__kpi">
                <div className="wa-analytics__kpi-top">
                  <span>{t(`kpis.${key}.label`)}</span>
                  <span className="wa-analytics__kpi-icon" aria-hidden>
                    <Icon />
                  </span>
                </div>
                <div className="wa-analytics__kpi-value-row">
                  <span
                    className={cn(
                      "wa-analytics__kpi-value",
                      accent && "is-accent",
                    )}
                  >
                    {t(`kpis.${key}.value`)}
                  </span>
                  <span className="wa-analytics__kpi-badge">
                    {t(`kpis.${key}.badge`)}
                  </span>
                </div>
                <p className="wa-analytics__kpi-sub">{t(`kpis.${key}.sub`)}</p>
              </article>
            ))}
          </div>

          <div className="wa-analytics__panels">
            <article className="wa-analytics__panel">
              <div className="wa-analytics__panel-head">
                <div>
                  <h3 className="wa-analytics__panel-title">
                    {t("funnel.title")}
                  </h3>
                  <p className="wa-analytics__panel-sub">{t("funnel.subtitle")}</p>
                </div>
                <span className="wa-analytics__roi">{t("funnel.badge")}</span>
              </div>

              <div className="wa-analytics__funnel">
                {FUNNEL.map((step) => (
                  <div key={step.key} className="wa-analytics__step">
                    <div className="wa-analytics__step-meta">
                      <span>{t(`funnel.steps.${step.key}.label`)}</span>
                      <span
                        className={cn(
                          "wa-analytics__step-value",
                          step.tone === "secondary" && "is-accent",
                        )}
                      >
                        {t(`funnel.steps.${step.key}.value`)}
                      </span>
                    </div>
                    <div className="wa-analytics__track">
                      <i
                        className={cn(
                          "wa-analytics__bar",
                          step.tone === "secondary" && "is-secondary",
                        )}
                        style={{ width: step.width }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="wa-analytics__aov">
                <span>{t("funnel.aovLabel")}</span>
                <strong>{t("funnel.aovValue")}</strong>
              </div>
            </article>

            <article className="wa-analytics__panel">
              <div className="wa-analytics__panel-head">
                <div>
                  <h3 className="wa-analytics__panel-title">
                    {t("sources.title")}
                  </h3>
                  <p className="wa-analytics__panel-sub">
                    {t("sources.subtitle")}
                  </p>
                </div>
              </div>

              <div className="wa-analytics__table-wrap">
                <table className="wa-analytics__table">
                  <thead>
                    <tr>
                      <th>{t("sources.columns.source")}</th>
                      <th>{t("sources.columns.reply")}</th>
                      <th>{t("sources.columns.lead")}</th>
                      <th>{t("sources.columns.order")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SOURCES.map((row) => (
                      <tr key={row.key}>
                        <td>
                          <p className="wa-analytics__source-name">
                            {t(`sources.rows.${row.key}.name`)}
                          </p>
                          <p className="wa-analytics__source-desc">
                            {t(`sources.rows.${row.key}.desc`)}
                          </p>
                        </td>
                        <td className="wa-analytics__mono">
                          {t(`sources.rows.${row.key}.reply`)}
                        </td>
                        <td className="wa-analytics__mono is-accent">
                          {t(`sources.rows.${row.key}.lead`)}
                        </td>
                        <td className="wa-analytics__order">
                          <span
                            className={cn(
                              "wa-analytics__order-pill",
                              `is-${row.orderTone}`,
                            )}
                          >
                            {t(`sources.rows.${row.key}.order`)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>
          </div>
        </div>
      </Container>
    </section>
  );
}
