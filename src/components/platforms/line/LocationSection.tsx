"use client";

import { useState } from "react";
import { CheckIcon, MapPinIcon } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";

type StepId = "ask" | "tap" | "pin";

type Step = {
  id: StepId;
  chip: string;
  title: string;
  body: string;
};

export function LocationSection() {
  const t = useTranslations("PlatformLine.location");
  const [step, setStep] = useState<StepId>("ask");
  const steps = t.raw("steps") as Step[];
  const features = t.raw("features") as string[];
  const active = steps.find((item) => item.id === step) ?? steps[0];

  return (
    <section
      id="location"
      className="ln-loc border-t border-line"
      aria-labelledby="ln-loc-title"
    >
      <Container className="section">
        <header className="mx-auto max-w-3xl text-center">
          <p className="eyebrow inline-flex items-center justify-center gap-2 text-[var(--ln-hero-deep)]">
            <MapPinIcon className="h-3.5 w-3.5" />
            {t("eyebrow")}
          </p>
          <h2 id="ln-loc-title" className="heading-section mt-3 text-balance">
            {t("title")}
          </h2>
          <p className="ln-lede text-body mt-4">{t("subtitle")}</p>
        </header>

        <div
          className="ln-loc__tabs mt-10"
          role="tablist"
          aria-label={t("stepsLabel")}
        >
          {steps.map((item, index) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`ln-loc-tab-${item.id}`}
              aria-selected={step === item.id}
              aria-controls={`ln-loc-panel-${item.id}`}
              tabIndex={step === item.id ? 0 : -1}
              className={cn("ln-loc__tab", step === item.id && "is-on")}
              onClick={() => setStep(item.id)}
            >
              <span className="ln-loc__tab-num" aria-hidden>
                {index + 1}
              </span>
              <span className="ln-loc__tab-label">{item.chip}</span>
            </button>
          ))}
        </div>

        <div className="ln-loc__layout mt-8">
          <div className="ln-loc__stage">
            <p className="ln-loc__demo">{t("demoNote")}</p>

            {steps.map((item) =>
              step !== item.id ? null : (
                <div
                  key={item.id}
                  id={`ln-loc-panel-${item.id}`}
                  role="tabpanel"
                  aria-labelledby={`ln-loc-tab-${item.id}`}
                  className="ln-loc__frame"
                >
                  <div className="ln-loc__preview">
                    <p className="ln-loc__preview-tag">LINE</p>
                    <div className="ln-phone ln-phone--loc">
                      {item.id === "ask" ? (
                        <>
                          <header className="ln-phone__top">
                            <Image
                              src="/icons/platforms/line.png"
                              alt=""
                              width={20}
                              height={20}
                              unoptimized
                            />
                            <span>
                              <strong>{t("accountName")}</strong>
                              <small>{t("accountStatus")}</small>
                            </span>
                          </header>
                          <div className="ln-phone__chat ln-phone__chat--loc">
                            <p className="ln-bubble ln-bubble--oa">
                              {t("demo.askAgent")}
                            </p>
                            <div className="ln-quick ln-quick--pin">
                              <MapPinIcon className="h-3.5 w-3.5" aria-hidden />
                              {t("demo.askQuick")}
                            </div>
                          </div>
                        </>
                      ) : null}

                      {item.id === "tap" ? (
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

                      {item.id === "pin" ? (
                        <>
                          <header className="ln-phone__top">
                            <Image
                              src="/icons/platforms/line.png"
                              alt=""
                              width={20}
                              height={20}
                              unoptimized
                            />
                            <span>
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
                        </>
                      ) : null}
                    </div>
                  </div>

                  <div className="ln-loc__preview ln-loc__preview--panel">
                    <p className="ln-loc__preview-tag">{t("panelLabel")}</p>
                    <div className="ln-loc-panel ln-loc-panel--compact">
                      {item.id === "ask" ? (
                        <article className="ln-loc-panel__card">
                          <p className="ln-loc-panel__draft">
                            {t("demo.askAgent")}
                          </p>
                          <span className="ln-loc-panel__request">
                            <MapPinIcon className="h-3.5 w-3.5" aria-hidden />
                            {t("demo.askRequest")}
                          </span>
                        </article>
                      ) : null}
                      {item.id === "tap" ? (
                        <article className="ln-loc-panel__card">
                          <p className="ln-loc-panel__thread">
                            <strong>{t("demo.listName")}</strong>
                            <em>📍 {t("demo.tapPreview")}</em>
                            <time dateTime="14:21">{t("demo.time")}</time>
                          </p>
                          <div className="ln-map-art ln-map-art--sm" aria-hidden />
                          <div className="ln-loc-panel__place">
                            <strong>{t("demo.tapPlace")}</strong>
                            <span>{t("demo.tapAddress")}</span>
                          </div>
                        </article>
                      ) : null}
                      {item.id === "pin" ? (
                        <article className="ln-loc-panel__card">
                          <p className="ln-loc-panel__field">
                            <small>{t("demo.pinTitle")}</small>
                            <b>{t("demo.pinAddress")}</b>
                          </p>
                        </article>
                      ) : null}
                    </div>
                  </div>
                </div>
              ),
            )}
          </div>

          <div className="ln-loc__copy">
            <p className="ln-loc__demo ln-loc__demo--align" aria-hidden>
              {t("demoNote")}
            </p>

            {active ? (
              <article className="ln-loc__active" key={active.id}>
                <p className="ln-loc__active-kicker">
                  <span className="ln-loc__active-num" aria-hidden>
                    {steps.findIndex((s) => s.id === active.id) + 1}
                  </span>
                  {active.chip}
                </p>
                <h3 className="ln-loc__active-title">{active.title}</h3>
                <p className="ln-loc__active-body">{active.body}</p>
              </article>
            ) : null}

            <ul className="ln-features ln-features--loc">
              {features.map((feature) => (
                <li key={feature}>
                  <span className="ln-features__check" aria-hidden>
                    <CheckIcon className="h-3.5 w-3.5" />
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}