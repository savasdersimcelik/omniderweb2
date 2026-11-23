import type { ReactNode } from "react";
import {
  Brain,
  Globe2,
  Info,
  Layers,
  Link2,
  type LucideIcon,
  MessageSquareText,
  Phone,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export type PricingFeatureIcon =
  | "channels"
  | "messages"
  | "ai"
  | "verification"
  | "phone"
  | "links"
  | "analytics";

const FEATURE_ICONS: Record<PricingFeatureIcon, LucideIcon> = {
  channels: Layers,
  messages: MessageSquareText,
  ai: Brain,
  verification: ShieldCheck,
  phone: Phone,
  links: Link2,
  analytics: Globe2,
};

export interface PricingFeature {
  text: string;
  value?: string;
  included: boolean;
  hasInfo?: boolean;
  icon?: PricingFeatureIcon;
}

export interface PricingTier {
  id?: string;
  name: string;
  subtitle?: string;
  price?: string;
  period?: string;
  description: string;
  badge?: {
    text: string;
  };
  features: PricingFeature[];
  buttonText: string;
  href?: string;
  highlighted?: boolean;
  footerText?: string;
  billedNote?: string;
}

export interface AdaptivePricingSectionProps {
  title?: string;
  subtitle?: string;
  highlightsLabel?: string;
  tiers: PricingTier[];
  className?: string;
  pending?: boolean;
  controls?: ReactNode;
  /** Break out of the page skeleton so multi-tier cards can breathe. */
  wide?: boolean;
}

export function AdaptivePricingSection({
  title,
  subtitle,
  highlightsLabel = "Plan highlights",
  tiers,
  className,
  pending = false,
  controls,
  wide = false,
}: AdaptivePricingSectionProps) {
  const count = Math.min(Math.max(tiers.length, 1), 5);

  return (
    <div className={cn("w-full", className)}>
      {(title || subtitle) && (
        <div className="mx-auto mb-8 max-w-3xl text-center md:mb-10">
          {title ? (
            <h2 className="mb-4 text-4xl font-light tracking-tight text-foreground md:text-5xl lg:text-6xl">
              {title}
            </h2>
          ) : null}
          {subtitle ? (
            <p className="mx-auto max-w-2xl text-lg font-light text-muted-foreground md:text-xl">
              {subtitle}
            </p>
          ) : null}
        </div>
      )}

      {controls ? (
        <div className="mx-auto mb-8 max-w-3xl md:mb-10">{controls}</div>
      ) : null}

      <div
        className={cn(
          "mx-auto grid grid-cols-1 gap-8 pt-6 md:pt-8",
          wide
            ? "pricing-packages__deck max-w-none"
            : "max-w-7xl",
          count === 1 && !wide && "max-w-md",
          count === 2 && "md:grid-cols-2 md:gap-7",
          count === 2 && !wide && "max-w-4xl",
          count === 3 && "md:grid-cols-3 md:gap-7",
          count === 3 && !wide && "max-w-6xl",
          count === 4 && "md:grid-cols-2 xl:grid-cols-4 md:gap-6",
          count >= 5 && "md:grid-cols-2 xl:grid-cols-5 xl:gap-6",
          pending && "opacity-70 transition-opacity",
        )}
      >
        {tiers.map((tier) => (
          <Card
            key={tier.id || tier.name}
            id={tier.id}
            className={cn(
              "pricing-plan-card relative h-full gap-0 overflow-visible rounded-2xl border-0 bg-white py-0 transition-all duration-300",
              tier.highlighted
                ? "pricing-plan-card--featured z-20 md:-translate-y-3 md:scale-[1.02]"
                : "z-10 hover:-translate-y-1",
            )}
          >
            {tier.badge ? (
              <div className="absolute -top-3.5 left-1/2 z-30 -translate-x-1/2 whitespace-nowrap">
                <div className="rounded-full bg-linear-to-r from-brand-700 to-brand-500 px-4 py-1.5 text-[11px] font-bold tracking-wide text-primary-foreground uppercase shadow-lg shadow-brand-600/40">
                  {tier.badge.text}
                </div>
              </div>
            ) : null}

            <CardHeader className="px-5 pt-11 pb-5 text-center sm:px-6">
              {tier.subtitle ? (
                <div className="mb-3 text-[11px] font-semibold tracking-[0.22em] text-brand-600/80 uppercase">
                  {tier.subtitle}
                </div>
              ) : null}

              <CardTitle className="mb-3 min-w-0">
                {tier.price ? (
                  <div className="flex min-w-0 flex-col items-center gap-1 px-0.5">
                    <span
                      className={cn(
                        "max-w-full font-semibold tracking-tight text-foreground tabular-nums leading-none",
                        (tier.price?.length ?? 0) > 7
                          ? "text-[clamp(1.4rem,1.55vw+0.75rem,2.05rem)]"
                          : "text-[clamp(1.75rem,1.9vw+0.9rem,2.55rem)]",
                      )}
                    >
                      {tier.price}
                    </span>
                    {tier.period ? (
                      <span className="text-sm font-medium text-muted-foreground">
                        {tier.period}
                      </span>
                    ) : null}
                  </div>
                ) : (
                  <div className="text-[clamp(1.75rem,1.9vw+0.9rem,2.55rem)] font-semibold text-foreground">
                    {tier.name}
                  </div>
                )}
              </CardTitle>

              {tier.billedNote ? (
                <p className="mb-2 text-xs font-medium text-brand-600/80">
                  {tier.billedNote}
                </p>
              ) : null}

              <CardDescription className="mx-auto max-w-[16rem] px-0.5 text-sm leading-relaxed text-muted-foreground">
                {tier.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="flex-1 px-5 pb-1 sm:px-6">
              <div className="mb-4 h-px w-full bg-linear-to-r from-transparent via-border to-transparent" />
              <h4
                className={cn(
                  "mb-4 text-[11px] font-semibold tracking-[0.16em] uppercase",
                  tier.highlighted ? "text-brand-700" : "text-slate-500",
                )}
              >
                {highlightsLabel}
              </h4>

              <ul className="space-y-3.5">
                {tier.features.map((feature) => {
                  const Icon =
                    (feature.icon && FEATURE_ICONS[feature.icon]) || Sparkles;
                  return (
                    <li
                      key={`${feature.text}-${feature.value ?? ""}`}
                      className={cn(
                        "flex items-center gap-3",
                        !feature.included && "opacity-40",
                      )}
                    >
                      <span
                        className={cn(
                          "inline-flex size-7 shrink-0 items-center justify-center rounded-lg",
                          feature.included
                            ? "bg-brand-50 text-brand-600 ring-1 ring-brand-100"
                            : "bg-muted text-muted-foreground",
                        )}
                      >
                        <Icon className="size-3.5" strokeWidth={2} aria-hidden />
                      </span>

                      <span className="min-w-0 flex-1 text-[13px] leading-snug text-slate-600">
                        {feature.text}
                        {feature.hasInfo ? (
                          <Info className="ml-1.5 inline size-3 align-[-1px] text-muted-foreground" />
                        ) : null}
                      </span>

                      {feature.value ? (
                        <strong
                          className={cn(
                            "shrink-0 text-[13px] font-bold tabular-nums tracking-tight",
                            feature.included
                              ? "text-slate-900"
                              : "text-muted-foreground",
                          )}
                        >
                          {feature.value}
                        </strong>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            </CardContent>

            <CardFooter className="mt-auto border-0 bg-transparent px-5 pt-6 pb-7 sm:px-6">
              <div className="w-full">
                {tier.href ? (
                  <Button
                    asChild
                    size="lg"
                    className={cn(
                      "h-11 w-full rounded-xl text-sm font-semibold transition-all duration-300",
                      tier.highlighted
                        ? "border-0 bg-linear-to-r from-brand-700 to-brand-500 text-primary-foreground shadow-lg shadow-brand-600/35 hover:from-brand-600 hover:to-brand-400 hover:shadow-xl"
                        : "border border-slate-200 bg-white text-slate-800 shadow-sm hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700",
                    )}
                  >
                    <Link href={tier.href as "/register"}>{tier.buttonText}</Link>
                  </Button>
                ) : (
                  <Button
                    size="lg"
                    className={cn(
                      "h-11 w-full rounded-xl text-sm font-semibold transition-all duration-300",
                      tier.highlighted
                        ? "border-0 bg-linear-to-r from-brand-700 to-brand-500 text-primary-foreground shadow-lg shadow-brand-600/35 hover:from-brand-600 hover:to-brand-400 hover:shadow-xl"
                        : "border border-slate-200 bg-white text-slate-800 shadow-sm hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700",
                    )}
                  >
                    {tier.buttonText}
                  </Button>
                )}
                {tier.footerText ? (
                  <p className="mt-5 text-center text-xs font-light text-muted-foreground">
                    {tier.footerText}
                  </p>
                ) : null}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default AdaptivePricingSection;
