import "./webchat-colors.css";

import { AiAutomationSection } from "./AiAutomationSection";
import { AnalyticsSection } from "./AnalyticsSection";
import { ChatflowSection } from "./ChatflowSection";
import { InboxSection } from "./InboxSection";
import { InteractiveSection } from "./InteractiveSection";
import { WebchatHero } from "./WebchatHero";

export async function WebchatPage() {
  return (
    <div className="wc-page-atmosphere wc-page">
      <WebchatHero />
      <InboxSection />
      <InteractiveSection />
      <AiAutomationSection />
      <ChatflowSection />
      <AnalyticsSection />
    </div>
  );
}
