"use client";

import { useLocale, useTranslations } from "next-intl";
import { useState, type FormEvent } from "react";
import { LoaderCircle, Send, Shield } from "lucide-react";

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
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
  consent: boolean;
  website: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  company: "",
  subject: "",
  message: "",
  consent: false,
  website: "",
};

async function getRecaptchaToken() {
  if (!SITE_KEY) {
    throw new Error("missing_sitekey");
  }

  if (typeof window.grecaptcha === "undefined") {
    throw new Error("unavailable");
  }

  return new Promise<string>((resolve, reject) => {
    window.grecaptcha!.ready(() => {
      window
        .grecaptcha!.execute(SITE_KEY, { action: "contact" })
        .then(resolve)
        .catch(reject);
    });
  });
}

export function ContactForm() {
  const t = useTranslations("ContactPage");
  const locale = useLocale();
  const [form, setForm] = useState<FormState>(initialState);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorKey, setErrorKey] = useState<string | null>(null);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;

    setSending(true);
    setStatus("idle");
    setErrorKey(null);

    try {
      const recaptchaToken = await getRecaptchaToken();

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          locale,
          recaptchaToken,
          sourceUrl: window.location.href,
        }),
      });

      const data = (await response.json().catch(() => ({}))) as {
        error?: string;
      };

      if (!response.ok) {
        setStatus("error");
        setErrorKey(data.error || "error");
        return;
      }

      setForm(initialState);
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorKey("captcha_failed");
    } finally {
      setSending(false);
    }
  }

  const fieldClass =
    "mt-1.5 w-full rounded-xl border-0 bg-surface-subtle px-4 py-3 text-sm text-ink ring-1 ring-line transition placeholder:text-ink-faint focus:bg-surface focus:ring-2 focus:ring-brand-500 focus:outline-none";

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {status === "success" ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
          {t("form.success")}
        </div>
      ) : null}

      {status === "error" ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800">
          {errorKey === "captcha_required" || errorKey === "captcha_failed"
            ? t(`form.${errorKey}`)
            : t("form.error")}
        </div>
      ) : null}

      <div className="hidden" aria-hidden="true">
        <label>
          Website
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={form.website}
            onChange={(e) => update("website", e.target.value)}
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-ink">
            {t("form.name")}
          </label>
          <input
            id="name"
            name="name"
            required
            maxLength={120}
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder={t("form.namePlaceholder")}
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-ink">
            {t("form.email")}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={180}
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder={t("form.emailPlaceholder")}
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-ink">
            {t("form.phone")}{" "}
            <span className="font-normal text-ink-faint">
              · {t("form.optional")}
            </span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            maxLength={40}
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder={t("form.phonePlaceholder")}
            className={fieldClass}
          />
        </div>

        <div>
          <label
            htmlFor="company"
            className="block text-sm font-semibold text-ink"
          >
            {t("form.company")}{" "}
            <span className="font-normal text-ink-faint">
              · {t("form.optional")}
            </span>
          </label>
          <input
            id="company"
            name="company"
            maxLength={120}
            value={form.company}
            onChange={(e) => update("company", e.target.value)}
            placeholder={t("form.companyPlaceholder")}
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-semibold text-ink">
          {t("form.subject")}
        </label>
        <input
          id="subject"
          name="subject"
          required
          maxLength={160}
          value={form.subject}
          onChange={(e) => update("subject", e.target.value)}
          placeholder={t("form.subjectPlaceholder")}
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-ink">
          {t("form.message")}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          maxLength={5000}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder={t("form.messagePlaceholder")}
          className={`${fieldClass} resize-y`}
        />
      </div>

      <label className="flex items-start gap-3 text-sm text-ink-muted">
        <input
          type="checkbox"
          name="consent"
          required
          checked={form.consent}
          onChange={(e) => update("consent", e.target.checked)}
          className="mt-0.5 size-4 shrink-0 rounded border-line text-brand-600 focus:ring-brand-500"
        />
        <span>{t("form.consent")}</span>
      </label>

      <button
        type="submit"
        disabled={sending}
        className="btn-primary w-full text-base disabled:cursor-wait disabled:opacity-70"
      >
        {sending ? (
          <>
            <LoaderCircle className="size-4 animate-spin" aria-hidden />
            {t("form.submitting")}
          </>
        ) : (
          <>
            {t("form.submit")}
            <Send className="size-4" aria-hidden />
          </>
        )}
      </button>

      <p className="flex items-center justify-center gap-1.5 text-center text-xs text-ink-faint">
        <Shield className="size-3.5" aria-hidden />
        {t("form.recaptchaNotice")}
      </p>
    </form>
  );
}
