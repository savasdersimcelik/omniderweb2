import { CheckIcon, QrCodeIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";

export async function ConnectSection() {
  const t = await getTranslations("PlatformTelegram.connect");
  const steps = t.raw("steps") as string[];
  const features = t.raw("features") as string[];

  return (
    <section
      id="connect"
      className="tg-connect border-t border-line"
      aria-labelledby="tg-connect-title"
    >
      <Container className="section">
        <header className="mx-auto max-w-3xl text-center">
          <p className="eyebrow inline-flex items-center justify-center gap-2 text-[var(--color-telegram)]">
            <QrCodeIcon className="h-3.5 w-3.5" />
            {t("eyebrow")}
          </p>
          <h2 id="tg-connect-title" className="heading-section mt-3 text-balance">
            {t("title")}
          </h2>
          <p className="tg-lede text-body mt-4">{t("subtitle")}</p>
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

          <div className="tg-connect__widget">
            <header className="tg-connect__widget-head">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-ink">
                  {t("widget.channel")}
                </p>
                <p className="truncate text-[11px] text-ink-faint">
                  {t("widget.waiting")}
                </p>
              </div>
              <span className="tg-connect__status">{t("widget.status")}</span>
            </header>

            <div className="tg-connect__qr">
              <div className="tg-connect__qr-frame">
                <div className="grid h-32 w-32 grid-cols-5 gap-1 p-2" aria-hidden>
                  {Array.from({ length: 25 }).map((_, i) => (
                    <span
                      key={i}
                      className={cn(
                        "rounded-[2px]",
                        [
                          0, 1, 2, 4, 5, 6, 8, 10, 12, 14, 16, 18, 20, 22, 23,
                          24,
                        ].includes(i)
                          ? "bg-[var(--color-telegram)]"
                          : "bg-slate-100",
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="tg-connect__widget-foot">
              <div className="tg-modes__bar" aria-hidden>
                <i />
              </div>
              <p className="tg-modes__progress">{t("widget.progress")}</p>
              <p className="tg-modes__echo">{t("widget.echo")}</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
