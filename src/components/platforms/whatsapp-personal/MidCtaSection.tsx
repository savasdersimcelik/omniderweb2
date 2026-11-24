import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { DemoRequestButton } from "@/components/demo";
import { Container } from "@/components/layout/Container";
import { Link } from "@/i18n/navigation";

export async function MidCtaSection() {
  const t = await getTranslations("PlatformWhatsAppPersonal.midCta");

  return (
    <section
      id="mid-cta"
      className="wap-mid-cta border-t border-line"
      aria-labelledby="wap-mid-cta-title"
    >
      <Container className="section">
        <div className="wap-mid-cta__shell">
          <div className="wap-mid-cta__panel">
            <div className="wap-mid-cta__copy">
              <h2 id="wap-mid-cta-title" className="wap-mid-cta__title">
                <span>{t("line1")}</span>
                <strong>{t("strong")}</strong>
              </h2>
              <div className="wap-mid-cta__actions">
                <DemoRequestButton
                  source="whatsapp-personal-mid-cta"
                  className="wap-mid-cta__btn wap-mid-cta__btn--demo"
                >
                  {t("demo")}
                </DemoRequestButton>
                <Link
                  href="/register"
                  id="cta-register"
                  className="wap-mid-cta__btn wap-mid-cta__btn--start"
                >
                  {t("start")}
                </Link>
              </div>
            </div>
          </div>

          <div className="wap-mid-cta__corner" aria-hidden>
            <span className="wap-mid-cta__badge">
              <Image
                src="/icons/platforms/whatsapp-personal.png"
                alt=""
                width={36}
                height={36}
                className="h-9 w-9 object-contain"
                unoptimized
              />
            </span>
          </div>

          <Image
            src="/images/platforms/whatsapp/mid-cta-woman.png"
            alt=""
            width={420}
            height={720}
            className="wap-mid-cta__woman"
            aria-hidden
          />
        </div>
      </Container>
    </section>
  );
}
