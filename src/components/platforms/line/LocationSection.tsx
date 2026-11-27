import Image from "next/image";
import {
  CheckIcon,
  MapPinIcon,
  NavigationIcon,
  SendIcon,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";

const FEATURES = [
  { id: "ask", icon: SendIcon },
  { id: "tap", icon: NavigationIcon },
  { id: "pin", icon: MapPinIcon },
] as const;

export async function LocationSection() {
  const t = await getTranslations("PlatformLine.location");

  return (
    <section
      id="location"
      className="wa-interactive ln-location border-t border-line"
      aria-labelledby="ln-location-title"
    >
      <Container className="section">
        <header className="wa-interactive__header">
          <div>
            <p className="wa-section-label">
              <MapPinIcon aria-hidden="true" />
              {t("eyebrow")}
            </p>
            <h2
              id="ln-location-title"
              className="heading-section mt-3 text-balance"
            >
              {t("title")}
            </h2>
          </div>
          <div>
            <p className="text-body text-pretty">{t("subtitle")}</p>
          </div>
        </header>

        <div className="wa-interactive__grid ln-location__grid">
          {FEATURES.map(({ id, icon: Icon }) => (
            <article key={id} className="wa-interactive__card">
              <header className="wa-interactive__card-header">
                <span className="wa-interactive__icon" aria-hidden="true">
                  <Icon />
                </span>
                <div>
                  <h3>{t(`tabs.${id}`)}</h3>
                  <p>{t(`cards.${id}`)}</p>
                </div>
              </header>

              <div className="wa-interactive__preview">
                <p className="wa-interactive__preview-label">{t("preview")}</p>

                {id === "ask" && (
                  <>
                    <p className="wa-interactive__message">
                      {t("demo.askAgent")}
                    </p>
                    <ul className="wa-interactive__choices">
                      <li data-selected>
                        <MapPinIcon aria-hidden="true" />
                        {t("demo.askRequest")}
                      </li>
                      <li>{t("demo.askQuick")}</li>
                    </ul>
                    <p className="wa-interactive__result">
                      {t("ask.follow")}
                    </p>
                  </>
                )}

                {id === "tap" && (
                  <>
                    <p className="wa-interactive__message">
                      {t("demo.tapTitle")}
                    </p>
                    <div className="wa-interactive__tracking ln-location__map">
                      <div className="ln-map-art" aria-hidden />
                      <p className="wa-interactive__product-name">
                        <CheckIcon aria-hidden="true" />
                        {t("demo.tapPlace")}
                      </p>
                      <p className="ln-location__map-address">
                        {t("demo.tapAddress")}
                      </p>
                      <ul className="wa-interactive__choices">
                        <li data-selected>{t("demo.tapSend")}</li>
                      </ul>
                    </div>
                  </>
                )}

                {id === "pin" && (
                  <div className="wa-interactive__tracking">
                    <div className="ln-location__pin-shot">
                      <div className="ln-map-art ln-map-art--bubble" aria-hidden />
                    </div>
                    <p className="wa-interactive__message">
                      {t("demo.pinTitle")}
                    </p>
                    <p className="ln-location__map-address">
                      {t("demo.pinAddress")}
                    </p>
                    <div className="wa-interactive__destination">
                      <span
                        className="wa-interactive__target-icon"
                        aria-hidden="true"
                      >
                        <MapPinIcon />
                      </span>
                      <div>
                        <p>{t("pin.previewTitle")}</p>
                        <p>{t("accountName")}</p>
                      </div>
                      <Image
                        src="/icons/platforms/line.png"
                        alt=""
                        width={18}
                        height={18}
                        className="h-[18px] w-[18px]"
                        unoptimized
                      />
                    </div>
                    <p className="wa-interactive__result">{t("pin.follow")}</p>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
