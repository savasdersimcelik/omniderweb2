import { Clock3, Mail, Phone } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { contactDetails } from "@/config/contact";

export async function ContactDirect() {
  const t = await getTranslations("ContactPage.info");
  const telHref = `tel:${contactDetails.phone.replace(/[^\d+]/g, "")}`;

  return (
    <div className="contact-direct">
      <p className="contact-direct__eyebrow">{t("eyebrow")}</p>
      <h2 className="contact-direct__title">{t("title")}</h2>
      <p className="contact-direct__subtitle">{t("subtitle")}</p>

      <ul className="contact-direct__list">
        <li>
          <a href={`mailto:${contactDetails.email}`} className="contact-direct__item">
            <span className="contact-direct__icon contact-direct__icon--mail">
              <Mail className="size-5" aria-hidden />
            </span>
            <span>
              <span className="contact-direct__label">{t("email.label")}</span>
              <span className="contact-direct__value">{contactDetails.email}</span>
              <span className="contact-direct__hint">{t("email.hint")}</span>
            </span>
          </a>
        </li>

        <li>
          <a href={telHref} className="contact-direct__item">
            <span className="contact-direct__icon contact-direct__icon--phone">
              <Phone className="size-5" aria-hidden />
            </span>
            <span>
              <span className="contact-direct__label">{t("phone.label")}</span>
              <span className="contact-direct__value">
                {contactDetails.phoneDisplay}
              </span>
              <span className="contact-direct__hint">{t("phone.hint")}</span>
            </span>
          </a>
        </li>

        <li>
          <div className="contact-direct__item contact-direct__item--static">
            <span className="contact-direct__icon contact-direct__icon--hours">
              <Clock3 className="size-5" aria-hidden />
            </span>
            <span>
              <span className="contact-direct__label">{t("hours.label")}</span>
              <span className="contact-direct__value">{t("hours.value")}</span>
              <span className="contact-direct__hint">{t("hours.hint")}</span>
            </span>
          </div>
        </li>
      </ul>
    </div>
  );
}
