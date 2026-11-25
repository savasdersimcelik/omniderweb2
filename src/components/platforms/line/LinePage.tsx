import { InboxSection } from "./InboxSection";
import { LineHero } from "./LineHero";
import { LocationSection } from "./LocationSection";
import { RichSection } from "./RichSection";
import { TeamSection } from "./TeamSection";
import { TrySection } from "./TrySection";

export async function LinePage() {
  return (
    <div className="ln-page-atmosphere">
      <LineHero />
      <InboxSection />
      <RichSection />
      <LocationSection />
      <TeamSection />
      <TrySection />
    </div>
  );
}