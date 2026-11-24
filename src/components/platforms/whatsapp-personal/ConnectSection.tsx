import { CheckIcon, QrCodeIcon, SmartphoneIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";

function QrWidget({
  channel,
  waiting,
  status,
}: {
  channel: string;
  waiting: string;
  status: string;
}) {
  return (
    <div className="wap-connect__screen">
      <header className="flex items-center justify-between border-b border-line px-4 py-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-ink">{channel}</p>
          <p className="truncate text-[11px] text-ink-faint">{waiting}</p>
        </div>
        <span className="shrink-0 rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-700">
          {status}
        </span>
      </header>
      <div className="grid place-items-center p-5">
        <div className="grid aspect-square w-44 place-items-center rounded-2xl bg-white ring-1 ring-line">
          <div className="grid h-32 w-32 grid-cols-5 gap-1 p-2">
            {Array.from({ length: 25 }).map((_, i) => (
              <span
                key={i}
                className={cn(
                  "rounded-[2px]",
                  [0, 1, 2, 4, 5, 6, 8, 10, 12, 14, 16, 18, 20, 22, 23, 24].includes(
                    i,
                  )
                    ? "bg-[var(--wa-deep)]"
                    : "bg-slate-100",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CodeWidget({
  channel,
  waiting,
  status,
  codeLabel,
  codeValue,
  phoneMask,
}: {
  channel: string;
  waiting: string;
  status: string;
  codeLabel: string;
  codeValue: string;
  phoneMask: string;
}) {
  return (
    <div className="wap-connect__screen">
      <header className="flex items-center justify-between border-b border-line px-4 py-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-ink">{channel}</p>
          <p className="truncate text-[11px] text-ink-faint">{waiting}</p>
        </div>
        <span className="shrink-0 rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-700">
          {status}
        </span>
      </header>
      <div className="space-y-3 p-4">
        <div className="rounded-2xl bg-white p-4 ring-1 ring-line">
          <p className="text-xs font-semibold text-ink-faint">{codeLabel}</p>
          <p className="mt-2 font-mono text-2xl font-bold tracking-[0.2em] text-[var(--wa-deep)]">
            {codeValue}
          </p>
          <p className="mt-3 text-sm text-ink-subtle">{phoneMask}</p>
        </div>
      </div>
    </div>
  );
}

export async function ConnectSection() {
  const t = await getTranslations("PlatformWhatsAppPersonal.connect");
  const qrSteps = t.raw("qrSteps") as string[];
  const codeSteps = t.raw("codeSteps") as string[];

  return (
    <section
      id="connect"
      className="wap-connect border-t border-line bg-surface-subtle/40"
      aria-labelledby="wap-connect-title"
    >
      <Container className="section">
        <header className="mx-auto max-w-3xl text-center">
          <p className="eyebrow inline-flex items-center justify-center gap-2 text-[var(--wa-teal)]">
            <QrCodeIcon className="h-3.5 w-3.5" />
            {t("eyebrow")}
          </p>
          <h2 id="wap-connect-title" className="heading-section mt-3">
            {t("title")}
          </h2>
          <p className="wap-connect__lede text-body mt-4">{t("subtitle")}</p>
        </header>

        <div className="wap-connect__zigzag mt-12">
          <article className="wap-connect__row">
            <div className="wap-connect__copy">
              <p className="wap-connect__badge">
                <QrCodeIcon className="h-3.5 w-3.5" />
                {t("tabs.qr")}
              </p>
              <h3 className="wap-connect__path-title">{t("paths.qr.title")}</h3>
              <p className="wap-connect__path-desc">{t("paths.qr.desc")}</p>
              <ul className="wap-connect__points">
                {qrSteps.map((step) => (
                  <li key={step}>
                    <span className="wap-connect__check" aria-hidden>
                      <CheckIcon className="h-3.5 w-3.5" />
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="wap-connect__media">
              <QrWidget
                channel={t("widget.channel")}
                waiting={t("widget.waitingQr")}
                status={t("widget.statusSync")}
              />
            </div>
          </article>

          <article className="wap-connect__row is-reverse">
            <div className="wap-connect__copy">
              <p className="wap-connect__badge">
                <SmartphoneIcon className="h-3.5 w-3.5" />
                {t("tabs.code")}
              </p>
              <h3 className="wap-connect__path-title">{t("paths.code.title")}</h3>
              <p className="wap-connect__path-desc">{t("paths.code.desc")}</p>
              <ul className="wap-connect__points">
                {codeSteps.map((step) => (
                  <li key={step}>
                    <span className="wap-connect__check" aria-hidden>
                      <CheckIcon className="h-3.5 w-3.5" />
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="wap-connect__media">
              <CodeWidget
                channel={t("widget.channel")}
                waiting={t("widget.waitingCode")}
                status={t("widget.statusSync")}
                codeLabel={t("widget.codeLabel")}
                codeValue={t("widget.codeValue")}
                phoneMask={t("widget.phoneMask")}
              />
            </div>
          </article>
        </div>
      </Container>
    </section>
  );
}
