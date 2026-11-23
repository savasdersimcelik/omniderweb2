import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";
import { Link } from "@/i18n/navigation";

export async function MessagingPage() {
  const t = await getTranslations("MessagingProductPage");

  return (
    <section className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(79,70,229,0.12),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(14,165,233,0.08),transparent_50%)]"
        aria-hidden
      />
      <Container className="section relative">
        <div className="mx-auto max-w-2xl space-y-6 text-center">
          <p className="eyebrow">{t("eyebrow")}</p>
          <h1 className="heading-page">{t("title")}</h1>
          <p className="text-body mx-auto max-w-xl">{t("subtitle")}</p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link href="/register" className="btn-primary">
              {t("ctaPrimary")}
            </Link>
            <Link href="/platforms" className="btn-secondary">
              {t("ctaSecondary")}
            </Link>
          </div>
          <p className="text-sm font-semibold text-slate-500">{t("comingSoon")}</p>
        </div>
      </Container>
    </section>
  );
}
