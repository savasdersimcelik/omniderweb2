"use client";

import { useLocale, useTranslations } from "next-intl";
import { useState, type FormEvent } from "react";
import { LoaderCircle, Send, Shield } from "lucide-react";
import { Link } from "@/i18n/navigation";

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

const TOPICS = ["sales", "demo", "support", "partnership"] as const;

type Topic = (typeof TOPICS)[number];

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
  const [topic, setTopic] = useState<Topic | null>(null);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorKey, setErrorKey] = useState<string | null>(null);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function selectTopic(next: Topic) {
    setTopic(next);
    update("subject", t(`topics.${next}.subject`));
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
      setTopic(null);
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorKey("captcha_failed");
    } finally {
      setSending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="contact-form">
      {status === "success" ? (
        <div className="contact-form__alert contact-form__alert--success" role="status">
          {t("form.success")}
        </div>
      ) : null}

      {status === "error" ? (
        <div className="contact-form__alert contact-form__alert--error" role="alert">
          {errorKey === "captcha_required" || errorKey === "captcha_failed"
            ? t(`form.${errorKey}`)
            : t("form.error")}
        </div>
      ) : null}

      <div className="contact-form__topics" role="group" aria-label={t("topics.label")}>
        {TOPICS.map((id) => (
          <button
            key={id}
            type="button"
            className={`contact-form__topic${topic === id ? " is-active" : ""}`}
            onClick={() => selectTopic(id)}
          >
            {t(`topics.${id}.label`)}
          </button>
        ))}
      </div>

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

      <div className="contact-form__grid">
        <div className="contact-form__field">
          <label htmlFor="name">{t("form.name")}</label>
          <input
            id="name"
            name="name"
            required
            maxLength={120}
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder={t("form.namePlaceholder")}
          />
        </div>

        <div className="contact-form__field">
          <label htmlFor="email">{t("form.email")}</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={180}
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder={t("form.emailPlaceholder")}
          />
        </div>

        <div className="contact-form__field">
          <label htmlFor="phone">
            {t("form.phone")}{" "}
            <span className="contact-form__optional">· {t("form.optional")}</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            maxLength={40}
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder={t("form.phonePlaceholder")}
          />
        </div>

        <div className="contact-form__field">
          <label htmlFor="company">
            {t("form.company")}{" "}
            <span className="contact-form__optional">· {t("form.optional")}</span>
          </label>
          <input
            id="company"
            name="company"
            maxLength={120}
            value={form.company}
            onChange={(e) => update("company", e.target.value)}
            placeholder={t("form.companyPlaceholder")}
          />
        </div>
      </div>

      <div className="contact-form__field">
        <label htmlFor="subject">{t("form.subject")}</label>
        <input
          id="subject"
          name="subject"
          required
          maxLength={160}
          value={form.subject}
          onChange={(e) => {
            setTopic(null);
            update("subject", e.target.value);
          }}
          placeholder={t("form.subjectPlaceholder")}
        />
      </div>

      <div className="contact-form__field">
        <label htmlFor="message">{t("form.message")}</label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          maxLength={5000}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder={t("form.messagePlaceholder")}
        />
      </div>

      <label className="contact-form__consent">
        <input
          type="checkbox"
          name="consent"
          required
          checked={form.consent}
          onChange={(e) => update("consent", e.target.checked)}
        />
        <span>
          {t.rich("form.consent", {
            privacy: (chunks) => (
              <Link href="/privacy-policy" className="contact-form__link">
                {chunks}
              </Link>
            ),
          })}
        </span>
      </label>

      <button
        type="submit"
        disabled={sending}
        className="btn-primary contact-form__submit"
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

      <p className="contact-form__note">
        <Shield className="size-3.5" aria-hidden />
        {t("form.privacyNote")}
      </p>

      <p className="contact-form__recaptcha">{t("form.recaptchaNotice")}</p>
    </form>
  );
}
