"use client";

import { useState } from "react";
import {
  BotIcon,
  CheckIcon,
  LayersIcon,
  PhoneIcon,
  UsersIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";

type TabId = "bot" | "personal" | "compare";

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
    return <span className="tg-modes__val">{cell.text}</span>;
  }
  if (cell.mark === "yes") {
    return (
      <span className="tg-modes__yes">
        <CheckIcon className="h-4 w-4" aria-hidden />
        <span className="sr-only">{yesLabel}</span>
        {cell.note ? <small>{cell.note}</small> : null}
      </span>
    );
  }
  return <span className="tg-modes__dash" aria-hidden>—</span>;
}

function FeatureList({ items }: { items: string[] }) {
  return (
    <ul className="tg-modes__features">
      {items.map((feature) => (
        <li key={feature}>
          <span className="tg-modes__check" aria-hidden>
            <CheckIcon className="h-3.5 w-3.5" />
          </span>
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  );
}

function StepList({ items }: { items: string[] }) {
  return (
    <ol className="tg-modes__steps">
      {items.map((step, index) => (
        <li key={step}>
          <span aria-hidden>{index + 1}</span>
          <p>{step}</p>
        </li>
      ))}
    </ol>
  );
}

export function ModesSection() {
  const t = useTranslations("PlatformTelegram.modes");
  const [tab, setTab] = useState<TabId>("bot");

  const botSteps = t.raw("bot.connectSteps") as string[];
  const botFeatures = t.raw("bot.features") as string[];
  const personalSteps = t.raw("personal.connectSteps") as string[];
  const personalFeatures = t.raw("personal.features") as string[];
  const keys = t.raw("bot.scene.keys") as string[];
  const options = t.raw("bot.scene.options") as string[];
  const rows = t.raw("personal.scene.rows") as ContactRow[];
  const compareRows = t.raw("compareRows") as CompareRow[];

  const tabs: Array<{ id: TabId; label: string; short: string }> = [
    { id: "bot", label: t("tabs.bot"), short: t("tabs.botShort") },
    {
      id: "personal",
      label: t("tabs.personal"),
      short: t("tabs.personalShort"),
    },
    {
      id: "compare",
      label: t("tabs.compare"),
      short: t("tabs.compareShort"),
    },
  ];

  return (
    <section
      id="modes"
      className="tg-modes border-t border-line"
      aria-labelledby="tg-modes-title"
    >
      <Container className="section">
        <header className="mx-auto max-w-3xl text-center">
          <p className="eyebrow inline-flex items-center justify-center gap-2 text-[var(--color-telegram)]">
            <LayersIcon className="h-3.5 w-3.5" />
            {t("eyebrow")}
          </p>
          <h2 id="tg-modes-title" className="heading-section mt-3 text-balance">
            {t("title")}
          </h2>
          <p className="tg-lede text-body mt-4">{t("subtitle")}</p>
        </header>

        <div
          className="tg-modes__tabs"
          role="tablist"
          aria-label={t("tabsLabel")}
        >
          {tabs.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`tg-tab-${item.id}`}
              aria-selected={tab === item.id}
              aria-controls={`tg-panel-${item.id}`}
              className={cn("tg-modes__tab", tab === item.id && "is-on")}
              onClick={() => setTab(item.id)}
            >
              <span className="sm:hidden">{item.short}</span>
              <span className="hidden sm:inline">{item.label}</span>
            </button>
          ))}
        </div>

        {tab === "bot" ? (
          <div
            id="tg-panel-bot"
            role="tabpanel"
            aria-labelledby="tg-tab-bot"
            className="tg-modes__panel"
          >
            <div className="tg-modes__split">
              <div className="tg-modes__stage">
                <p className="tg-modes__demo">{t("demoNote")}</p>
                <div className="tg-modes__phone">
                  <header className="tg-modes__phone-top">
                    <span className="tg-modes__avatar">
                      <BotIcon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0">
                      <strong>{t("bot.scene.name")}</strong>
                      <small>{t("bot.scene.online")}</small>
                    </span>
                  </header>
                  <div className="tg-modes__chat">
                    <p className="tg-modes__bubble">{t("bot.scene.greeting")}</p>
                    <div className="tg-modes__keys" role="list">
                      {keys.map((key) => (
                        <span key={key} role="listitem">
                          {key}
                        </span>
                      ))}
                    </div>
                    <p className="tg-modes__typing">
                      <span className="tg-modes__dots" aria-hidden>
                        <i />
                        <i />
                        <i />
                      </span>
                      {t("bot.scene.typing")}
                    </p>
                    <div className="tg-modes__poll">
                      <p>{t("bot.scene.poll")}</p>
                      <ul className="tg-modes__opts">
                        {options.map((option, index) => (
                          <li
                            key={option}
                            className={cn(
                              "tg-modes__opt",
                              index === 0 && "is-on",
                            )}
                          >
                            <span className="tg-modes__opt-dot" aria-hidden />
                            <span>{option}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <span className="tg-modes__share">
                      <PhoneIcon className="h-3.5 w-3.5" aria-hidden />
                      {t("bot.scene.share")}
                    </span>
                  </div>
                </div>
              </div>

              <div className="tg-modes__copy">
                <h3>{t("bot.connectLabel")}</h3>
                <StepList items={botSteps} />
                <FeatureList items={botFeatures} />
                <p className="tg-modes__best">
                  <strong>{t("bot.bestLabel")}</strong>
                  <span>{t("bot.bestFor")}</span>
                </p>
              </div>
            </div>
          </div>
        ) : null}

        {tab === "personal" ? (
          <div
            id="tg-panel-personal"
            role="tabpanel"
            aria-labelledby="tg-tab-personal"
            className="tg-modes__panel"
          >
            <div className="tg-modes__split">
              <div className="tg-modes__stage">
                <p className="tg-modes__demo">{t("demoNote")}</p>
                <div className="tg-modes__desk">
                  <header>
                    <UsersIcon className="h-4 w-4" />
                    <span>{t("personal.scene.inbox")}</span>
                    <em className="tg-modes__desk-live">
                      {t("personal.scene.status")}
                    </em>
                  </header>
                  <ul className="tg-modes__desk-list">
                    {rows.map((row) => (
                      <li key={row.name}>
                        <span className="tg-modes__desk-avatar" aria-hidden>
                          {row.name.slice(0, 1)}
                        </span>
                        <span className="tg-modes__desk-meta">
                          <strong>{row.name}</strong>
                          <em>{row.meta}</em>
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="tg-modes__desk-foot">
                    <div className="tg-modes__bar" aria-hidden>
                      <i />
                    </div>
                    <p className="tg-modes__progress">
                      {t("personal.scene.progress")}
                    </p>
                    <p className="tg-modes__echo">{t("personal.scene.echo")}</p>
                  </div>
                </div>
              </div>

              <div className="tg-modes__copy">
                <h3>{t("personal.connectLabel")}</h3>
                <StepList items={personalSteps} />
                <FeatureList items={personalFeatures} />
                <p className="tg-modes__best">
                  <strong>{t("personal.bestLabel")}</strong>
                  <span>{t("personal.bestFor")}</span>
                </p>
                <p className="tg-modes__note">{t("personal.note")}</p>
              </div>
            </div>
          </div>
        ) : null}

        {tab === "compare" ? (
          <div
            id="tg-panel-compare"
            role="tabpanel"
            aria-labelledby="tg-tab-compare"
            className="tg-modes__panel"
          >
            <div className="tg-modes__table-wrap">
              <table className="tg-modes__table">
                <thead>
                  <tr>
                    <th scope="col">
                      <span className="sr-only">{t("tabs.compare")}</span>
                    </th>
                    <th scope="col">
                      <span className="tg-modes__col-label">
                        <BotIcon className="h-3.5 w-3.5" aria-hidden />
                        {t("tabs.bot")}
                      </span>
                    </th>
                    <th scope="col">
                      <span className="tg-modes__col-label">
                        <UsersIcon className="h-3.5 w-3.5" aria-hidden />
                        {t("tabs.personal")}
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row) => (
                    <tr key={row.label}>
                      <th scope="row">{row.label}</th>
                      <td>
                        <CompareValue
                          cell={row.bot}
                          yesLabel={t("yesLabel")}
                        />
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
        ) : null}

        <div className="tg-modes__pick">
          <h3>{t("pick.title")}</h3>
          <div className="tg-modes__pick-grid">
            <a className="tg-modes__pick-card" href={t("pick.bot.href")}>
              <p>{t("pick.bot.title")}</p>
              <strong>{t("pick.bot.result")}</strong>
            </a>
            <a className="tg-modes__pick-card" href={t("pick.personal.href")}>
              <p>{t("pick.personal.title")}</p>
              <strong>{t("pick.personal.result")}</strong>
            </a>
            <div className="tg-modes__pick-card is-static">
              <p>{t("pick.both.title")}</p>
              <span>{t("pick.both.body")}</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
