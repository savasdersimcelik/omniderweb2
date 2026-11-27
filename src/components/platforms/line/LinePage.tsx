import "./line-colors.css";

import { AiAutomationSection } from "./AiAutomationSection";
import { AnalyticsSection } from "./AnalyticsSection";
import { ChatflowSection } from "./ChatflowSection";
import { ConnectSection } from "./ConnectSection";
import { InboxSection } from "./InboxSection";
import { InteractiveSection } from "./InteractiveSection";
import { LineHero } from "./LineHero";
import { LocationSection } from "./LocationSection";
import { TrySection } from "./TrySection";

export async function LinePage() {
  return (
    <div className="ln-page-atmosphere ln-page">
      <LineHero />
      <InboxSection />
      <ConnectSection />
      <InteractiveSection />
      <AiAutomationSection />
      <ChatflowSection />
      <LocationSection />
      <AnalyticsSection />
      <TrySection />
    </div>
  );
}
