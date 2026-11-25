import { CheckIcon, Link2Icon } from "lucide-react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";

type Field = { label: string; value: string };

export async function ConnectSection() {
  const t = await getTranslations("PlatformLine.connect");
  const steps = t.raw("steps") as string[];
  const features = t.raw("features") as string[];
  const fields = t.raw("widget.fields") as Field[];

  return (
    <section
      id="connect"
      className="ln-connect tg-connect border-t border-line"
      aria-labelledby="ln-connect-title"
    >
      <Container className="section">
        <header className="mx-auto max-w-3xl text-center">
          <p className="eyebrow inline-flex items-center justify-center gap-2 text-[var(--ln-hero-deep)]">
            <Link2Icon className="h-3.5 w-3.5" />
            {t("eyebrow")}
          </p>
          <h2 id="ln-connect-title" className="heading-section mt-3 text-balance">
            {t("title")}
          </h2>
          <p className="ln-lede text-body mt-4">{t("subtitle")}</p>
        </header>

        <div className="tg-connect__layout mt-12">
          <div className="tg-connect__copy">
            <h3>{t("stepsLabel")}</h3>
            <ol className="tg-modes__steps">
              {steps.map((step, index) => (
                <li key={step}>
                  <span aria-hidden>{index + 1}</span>
                  <p>{step}</p>
                </li>
              ))}
            </ol>
            <ul className="tg-modes__features">
              {features.map((feature) => (
                <li key={feature}>
                  <span className="tg-modes__check" aria-hidden>
                    <CheckIcon className="h-3.5 w-3.5" />
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <p className="tg-modes__note" role="note">
              {t("note")}
            </p>
          </div>

          <div className="tg-connect__widget ln-connect__widget">
            <article className="ln-console">
              <header>
                <Image
                  src="/icons/platforms/line.png"
                  alt=""
                  width={22}
                  height={22}
                  className="h-[1.35rem] w-[1.35rem]"
                  unoptimized
                />
                {t("widget.title")}
              </header>
              <ul>
                {fields.map((field) => (
                  <li key={field.label}>
                    <span>{field.label}</span>
                    <b>{field.value}</b>
                  </li>
                ))}
              </ul>
              <p className="ln-console__check">{t("widget.check")}</p>
              <div className="ln-console__bot">
                <Image
                  src="/icon.png"
                  alt=""
                  width={28}
                  height={28}
                  className="h-7 w-7 rounded-md"
                  unoptimized
                />
                <strong>{t("widget.botName")}</strong>
                <em>{t("widget.status")}</em>
              </div>
              <p className="ln-console__hook">
                <CheckIcon className="h-3.5 w-3.5 text-[var(--ln-hero)]" />
                {t("widget.webhook")}
              </p>
            </article>
          </div>
        </div>
      </Container>
    </section>
  );
}