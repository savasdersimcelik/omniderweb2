import { ClosingCtaSection } from "@/components/layout/ClosingCtaSection";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

/** Public marketing pages — single site header + closing CTA + footer. */
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <SiteHeader />
      <div className="flex flex-1 flex-col">{children}</div>
      <ClosingCtaSection />
      <SiteFooter />
    </div>
  );
}
