import { Link } from "@/i18n/navigation";

type AuthPlaceholderProps = {
  title: string;
  description: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

/** Lightweight stand-in for register / forgot / reset / verify until wired to auth APIs. */
export function AuthPlaceholder({
  title,
  description,
  primaryHref = "/login",
  primaryLabel,
  secondaryHref = "/",
  secondaryLabel,
}: AuthPlaceholderProps) {
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 text-center shadow-card">
        <p className="text-[11px] font-bold tracking-[0.18em] text-brand-600 uppercase">
          Omnider
        </p>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
          {title}
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
        <div className="mt-8 flex flex-col gap-3">
          {primaryLabel ? (
            <Link href={primaryHref} className="btn-primary w-full justify-center py-3">
              {primaryLabel}
            </Link>
          ) : null}
          {secondaryLabel ? (
            <Link
              href={secondaryHref}
              className="btn-secondary w-full justify-center py-3"
            >
              {secondaryLabel}
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}
