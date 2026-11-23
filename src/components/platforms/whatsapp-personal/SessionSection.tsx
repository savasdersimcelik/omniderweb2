import {
  RefreshCwIcon,
  ShieldAlertIcon,
  WifiIcon,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";
import { Link } from "@/i18n/navigation";

const ITEMS = [
  { key: "status", Icon: WifiIcon },
  { key: "rescan", Icon: RefreshCwIcon },
  { key: "blocked", Icon: ShieldAlertIcon },
] as const;

export async function SessionSection() {
  const t = await getTranslations("PlatformWhatsAppPersonal.session");

  return (
    <section
      id="session"
      className="wap-session border-t border-line"
      aria-labelledby="wap-session-title"
    >
      <Container className="section">
        <div className="wa-section-aside">
          <div className="wa-section-copy">
            <p className="eyebrow inline-flex items-center gap-2 text-[var(--wa-teal)]">
              <WifiIcon className="h-3.5 w-3.5" />
              {t("eyebrow")}
            </p>
            <h2 id="wap-session-title" className="heading-section mt-3">
              {t("title")}
            </h2>
            <p className="text-body mt-4">{t("subtitle")}</p>
            <ul className="mt-8 space-y-5">
              {ITEMS.map(({ key, Icon }) => (
                <li key={key} className="flex gap-3">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[color-mix(in_srgb,var(--wa-green)_12%,white)] text-[var(--wa-teal)] ring-1 ring-[color-mix(in_srgb,var(--wa-green)_25%,transparent)]">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-ink">
                      {t(`items.${key}.title`)}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-ink-subtle">
                      {t(`items.${key}.body`)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs leading-5 text-ink-faint">
              {t("riskNote")}{" "}
              <Link
                href="/platforms/whatsapp-business"
                className="font-semibold text-[var(--wa-teal)] underline-offset-2 hover:underline"
              >
                WhatsApp Business API
              </Link>
            </p>
          </div>

          <div className="wap-session__widget">
            <header className="flex items-center justify-between border-b border-line px-4 py-3">
              <p className="text-sm font-semibold text-ink">
                {t("widget.channel")}
              </p>
              <span className="rounded-full bg-[color-mix(in_srgb,var(--wa-green)_14%,white)] px-2.5 py-1 text-[11px] font-bold text-[var(--wa-teal)]">
                {t("widget.linked")}
              </span>
            </header>
            <div className="space-y-3 p-4">
              <div className="rounded-xl bg-surface-subtle/80 px-3 py-3 ring-1 ring-line">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold text-ink">
                    {t("widget.linked")}
                  </span>
                  <span className="h-2.5 w-2.5 rounded-full bg-[var(--wa-green)]" />
                </div>
                <button
                  type="button"
                  className="mt-3 w-full rounded-lg bg-white px-3 py-2 text-xs font-semibold text-ink ring-1 ring-line"
                >
                  {t("widget.check")}
                </button>
              </div>
              <div className="rounded-xl bg-white px-3 py-3 ring-1 ring-line">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold text-ink-subtle">
                    {t("widget.unlinked")}
                  </span>
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                </div>
                <button
                  type="button"
                  className="mt-3 w-full rounded-lg bg-[color-mix(in_srgb,var(--wa-green)_12%,white)] px-3 py-2 text-xs font-semibold text-[var(--wa-teal)] ring-1 ring-[color-mix(in_srgb,var(--wa-green)_28%,transparent)]"
                >
                  {t("widget.rescan")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
