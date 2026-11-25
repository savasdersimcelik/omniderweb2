import Image from "next/image";
import { MapPinIcon, NavigationIcon, SendIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";

const COLUMNS = [
  { id: "ask" as const, Icon: SendIcon },
  { id: "tap" as const, Icon: NavigationIcon },
  { id: "pin" as const, Icon: MapPinIcon },
] as const;

type Step = {
  id: (typeof COLUMNS)[number]["id"];
  title: string;
  body: string;
};

export async function LocationSection() {
  const t = await getTranslations("PlatformLine.location");
  const steps = t.raw("steps") as Step[];

  return (
    <section
      id="location"
      className="ln-location border-t border-line"
      aria-labelledby="ln-location-title"
    >
      <Container className="section">
        <div className="wa-section-stack">
          <header className="mx-auto max-w-3xl text-center">
            <p className="eyebrow inline-flex items-center justify-center gap-2 text-[var(--ln-hero-deep)]">
              <MapPinIcon className="h-3.5 w-3.5" />
              {t("eyebrow")}
            </p>
            <h2 id="ln-location-title" className="heading-section mt-3">
              {t("title")}
            </h2>
            <p className="ln-interactive__subtitle text-body mt-4">
              {t("subtitle")}
            </p>
          </header>

          <div className="ln-location__cols">
            {COLUMNS.map(({ id, Icon }) => {
              const step = steps.find((item) => item.id === id) ?? steps[0];

              return (
                <article key={id} className="ms-interactive__col">
                  <div className="ms-interactive__col-copy">
                    <div className="ms-interactive__col-heading">
                      <span className="ms-interactive__col-icon">
                        <Icon className="h-4 w-4" />
                      </span>
                      <h3 className="ms-interactive__col-title">
                        {step.title}
                      </h3>
                    </div>
                    <p className="ms-interactive__col-desc">{step.body}</p>
                  </div>

                  <div className="ms-interactive__widget ln-location__widget">
                    {id === "ask" ? (
                      <div className="ln-phone ln-phone--compact">
                        <header className="ln-phone__top">
                          <Image
                            src="/icons/platforms/line.png"
                            alt=""
                            width={20}
                            height={20}
                            className="h-5 w-5"
                            unoptimized
                          />
                          <span className="min-w-0">
                            <strong>{t("accountName")}</strong>
                            <small>{t("accountStatus")}</small>
                          </span>
                        </header>
                        <div className="ln-phone__chat ln-phone__chat--loc">
                          <p className="ln-bubble ln-bubble--oa">
                            {t("demo.askAgent")}
                          </p>
                          <span className="ln-quick ln-quick--pin">
                            <MapPinIcon className="h-3.5 w-3.5" aria-hidden />
                            {t("demo.askQuick")}
                          </span>
                        </div>
                      </div>
                    ) : null}

                    {id === "tap" ? (
                      <div className="ln-map-picker">
                        <header>
                          <strong>{t("demo.tapTitle")}</strong>
                        </header>
                        <div className="ln-map-art" aria-hidden />
                        <div className="ln-map-sheet">
                          <strong>{t("demo.tapPlace")}</strong>
                          <span>{t("demo.tapAddress")}</span>
                          <b>{t("demo.tapSend")}</b>
                        </div>
                      </div>
                    ) : null}

                    {id === "pin" ? (
                      <div className="ln-phone ln-phone--compact">
                        <header className="ln-phone__top">
                          <Image
                            src="/icons/platforms/line.png"
                            alt=""
                            width={20}
                            height={20}
                            className="h-5 w-5"
                            unoptimized
                          />
                          <span className="min-w-0">
                            <strong>{t("accountName")}</strong>
                            <small>{t("accountStatus")}</small>
                          </span>
                        </header>
                        <article className="ln-loc-bubble">
                          <div
                            className="ln-map-art ln-map-art--bubble"
                            aria-hidden
                          />
                          <p>
                            <strong>{t("demo.pinTitle")}</strong>
                            <span>{t("demo.pinAddress")}</span>
                          </p>
                        </article>
                      </div>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}