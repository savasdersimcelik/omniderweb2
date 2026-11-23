"use client";

import DoodleCrewFooter, {
  type CrewMember,
  type FooterAction,
  type FooterColumn,
  type FooterLink,
} from "@/components/ui/doodle-crew-footer";

export type OmniderDoodleFooterProps = {
  brand: string;
  blurb: string;
  tagline: string;
  copyright: string;
  columns: FooterColumn[];
  actions: FooterAction[];
  legal: FooterLink[];
  socials: FooterLink[];
  crew: CrewMember[];
  backToTopLabel: string;
};

/** Omnider-branded Doodle Crew footer (paper + brand indigo accent). */
export function OmniderDoodleFooter({
  brand,
  blurb,
  tagline,
  copyright,
  columns,
  actions,
  legal,
  socials,
  crew,
  backToTopLabel,
}: OmniderDoodleFooterProps) {
  return (
    <div className="mt-auto w-full">
      <DoodleCrewFooter
        wordmark="OMNIDER"
        brand={brand}
        brandLogoSrc="/icons/icon-192.png"
        brandLogoAlt="Omnider"
        blurb={blurb}
        tagline={tagline}
        copyright={copyright}
        columns={columns}
        actions={actions}
        legal={legal}
        socials={socials}
        crew={crew}
        doodles={["star", "sparkle", "bolt", "heart", "plane", "spiral"]}
        doodleCount={10}
        preset="paper"
        palette={{
          background: "#ffffff",
          ink: "#0f172a",
          accent: "#4f46e5",
        }}
        height="720px"
        backToTop
        backToTopLabel={backToTopLabel}
        interactive
        className="border-t border-line"
      />
    </div>
  );
}
