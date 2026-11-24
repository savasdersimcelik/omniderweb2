import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";

export async function MidCtaSection() {
  const t = await getTranslations("PlatformWhatsAppBusiness.midCta");

  return (
    <section
      id="mid-cta"
      className="wa-mid-cta border-t border-line"
      aria-labelledby="wa-mid-cta-title"
    >
      <Container className="section">
        <div className="wa-mid-cta__shell">
          <div className="wa-mid-cta__panel">
            <h2 id="wa-mid-cta-title" className="wa-mid-cta__title">
              <span>{t("line1")}</span>
              <strong>{t("strong")}</strong>
            </h2>
          </div>

          <div className="wa-mid-cta__corner" aria-hidden>
            <span className="wa-mid-cta__badge">
              <Image
                src="/icons/platforms/whatsapp-business.png"
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
            className="wa-mid-cta__woman"
            aria-hidden
          />
        </div>
      </Container>
    </section>
  );
}
