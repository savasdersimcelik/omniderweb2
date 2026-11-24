"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import { LoaderCircle, X } from "lucide-react";
import { getAttributionForSubmit } from "@/lib/attribution/client";
import { useDemoModal } from "./DemoModalContext";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (
        siteKey: string,
        options: { action: string },
      ) => Promise<string>;
    };
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY || "";

type FormState = {
  fullName: string;
  phone: string;
  email: string;
  website: string;
};

const initialForm: FormState = {
  fullName: "",
  phone: "",
  email: "",
  website: "",
};

async function getRecaptchaToken() {
  if (!SITE_KEY) return "local-dev";
  if (typeof window.grecaptcha === "undefined") {
    throw new Error("unavailable");
  }
  return new Promise<string>((resolve, reject) => {
    window.grecaptcha!.ready(() => {
      window
        .grecaptcha!.execute(SITE_KEY, { action: "lead" })
        .then(resolve)
        .catch(reject);
    });
  });
}

export function DemoRequestModal() {
  const t = useTranslations("DemoModal");
  const locale = useLocale();
  const { open, source, closeDemo } = useDemoModal();
  const titleId = useId();
  const nameRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState<FormState>(initialForm);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!open) {
      setForm(initialForm);
      setSending(false);
      setStatus("idle");
      setMessage("");
      return;
    }

    const timer = window.setTimeout(() => nameRef.current?.focus(), 50);
    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeDemo();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, closeDemo]);

  if (!open) return null;

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending || status === "success") return;

    setSending(true);
    setStatus("idle");
    setMessage("");

    try {
      const recaptchaToken = await getRecaptchaToken();
      const attribution = getAttributionForSubmit();
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          locale,
          pageName: source,
          pageUrl: window.location.href,
          recaptchaToken,
          attribution,
        }),
      });

      const data = (await response.json().catch(() => ({}))) as {
        error?: string;
        status?: string;
      };

      if (!response.ok) {
        setStatus("error");
        setMessage(
          data.error === "captcha_required" || data.error === "captcha_failed"
            ? t("captchaFailed")
            : t("error"),
        );
        return;
      }

      setStatus("success");
      setMessage(data.status === "duplicate" ? t("duplicate") : t("success"));
    } catch {
      setStatus("error");
      setMessage(t("captchaFailed"));
    } finally {
      setSending(false);
    }
  }

  const inputClass =
    "mt-1.5 w-full rounded-xl border-0 bg-surface-subtle px-4 py-3 text-sm text-ink ring-1 ring-line transition placeholder:text-ink-faint focus:bg-surface focus:ring-2 focus:ring-brand-500 focus:outline-none";

  return (
    <div
      className="fixed inset-0 z-[80]"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        aria-label={t("close")}
        onClick={closeDemo}
      />

      <div className="relative flex min-h-full items-end justify-center p-4 sm:items-center">
        <div
          className="w-full max-w-lg overflow-hidden rounded-3xl bg-surface shadow-[0_28px_80px_-36px_rgb(15_23_42_/_0.35)] ring-1 ring-line animate-in fade-in zoom-in-95 duration-200"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-4 sm:px-6">
            <div>
              <p className="eyebrow">{t("eyebrow")}</p>
              <h2
                id={titleId}
                className="mt-1 text-xl font-semibold tracking-tight text-ink sm:text-2xl"
              >
                {t("title")}
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                {t("subtitle")}
              </p>
            </div>
            <button
              type="button"
              id="cta-close-demo"
              className="flex size-9 shrink-0 items-center justify-center rounded-full text-ink-subtle transition hover:bg-surface-subtle hover:text-ink"
              onClick={closeDemo}
              aria-label={t("close")}
            >
              <X className="size-4" />
            </button>
          </div>

          <form className="space-y-4 px-5 py-5 sm:px-6" onSubmit={onSubmit}>
            <div className="hidden" aria-hidden="true">
              <label>
                Website
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.website}
                  onChange={(e) => update("website", e.target.value)}
                />
              </label>
            </div>

            <div>
              <label
                htmlFor="demo-full-name"
                className="block text-sm font-semibold text-ink"
              >
                {t("fullName")}
              </label>
              <input
                ref={nameRef}
                id="demo-full-name"
                required
                maxLength={120}
                autoComplete="name"
                value={form.fullName}
                onChange={(e) => update("fullName", e.target.value)}
                placeholder={t("fullNamePlaceholder")}
                className={inputClass}
              />
            </div>

            <div>
              <label
                htmlFor="demo-phone"
                className="block text-sm font-semibold text-ink"
              >
                {t("phone")}
              </label>
              <input
                id="demo-phone"
                type="tel"
                required
                maxLength={40}
                autoComplete="tel"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                placeholder={t("phonePlaceholder")}
                className={inputClass}
              />
            </div>

            <div>
              <label
                htmlFor="demo-email"
                className="block text-sm font-semibold text-ink"
              >
                {t("email")}{" "}
                <span className="font-normal text-ink-faint">
                  · {t("optional")}
                </span>
              </label>
              <input
                id="demo-email"
                type="email"
                maxLength={180}
                autoComplete="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder={t("emailPlaceholder")}
                className={inputClass}
              />
            </div>

            {status !== "idle" && message ? (
              <div
                className={
                  status === "error"
                    ? "rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800"
                    : "rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
                }
              >
                {message}
              </div>
            ) : null}

            <button
              type="submit"
              id="cta-submit-demo"
              disabled={sending || status === "success"}
              className="btn-primary h-12 w-full text-base disabled:cursor-wait disabled:opacity-70"
            >
              {sending ? (
                <>
                  <LoaderCircle className="size-4 animate-spin" />
                  {t("submitting")}
                </>
              ) : (
                t("submit")
              )}
            </button>

            <p className="text-center text-xs leading-relaxed text-ink-subtle">
              {t("privacyNote")}
            </p>
            <p className="text-center text-[11px] leading-relaxed text-ink-faint">
              {t("recaptchaNotice")}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
