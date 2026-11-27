import "./line-colors.css";

import { ConnectSection } from "./ConnectSection";
import { InboxSection } from "./InboxSection";
import { InteractiveSection } from "./InteractiveSection";
import { LineHero } from "./LineHero";
import { LocationSection } from "./LocationSection";
import { TeamSection } from "./TeamSection";
import { TrySection } from "./TrySection";

export async function LinePage() {
  return (
    <div className="ln-page-atmosphere ln-page">
      <LineHero />
      <InboxSection />
      <ConnectSection />
      <InteractiveSection />
      <LocationSection />
      <TeamSection />
      <TrySection />
    </div>
  );
}
