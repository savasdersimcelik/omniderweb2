import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "./Container";

const COPYRIGHT_YEAR = 2026;

export async function SiteFooter() {
  const t = await getTranslations("Footer");

  return (
    <footer className="mt-auto border-t border-line bg-surface-muted">
      <Container className="py-10 lg:py-14">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm space-y-3">
            <Link href="/" className="inline-flex items-center">
              <Image
                src="/logo-horizontal.png"
                alt="Omnider"
                width={140}
                height={36}
                className="h-8 w-auto"
              />
            </Link>
            <p className="text-sm leading-6 text-ink-muted">{t("tagline")}</p>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-bold tracking-wider text-ink-faint uppercase">
              {t("company")}
            </p>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="link-brand">
                  {t("contact")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-line pt-6 text-sm text-ink-subtle">
          <p>
            © {COPYRIGHT_YEAR} Omnider. {t("rights")}
          </p>
        </div>
      </Container>
    </footer>
  );
}
