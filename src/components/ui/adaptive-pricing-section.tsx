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
}

export function AdaptivePricingSection({
  title,
  subtitle,
  highlightsLabel = "Plan highlights",
  tiers,
  className,
  pending = false,
  controls,
}: AdaptivePricingSectionProps) {
  const count = Math.min(Math.max(tiers.length, 1), 5);

  return (
    <div className={cn("w-full", className)}>
      {(title || subtitle) && (
        <div className="mb-8 text-center md:mb-10">
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

      {controls ? <div className="mb-8 md:mb-10">{controls}</div> : null}

      <div
        className={cn(
          "mx-auto grid max-w-7xl grid-cols-1 gap-8 pt-5 md:gap-6 md:pt-6",
          count === 1 && "max-w-md",
          count === 2 && "md:grid-cols-2 max-w-4xl",
          count === 3 && "md:grid-cols-3 max-w-6xl",
          count === 4 && "md:grid-cols-2 xl:grid-cols-4",
          count >= 5 && "md:grid-cols-2 xl:grid-cols-5 xl:gap-4",
          pending && "opacity-70 transition-opacity",
        )}
      >
        {tiers.map((tier) => (
          <Card
            key={tier.id || tier.name}
            id={tier.id}
            className={cn(
              "relative h-full gap-0 overflow-visible border-0 py-0 transition-all duration-300 ring-1 ring-border/50",
              tier.highlighted
                ? "z-20 bg-linear-to-b from-brand-50/90 to-card shadow-2xl shadow-brand-600/20 ring-brand-300 md:scale-[1.04] md:-translate-y-3"
                : "z-10 bg-card/50 hover:bg-card/80 hover:ring-brand-200/70",
            )}
            style={{ backdropFilter: "blur(10px)" }}
          >
            {tier.badge ? (
              <div className="absolute -top-3 left-1/2 z-30 -translate-x-1/2 whitespace-nowrap">
                <div className="rounded-full bg-linear-to-r from-brand-600 to-brand-500 px-4 py-1.5 text-xs font-bold text-primary-foreground shadow-md shadow-brand-600/35">
                  {tier.badge.text}
                </div>
              </div>
            ) : null}

            <CardHeader className="px-4 pt-10 pb-5 text-center sm:px-5 md:px-5">
              {tier.subtitle ? (
                <div className="mb-3 text-[11px] font-medium tracking-[0.2em] text-muted-foreground uppercase">
                  {tier.subtitle}
                </div>
              ) : null}

              <CardTitle className="mb-3 min-w-0">
                {tier.price ? (
                  <div className="flex min-w-0 flex-col items-center gap-0.5 px-0.5">
                    <span
                      className={cn(
                        "max-w-full font-light tracking-tight text-foreground tabular-nums leading-none",
                        (tier.price?.length ?? 0) > 7
                          ? "text-[clamp(1.35rem,1.6vw+0.7rem,2rem)]"
                          : "text-[clamp(1.65rem,1.8vw+0.85rem,2.5rem)]",
                      )}
                    >
                      {tier.price}
                    </span>
                    {tier.period ? (
                      <span className="text-sm font-light text-muted-foreground">
                        {tier.period}
                      </span>
                    ) : null}
                  </div>
                ) : (
                  <div className="text-[clamp(1.65rem,1.8vw+0.85rem,2.5rem)] font-light text-foreground">
                    {tier.name}
                  </div>
                )}
              </CardTitle>

              {tier.billedNote ? (
                <p className="mb-2 text-xs text-muted-foreground">{tier.billedNote}</p>
              ) : null}

              <CardDescription className="px-0.5 text-sm leading-relaxed font-light text-muted-foreground">
                {tier.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="flex-1 px-5 pb-2 md:px-6">
              <h4
                className={cn(
                  "mb-4 text-[11px] font-semibold tracking-[0.16em] uppercase",
                  tier.highlighted ? "text-brand-700" : "text-muted-foreground",
                )}
              >
                {highlightsLabel}
              </h4>

              <ul className="space-y-3">
                {tier.features.map((feature) => {
                  const Icon =
                    (feature.icon && FEATURE_ICONS[feature.icon]) || Sparkles;
                  return (
                    <li
                      key={`${feature.text}-${feature.value ?? ""}`}
                      className={cn(
                        "flex items-center gap-3",
                        !feature.included && "opacity-45",
                      )}
                    >
                      <Icon
                        className={cn(
                          "size-4 shrink-0",
                          feature.included
                            ? "text-brand-600"
                            : "text-muted-foreground",
                        )}
                        strokeWidth={1.9}
                        aria-hidden
                      />

                      <span className="min-w-0 flex-1 text-[13px] leading-snug text-foreground/80">
                        {feature.text}
                        {feature.hasInfo ? (
                          <Info className="ml-1.5 inline size-3 align-[-1px] text-muted-foreground" />
                        ) : null}
                      </span>

                      {feature.value ? (
                        <strong
                          className={cn(
                            "shrink-0 text-[13px] font-semibold tabular-nums tracking-tight",
                            feature.included
                              ? "text-foreground"
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

            <CardFooter className="mt-auto border-0 bg-transparent px-6 pt-6 pb-7 md:px-7">
              <div className="w-full">
                {tier.href ? (
                  <Button
                    asChild
                    size="lg"
                    className={cn(
                      "h-11 w-full text-sm font-medium transition-all duration-300",
                      tier.highlighted
                        ? "border-0 bg-linear-to-r from-brand-700 to-brand-500 text-primary-foreground shadow-lg shadow-brand-600/30 hover:from-brand-600 hover:to-brand-400 hover:shadow-xl"
                        : "border border-border/50 bg-muted/80 text-foreground hover:bg-brand-50 hover:text-brand-700 hover:border-brand-200",
                    )}
                  >
                    <Link href={tier.href as "/register"}>{tier.buttonText}</Link>
                  </Button>
                ) : (
                  <Button
                    size="lg"
                    className={cn(
                      "h-11 w-full text-sm font-medium transition-all duration-300",
                      tier.highlighted
                        ? "border-0 bg-linear-to-r from-brand-700 to-brand-500 text-primary-foreground shadow-lg shadow-brand-600/30 hover:from-brand-600 hover:to-brand-400 hover:shadow-xl"
                        : "border border-border/50 bg-muted/80 text-foreground hover:bg-brand-50 hover:text-brand-700 hover:border-brand-200",
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
