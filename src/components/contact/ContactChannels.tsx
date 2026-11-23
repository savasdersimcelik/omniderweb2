import { ArrowUpRight } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { PlatformIcon } from "@/components/ui/PlatformIcon";
import { contactChannels } from "@/config/contact";
import { getSocialLinks } from "@/config/social";

export async function ContactChannels() {
  const locale = await getLocale();
  const t = await getTranslations("ContactPage.channels");

  const hrefByLabel = Object.fromEntries(
    getSocialLinks(locale).map((link) => [link.label, link.href]),
  ) as Record<string, string>;

  return (
    <div className="contact-channels">
      <div className="contact-channels__head">
        <p className="contact-channels__eyebrow">{t("eyebrow")}</p>
        <h2 className="contact-channels__title">{t("title")}</h2>
        <p className="contact-channels__subtitle">{t("subtitle")}</p>
      </div>

      <ul className="contact-channels__list">
        {contactChannels.map((channel) => {
          const href = hrefByLabel[channel.hrefKey];
          if (!href) return null;

          return (
            <li key={channel.id}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`contact-channel contact-channel--${channel.id}`}
              >
                <span className="contact-channel__icon">
                  <PlatformIcon name={channel.icon} size={22} />
                </span>
                <span className="contact-channel__copy">
                  <strong>{t(`items.${channel.id}.name`)}</strong>
                  <span>{t(`items.${channel.id}.desc`)}</span>
                </span>
                <ArrowUpRight
                  className="contact-channel__arrow"
                  aria-hidden
                />
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
