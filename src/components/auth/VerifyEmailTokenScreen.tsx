"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Loader2, Mail } from "lucide-react";
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

type Props = {
  token: string;
};

export function VerifyEmailTokenScreen({ token }: Props) {
  const t = useTranslations("Auth.verify");
  const tc = useTranslations("Auth.common");
  const tb = useTranslations("Auth.brand");
  const [verifying, setVerifying] = useState(Boolean(token));
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!token) {
      setVerifying(false);
      setError(tc("errorGeneric"));
      return;
    }

    let cancelled = false;

    (async () => {
      setVerifying(true);
      setError("");
      try {
        const { ok, json } = await authFetch<AuthSessionData>(
          `/auth/verify-email/${encodeURIComponent(token)}`,
          { method: "GET" },
        );

        if (cancelled) return;

        if (ok && json?.success && json.data?.token) {
          setSuccess(messageFromAuth(json, t("verifySuccess")));
          goToPanel(json.data.token);
          return;
        }

        setError(messageFromAuth(json, tc("errorGeneric")));
      } catch {
        if (!cancelled) setError(tc("errorNetwork"));
      } finally {
        if (!cancelled) setVerifying(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [token, t, tc]);

  const title = verifying
    ? t("verifyingTitle")
    : success
      ? t("verifySuccess")
      : t("title");

  return (
    <NexusAuthShell
      brandName="Omnider"
      logo={<OmniderAuthMark />}
      title={title}
      description={verifying ? t("verifyingSubtitle") : undefined}
      eyebrow={tb("eyebrow")}
      headline={tb("headline")}
      tagline={tb("tagline")}
      accentColor={colors.brand[600]}
      footer={
        error ? (
          <p className="text-center text-sm">
            <Link
              href="/login"
              className="font-semibold text-[var(--nx-accent)] hover:underline"
            >
              ← {t("backToLogin")}
            </Link>
          </p>
        ) : null
      }
    >
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="flex size-12 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-brand">
          {verifying ? (
            <Loader2 className="size-5 animate-spin" aria-hidden />
          ) : success ? (
            <CheckCircle2 className="size-5" aria-hidden />
          ) : (
            <Mail className="size-5" aria-hidden />
          )}
        </div>

        {error ? (
          <p
            className="w-full rounded-xl border border-destructive/30 bg-destructive/10 px-3.5 py-3 text-left text-sm text-destructive"
            role="alert"
          >
            {error}
          </p>
        ) : null}
        {success ? (
          <p
            className="w-full rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-3 text-left text-sm text-emerald-700"
            role="status"
          >
            {success}
          </p>
        ) : null}
      </div>
    </NexusAuthShell>
  );
}
