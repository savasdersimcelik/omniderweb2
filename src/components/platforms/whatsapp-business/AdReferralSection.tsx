import {
  ChartNoAxesColumnIcon,
  ContactIcon,
  ImageIcon,
  MegaphoneIcon,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";
import { AdReferralWidget } from "./AdReferralWidget";

const ITEMS = [
  { key: "card", Icon: ImageIcon },
  { key: "utm", Icon: ChartNoAxesColumnIcon },
  { key: "contact", Icon: ContactIcon },
] as const;

export async function AdReferralSection() {
  const t = await getTranslations("PlatformWhatsAppBusiness.adReferral");

  return (
    <section
      id="ad-referral"
      className="wa-ad-referral border-t border-line"
      aria-labelledby="wa-ad-referral-title"
    >
      <Container className="section">
        <div className="wa-section-stack">
          <header className="mx-auto max-w-3xl text-center">
            <p className="eyebrow inline-flex items-center gap-2 text-[var(--wa-teal)]">
              <MegaphoneIcon className="h-3.5 w-3.5" />
              {t("eyebrow")}
            </p>
            <h2 id="wa-ad-referral-title" className="heading-section mt-3">
              {t("title")}
            </h2>
            <p className="text-body mt-4">{t("lead")}</p>
            <p className="mt-3 text-sm text-ink-subtle">{t("note")}</p>
          </header>

          <ul className="mx-auto mt-8 grid max-w-4xl gap-4 sm:grid-cols-3">
            {ITEMS.map(({ key, Icon }) => (
              <li
                key={key}
                className="rounded-2xl bg-white px-4 py-4 ring-1 ring-line"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[color-mix(in_srgb,var(--wa-green)_12%,white)] text-[var(--wa-teal)]">
                  <Icon className="h-4 w-4" />
                </span>
                <h3 className="mt-3 text-sm font-semibold text-ink">
                  {t(`items.${key}.title`)}
                </h3>
                <p className="mt-1 text-xs leading-5 text-ink-subtle">
                  {t(`items.${key}.body`)}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <AdReferralWidget />
          </div>

          <p className="mt-6 text-center text-xs text-ink-faint">{t("footnote")}</p>
        </div>
      </Container>
    </section>
  );
}
