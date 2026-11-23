"use client";

import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function GoogleMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className ?? "h-5 w-5"} aria-hidden>
      <path
        fill="#4285F4"
        d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.46a5.52 5.52 0 0 1-2.4 3.62v3h3.88c2.27-2.09 3.58-5.17 3.58-8.81z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.07 7.94-2.91l-3.88-3a7.2 7.2 0 0 1-10.7-3.78H1.34v3.09A12 12 0 0 0 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.36 14.31a7.2 7.2 0 0 1 0-4.62V6.6H1.34a12 12 0 0 0 0 10.8l4.02-3.09z"
      />
      <path
        fill="#EA4335"
        d="M12 4.77c1.76 0 3.34.61 4.59 1.8l3.44-3.44A11.97 11.97 0 0 0 12 0 12 12 0 0 0 1.34 6.6l4.02 3.09A7.2 7.2 0 0 1 12 4.77z"
      />
    </svg>
  );
}

export function FacebookMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className ?? "h-5 w-5"} aria-hidden>
      <path
        fill="currentColor"
        d="M22 12.07C22 6.48 17.52 2 11.93 2S1.86 6.48 1.86 12.07c0 4.99 3.65 9.14 8.43 9.93v-7.02H7.9v-2.91h2.39V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7.02A10.01 10.01 0 0 0 22 12.07z"
      />
    </svg>
  );
}

type Props = {
  googleLabel: string;
  facebookLabel: string;
  dividerLabel: string;
  loading?: boolean;
  busy?: "google" | "facebook" | null;
  disabled?: boolean;
  onGoogle: () => void;
  onFacebook: () => void;
};

export function OAuthButtons({
  googleLabel,
  facebookLabel,
  dividerLabel,
  loading = false,
  busy = null,
  disabled = false,
  onGoogle,
  onFacebook,
}: Props) {
  const blocked = disabled || loading || busy !== null;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-4" role="separator" aria-label={dividerLabel}>
        <span className="h-px flex-1 bg-border" />
        <span className="text-[11px] font-medium tracking-[0.16em] text-muted-foreground">
          {dividerLabel}
        </span>
        <span className="h-px flex-1 bg-border" />
      </div>

      <button
        type="button"
        disabled={blocked}
        onClick={onGoogle}
        className={cn(
          "flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-border bg-background/60 px-4 text-sm font-medium text-foreground backdrop-blur-md transition-colors hover:border-foreground/30 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-60",
        )}
      >
        {busy === "google" ? (
          <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
        ) : (
          <GoogleMark />
        )}
        {googleLabel}
      </button>

      <button
        type="button"
        disabled={blocked}
        onClick={onFacebook}
        className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-[#1877F2] bg-[#1877F2] px-4 text-sm font-medium text-white transition-colors hover:border-[#166fe5] hover:bg-[#166fe5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-60"
      >
        {busy === "facebook" ? (
          <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
        ) : (
          <FacebookMark />
        )}
        {facebookLabel}
      </button>
    </div>
  );
}
