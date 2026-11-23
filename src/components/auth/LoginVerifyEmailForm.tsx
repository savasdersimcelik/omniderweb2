"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  authFetch,
  goToPanel,
  messageFromAuth,
  type AuthSessionData,
} from "@/lib/auth/api";
import { cn } from "@/lib/utils";

type Props = {
  initialEmail?: string;
};

export function LoginVerifyEmailForm({ initialEmail = "" }: Props) {
  const t = useTranslations("Auth.verifyLogin");
  const tc = useTranslations("Auth.common");
  const [email, setEmail] = useState(initialEmail);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);

  const normalizedCode = code.replace(/\D/g, "").slice(0, 6);

  async function onVerify(e: FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || normalizedCode.length !== 6) {
      setError(t("codeRequired"));
      return;
    }

    setError("");
    setSuccess("");
    setVerifying(true);

    try {
      const { ok, json } = await authFetch<AuthSessionData>("/auth/verify-email", {
        body: { email: trimmed, code: normalizedCode },
      });

      if (ok && json?.success && json.data?.token) {
        setSuccess(messageFromAuth(json, t("verifySuccess")));
        goToPanel(json.data.token);
        return;
      }

      setError(messageFromAuth(json, tc("errorGeneric")));
      setCode("");
    } catch {
      setError(tc("errorNetwork"));
    } finally {
      setVerifying(false);
    }
  }

  async function onResend() {
    const trimmed = email.trim();
    if (!trimmed || resending) return;

    setError("");
    setSuccess("");
    setResending(true);

    try {
      const { ok, json } = await authFetch("/auth/resend-verification", {
        body: { email: trimmed },
      });

      if (ok && json?.success) {
        setSuccess(messageFromAuth(json, t("resendSuccess")));
        return;
      }

      setError(messageFromAuth(json, tc("errorGeneric")));
    } catch {
      setError(tc("errorNetwork"));
    } finally {
      setResending(false);
    }
  }

  const subtitle = email.trim()
    ? t("subtitle", { email: email.trim() })
    : t("subtitleGeneric");

  return (
    <div className="flex flex-1 items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-card">
        <p className="text-[11px] font-bold tracking-[0.18em] text-amber-600 uppercase">
          Inbox
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
          {t("title")}
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {subtitle}
        </p>

        <div className="mt-4 rounded-xl bg-amber-50 px-3.5 py-3 text-left ring-1 ring-amber-100">
          <p className="text-sm font-semibold text-amber-950">{t("noticeTitle")}</p>
          <p className="mt-0.5 text-xs leading-relaxed text-amber-900/80">
            {t("noticeBody")}
          </p>
        </div>

        <form onSubmit={onVerify} className="mt-6 space-y-4" noValidate>
          {error ? (
            <p className="rounded-xl border border-destructive/30 bg-destructive/10 px-3.5 py-3 text-sm text-destructive" role="alert">
              {error}
            </p>
          ) : null}
          {success ? (
            <p className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-3 text-sm text-emerald-700" role="status">
              {success}
            </p>
          ) : null}

          <div className="space-y-2">
            <label htmlFor="verify-code" className="text-sm font-medium text-foreground">
              {t("codeLabel")}
            </label>
            <input
              id="verify-code"
              inputMode="numeric"
              autoComplete="one-time-code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              maxLength={6}
              className="h-12 w-full rounded-xl border border-border bg-background px-4 text-center text-lg tracking-[0.35em] outline-none focus:border-brand-600 focus:ring-4 focus:ring-brand-600/15"
              placeholder="••••••"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="verify-email" className="text-sm font-medium text-foreground">
              {t("emailLabel")}
            </label>
            <input
              id="verify-email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none focus:border-brand-600 focus:ring-4 focus:ring-brand-600/15"
              placeholder={tc("emailPlaceholder")}
            />
          </div>

          <button
            type="submit"
            disabled={verifying}
            className={cn(
              "btn-primary w-full justify-center py-3.5",
              verifying && "pointer-events-none opacity-70",
            )}
          >
            {verifying ? t("verifying") : t("codeVerify")}
          </button>

          <button
            type="button"
            onClick={onResend}
            disabled={resending || !email.trim()}
            className={cn(
              "btn-secondary w-full justify-center py-3",
              resending && "pointer-events-none opacity-70",
            )}
          >
            {resending ? tc("loading") : t("resend")}
          </button>

          <p className="text-xs leading-relaxed text-muted-foreground">{t("hint")}</p>
        </form>

        <p className="mt-6 text-center text-sm">
          <Link href="/login" className="font-semibold text-brand-600 hover:underline">
            ← {t("backToLogin")}
          </Link>
        </p>
      </div>
    </div>
  );
}
