import { getLocale, getTranslations } from "next-intl/server";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { ContactChannels } from "@/components/contact/ContactChannels";
import { ContactDirect } from "@/components/contact/ContactDirect";
import { ContactForm } from "@/components/contact/ContactForm";
import "@/components/contact/contact.css";
import { Container } from "@/components/layout/Container";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata() {
  const locale = (await getLocale()) as Locale;

  return buildPageMetadata({
    pageKey: "contact",
    pathname: "/contact",
    locale,
  });
}

export default async function ContactPage() {
  const t = await getTranslations("ContactPage");
  const highlights = t.raw("highlights") as string[];

  return (
    <div className="contact-page">
      <section className="contact-hero" aria-labelledby="contact-hero-title">
        <Container className="contact-hero__inner">
          <div className="contact-hero__copy">
            <p className="contact-hero__brand">Omnider</p>
            <p className="contact-hero__eyebrow">
              <Sparkles className="size-3.5" aria-hidden />
              {t("eyebrow")}
            </p>
            <h1 id="contact-hero-title" className="contact-hero__title">
              <span>{t("titleLead")}</span>{" "}
              <span className="contact-hero__title-accent">{t("titleAccent")}</span>
            </h1>
            <p className="contact-hero__desc">{t("description")}</p>

            <ul className="contact-hero__highlights">
              {highlights.map((item) => (
                <li key={item}>
                  <CheckCircle2 className="size-4" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="contact-hero__actions">
              <a href="#contact-form" className="btn-primary">
                {t("ctaPrimary")}
                <ArrowRight className="size-4" aria-hidden />
              </a>
              <Link href="/register" className="btn-secondary">
                {t("ctaSecondary")}
              </Link>
            </div>
          </div>

          <aside className="contact-hero__signal" aria-hidden="true">
            <div className="contact-hero__signal-card">
              <div className="contact-hero__signal-bar">
                <span className="contact-hero__signal-dot" />
                <span>{t("signal.live")}</span>
              </div>
              <p className="contact-hero__signal-title">{t("signal.title")}</p>
              <p className="contact-hero__signal-body">{t("signal.body")}</p>
              <div className="contact-hero__signal-meta">
                <span>{t("signal.eta")}</span>
                <strong>{t("signal.etaValue")}</strong>
              </div>
            </div>
          </aside>
        </Container>
      </section>

      <section
        id="contact-form"
        className="contact-main"
        aria-labelledby="contact-form-title"
      >
        <Container className="contact-main__inner">
          <div className="contact-main__form-wrap">
            <div className="contact-main__form-head">
              <p className="contact-main__eyebrow">{t("form.eyebrow")}</p>
              <h2 id="contact-form-title" className="contact-main__title">
                {t("form.title")}
              </h2>
              <p className="contact-main__subtitle">{t("form.subtitle")}</p>
            </div>
            <ContactForm />
          </div>

          <div className="contact-main__aside">
            <ContactDirect />
            <ContactChannels />
          </div>
        </Container>
      </section>
    </div>
  );
}
