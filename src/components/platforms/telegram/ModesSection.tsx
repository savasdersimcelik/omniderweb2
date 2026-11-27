import {
  BotIcon,
  CheckIcon,
  LayersIcon,
  QrCodeIcon,
  SparklesIcon,
  UsersIcon,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";

type CompareCell = {
  text?: string;
  mark?: "yes" | "dash";
  note?: string;
};

type CompareRow = {
  label: string;
  bot: CompareCell;
  personal: CompareCell;
};

type ContactRow = { name: string; meta: string };

function CompareValue({
  cell,
  yesLabel,
}: {
  cell: CompareCell;
  yesLabel: string;
}) {
  if (cell.text) {
    return <span className="tg-paths__val">{cell.text}</span>;
  }
  if (cell.mark === "yes") {
    return (
      <span className="tg-paths__yes">
        <CheckIcon aria-hidden />
        <span className="sr-only">{yesLabel}</span>
        {cell.note ? <small>{cell.note}</small> : null}
      </span>
    );
  }
  return <span className="tg-paths__dash" aria-hidden>—</span>;
}

export async function ModesSection() {
  const t = await getTranslations("PlatformTelegram.modes");
  const botFeatures = t.raw("bot.features") as string[];
  const personalFeatures = t.raw("personal.features") as string[];
  const keys = (t.raw("bot.scene.keys") as string[]).slice(0, 3);
  const options = (t.raw("bot.scene.options") as string[]).slice(0, 2);
  const rows = (t.raw("personal.scene.rows") as ContactRow[]).slice(0, 3);
  const compareRows = (t.raw("compareRows") as CompareRow[]).slice(0, 6);

  return (
    <section
      id="modes"
      className="tg-paths border-t border-line"
      aria-labelledby="tg-modes-title"
    >
      <Container className="section">
        <header className="wa-interactive__header">
          <div>
            <p className="wa-section-label">
              <LayersIcon aria-hidden />
              {t("eyebrow")}
            </p>
            <h2
              id="tg-modes-title"
              className="heading-section mt-3 text-balance"
            >
              {t("title")}
            </h2>
          </div>
          <div>
            <p className="text-body text-pretty">{t("subtitle")}</p>
          </div>
        </header>

        <div className="tg-paths__duo">
          <article className="tg-paths__card">
            <header className="tg-paths__card-head">
              <span className="tg-paths__icon" aria-hidden>
                <BotIcon />
              </span>
              <div>
                <p className="tg-paths__kicker">{t("tabs.bot")}</p>
                <h3>{t("bot.bestFor")}</h3>
              </div>
              <span className="tg-paths__badge">
                <SparklesIcon aria-hidden />
                {t("bot.bestLabel")}
              </span>
            </header>

            <div className="tg-paths__preview">
              <p className="tg-paths__preview-label">{t("demoNote")}</p>
              <div className="tg-paths__phone">
                <header>
                  <span className="tg-paths__avatar" aria-hidden>
                    <BotIcon />
                  </span>
                  <div>
                    <strong>{t("bot.scene.name")}</strong>
                    <small>{t("bot.scene.online")}</small>
                  </div>
                </header>
                <p className="tg-paths__bubble">{t("bot.scene.greeting")}</p>
                <ul className="tg-paths__chips">
                  {keys.map((key) => (
                    <li key={key}>{key}</li>
                  ))}
                </ul>
                <div className="tg-paths__poll">
                  <p>{t("bot.scene.poll")}</p>
                  <ul>
                    {options.map((option, index) => (
                      <li
                        key={option}
                        className={cn(index === 0 && "is-on")}
                      >
                        {index === 0 && <CheckIcon aria-hidden />}
                        {option}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <ul className="tg-paths__features">
              {botFeatures.map((feature) => (
                <li key={feature}>
                  <CheckIcon aria-hidden />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="tg-paths__card">
            <header className="tg-paths__card-head">
              <span className="tg-paths__icon" aria-hidden>
                <QrCodeIcon />
              </span>
              <div>
                <p className="tg-paths__kicker">{t("tabs.personal")}</p>
                <h3>{t("personal.bestFor")}</h3>
              </div>
              <span className="tg-paths__badge">
                <UsersIcon aria-hidden />
                {t("personal.bestLabel")}
              </span>
            </header>

            <div className="tg-paths__preview">
              <p className="tg-paths__preview-label">{t("demoNote")}</p>
              <div className="tg-paths__desk">
                <header>
                  <UsersIcon aria-hidden />
                  <span>{t("personal.scene.inbox")}</span>
                  <em>{t("personal.scene.status")}</em>
                </header>
                <ul>
                  {rows.map((row) => (
                    <li key={row.name}>
                      <span aria-hidden>{row.name.slice(0, 1)}</span>
                      <div>
                        <strong>{row.name}</strong>
                        <small>{row.meta}</small>
                      </div>
                    </li>
                  ))}
                </ul>
                <footer>
                  <p>{t("personal.scene.progress")}</p>
                  <p>{t("personal.scene.echo")}</p>
                </footer>
              </div>
            </div>

            <ul className="tg-paths__features">
              {personalFeatures.map((feature) => (
                <li key={feature}>
                  <CheckIcon aria-hidden />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <p className="tg-paths__note">{t("personal.note")}</p>
          </article>
        </div>

        <div className="tg-paths__compare">
          <div className="tg-paths__compare-head">
            <h3>{t("tabs.compare")}</h3>
            <p>{t("subtitle")}</p>
          </div>
          <div className="tg-paths__table-wrap">
            <table className="tg-paths__table">
              <thead>
                <tr>
                  <th scope="col">
                    <span className="sr-only">{t("tabs.compare")}</span>
                  </th>
                  <th scope="col">
                    <span className="tg-paths__col">
                      <BotIcon aria-hidden />
                      {t("tabs.botShort")}
                    </span>
                  </th>
                  <th scope="col">
                    <span className="tg-paths__col">
                      <UsersIcon aria-hidden />
                      {t("tabs.personalShort")}
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row) => (
                  <tr key={row.label}>
                    <th scope="row">{row.label}</th>
                    <td>
                      <CompareValue cell={row.bot} yesLabel={t("yesLabel")} />
                    </td>
                    <td>
                      <CompareValue
                        cell={row.personal}
                        yesLabel={t("yesLabel")}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </Container>
    </section>
  );
}
