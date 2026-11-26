import { getTranslations } from "next-intl/server";
import { ContactIcon, UserPlusIcon } from "lucide-react";
import { Container } from "@/components/layout/Container";

export async function SharedContactsSection() {
  const t = await getTranslations("PlatformWhatsAppPersonal.sharedContacts");
  const items = t.raw("items") as string[];
  const multi = t.raw("demo.multi") as string[];

  return (
    <section
      id="shared-contacts"
      className="wap-contacts border-t border-line"
      aria-labelledby="wap-contacts-title"
    >
      <Container className="section">
        <div className="wa-section-aside">
          <div className="wa-section-copy">
            <p className="eyebrow inline-flex items-center gap-2 text-[var(--wa-teal)]">
              <ContactIcon className="h-3.5 w-3.5" />
              {t("eyebrow")}
            </p>
            <h2 id="wap-contacts-title" className="heading-section mt-3">
              {t("title")}
            </h2>
            <p className="text-body mt-4">{t("subtitle")}</p>
            <ul className="mt-8 space-y-4">
              {items.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6 text-ink-subtle">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[color-mix(in_srgb,var(--wa-green)_12%,white)] text-[var(--wa-teal)] ring-1 ring-[color-mix(in_srgb,var(--wa-green)_25%,transparent)]">
                    <UserPlusIcon className="h-4 w-4" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="wap-contacts__widget">
            <header className="border-b border-line px-4 py-3">
              <p className="text-sm font-semibold text-ink">
                {t("demo.chatTitle")}
              </p>
            </header>
            <div className="space-y-3 p-4">
              <p className="max-w-[90%] rounded-2xl rounded-bl-md bg-white px-3 py-2 text-sm text-ink ring-1 ring-line">
                {t("demo.customer")}
              </p>

              <article className="rounded-2xl bg-white p-3 ring-1 ring-line">
                <span className="inline-flex rounded-full bg-[color-mix(in_srgb,var(--wa-green)_12%,white)] px-2 py-0.5 text-[10px] font-bold text-[var(--wa-teal)]">
                  {t("demo.badge")}
                </span>
                <p className="mt-2 text-sm font-semibold text-ink">
                  {t("demo.contactName")}
                </p>
                <dl className="mt-2 space-y-1 text-xs text-ink-subtle">
                  <div className="flex justify-between gap-3">
                    <dt>{t("demo.fields.phone")}</dt>
                    <dd className="font-semibold text-ink">
                      {t("demo.contactPhone")}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt>{t("demo.fields.email")}</dt>
                    <dd className="font-semibold text-ink">
                      {t("demo.contactEmail")}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt>{t("demo.fields.channel")}</dt>
                    <dd className="font-semibold text-ink">
                      {t("demo.channel")}
                    </dd>
                  </div>
                </dl>
              </article>

              <div className="wap-contacts__summary rounded-2xl p-3 ring-1 ring-line">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-ink">
                    {t("demo.listTitle")}
                  </p>
                  <span className="text-[11px] font-bold text-[var(--wa-teal)]">
                    {t("demo.multiLabel")}
                  </span>
                </div>
                <ul className="mt-3 space-y-2">
                  {multi.map((name) => (
                    <li
                      key={name}
                      className="flex items-center justify-between rounded-xl bg-white px-3 py-2 ring-1 ring-line"
                    >
                      <span className="text-sm font-semibold text-ink">
                        {name}
                      </span>
                      <span className="rounded-full bg-[color-mix(in_srgb,var(--wa-green)_12%,white)] px-2 py-0.5 text-[10px] font-bold text-[var(--wa-teal)]">
                        {t("demo.newBadge")}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
