import { BotIcon, SparklesIcon, UsersIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";

const ICONS = [UsersIcon, SparklesIcon, BotIcon];

export async function TeamSection() {
  const t = await getTranslations("PlatformLine.team");
  const items = t.raw("items") as Array<{ title: string; body: string }>;

  return (
    <section
      id="team"
      className="tg-team border-t border-line"
      aria-labelledby="ln-team-title"
    >
      <Container className="section">
        <header className="mx-auto max-w-3xl text-center">
          <p className="eyebrow inline-flex items-center justify-center gap-2 text-[var(--ln-hero-deep)]">
            <UsersIcon className="h-3.5 w-3.5" />
            {t("eyebrow")}
          </p>
          <h2 id="ln-team-title" className="heading-section mt-3 text-balance">
            {t("title")}
          </h2>
          <p className="ln-lede text-body mt-4">{t("subtitle")}</p>
        </header>

        <ul className="tg-team__grid mt-10">
          {items.map((item, index) => {
            const Icon = ICONS[index] ?? UsersIcon;
            return (
              <li key={item.title}>
                <article className="tg-team__card ln-team__card">
                  <span className="ln-interactive__ico" aria-hidden>
                    <Icon className="h-4 w-4" />
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}