import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";
import { NavIcon } from "@/components/layout/NavIcon";
import { navigation } from "@/config/navigation";
import { Link } from "@/i18n/navigation";

export async function PlatformsIndexPage() {
  const t = await getTranslations("PlatformsIndexPage");
  const tNav = await getTranslations("Nav");
  const platformsEntry = navigation.find((entry) => entry.key === "platforms");
  const items =
    platformsEntry?.kind === "mega" ? (platformsEntry.items ?? []) : [];

  return (
    <Container as="section" className="section">
      <header className="max-w-3xl space-y-4">
        <p className="eyebrow">{t("eyebrow")}</p>
        <h1 className="heading-page">{t("title")}</h1>
        <p className="text-body">{t("subtitle")}</p>
      </header>

      <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          const body = (
            <>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white ring-1 ring-line shadow-sm">
                <NavIcon name={item.icon} className="h-7 w-7" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-ink">
                  {tNav(`items.${item.key}`)}
                </span>
                {item.descriptionKey ? (
                  <span className="mt-0.5 block text-xs leading-5 text-ink-subtle">
                    {tNav(`items.${item.descriptionKey}`)}
                  </span>
                ) : null}
              </span>
            </>
          );

          if (item.href) {
            return (
              <li key={item.key}>
                <Link
                  href={item.href}
                  className="flex items-start gap-3 rounded-2xl px-3 py-3 ring-1 ring-line transition hover:bg-surface-subtle hover:ring-brand-100"
                >
                  {body}
                </Link>
              </li>
            );
          }

          return (
            <li
              key={item.key}
              className="flex items-start gap-3 rounded-2xl px-3 py-3 ring-1 ring-line"
            >
              {body}
            </li>
          );
        })}
      </ul>
    </Container>
  );
}
