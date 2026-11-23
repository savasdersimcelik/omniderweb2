"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { OmniderAuthMark } from "@/components/auth/OmniderAuthMark";
import { NexusAuthShell } from "@/components/ui/nexus-3d-animated-login-futuristic-authentication-ui";
import { colors } from "@/config/colors";
import { Link } from "@/i18n/navigation";
import {
  authFetch,
  goToPanel,
  messageFromAuth,
  type AuthSessionData,
} from "@/lib/auth/api";
import { cn } from "@/lib/utils";

type Variant = "login" | "register";

type Props = {
  initialEmail?: string;
  variant?: Variant;
};

export function VerifyEmailPendingForm({
  initialEmail = "",
  variant = "login",
}: Props) {
  const ns = variant === "register" ? "Auth.verifyRegister" : "Auth.verifyLogin";
  const t = useTranslations(ns);
  const tc = useTranslations("Auth.common");
  const tb = useTranslations("Auth.brand");

  const [email, setEmail] = useState(initialEmail);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);

  useEffect(() => {
    setEmail(initialEmail);
  }, [initialEmail]);

  const normalizedCode = code.replace(/\D/g, "").slice(0, 6);
  const subtitle = email.trim()
    ? t("subtitle", { email: email.trim() })
    : t("subtitleGeneric");

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

  const isRegister = variant === "register";
  const noticeTone = isRegister
    ? "bg-emerald-50 ring-emerald-100 text-emerald-950"
    : "bg-amber-50 ring-amber-100 text-amber-950";
  const noticeBodyTone = isRegister
    ? "text-emerald-900/80"
    : "text-amber-900/80";

  return (
    <NexusAuthShell
      brandName="Omnider"
      logo={<OmniderAuthMark />}
      title={t("title")}
      description={subtitle}
      eyebrow={tb("eyebrow")}
      headline={tb("headline")}
      tagline={tb("tagline")}
      accentColor={colors.brand[600]}
      footer={
        <p className="text-center text-sm">
          <Link
            href="/login"
            className="font-semibold text-[var(--nx-accent)] hover:underline"
          >
            ← {t("backToLogin")}
          </Link>
        </p>
      }
    >
      {isRegister ? (
        <p className="-mt-4 mb-3 text-[11px] font-bold tracking-[0.18em] text-emerald-600 uppercase">
          {t("eyebrow")}
        </p>
      ) : null}

      <div className={cn("mb-5 rounded-xl px-3.5 py-3 text-left ring-1", noticeTone)}>
        <p className="text-sm font-semibold">
          {isRegister ? t("nextStep") : t("noticeTitle")}
        </p>
        <p className={cn("mt-0.5 text-xs leading-relaxed", noticeBodyTone)}>
          {isRegister ? t("hint") : t("noticeBody")}
        </p>
      </div>

      <form onSubmit={onVerify} className="space-y-4" noValidate>
        {error ? (
          <p
            className="rounded-xl border border-destructive/30 bg-destructive/10 px-3.5 py-3 text-sm text-destructive"
            role="alert"
          >
            {error}
          </p>
        ) : null}
        {success ? (
          <p
            className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-3 text-sm text-emerald-700"
            role="status"
          >
            {success}
          </p>
        ) : null}

        <div className="space-y-1.5">
          <label htmlFor="verify-code" className="text-sm font-medium">
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

        {!initialEmail ? (
          <div className="space-y-1.5">
            <label htmlFor="verify-email" className="text-sm font-medium">
              {t("emailLabel")}
            </label>
            <input
              id="verify-email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 w-full rounded-xl border border-border bg-background px-3.5 text-sm outline-none focus:border-brand-600 focus:ring-4 focus:ring-brand-600/15"
              placeholder={tc("emailPlaceholder")}
            />
          </div>
        ) : null}

        <button
          type="submit"
          disabled={verifying}
          className={cn(
            "btn-primary w-full justify-center py-3.5",
            verifying && "pointer-events-none opacity-70",
          )}
        >
          {verifying ? (
            <span className="inline-flex items-center gap-2">
              <Loader2 className="size-4 animate-spin" aria-hidden />
              {t("verifying")}
            </span>
          ) : (
            t("codeVerify")
          )}
        </button>

        <button
          type="button"
          onClick={() => void onResend()}
          disabled={resending || !email.trim()}
          className={cn(
            "btn-secondary w-full justify-center py-3",
            resending && "pointer-events-none opacity-70",
          )}
        >
          {resending ? tc("loading") : t("resend")}
        </button>

        {!isRegister ? (
          <p className="text-xs leading-relaxed text-muted-foreground">
            {t("hint")}
          </p>
        ) : null}
      </form>
    </NexusAuthShell>
  );
}
