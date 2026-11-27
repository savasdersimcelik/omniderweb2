import "./webchat-colors.css";

import { AiAutomationSection } from "./AiAutomationSection";
import { AnalyticsSection } from "./AnalyticsSection";
import { ChatflowSection } from "./ChatflowSection";
import { InboxSection } from "./InboxSection";
import { InteractiveSection } from "./InteractiveSection";
import { InstallSection } from "./InstallSection";
import { SourcePageSection } from "./SourcePageSection";
import { WidgetDemoSection } from "./WidgetDemoSection";
import { WebchatHero } from "./WebchatHero";

export async function WebchatPage() {
  return (
    <div className="wc-page-atmosphere wc-page">
      <WebchatHero />
      <InboxSection />
      <WidgetDemoSection />
      <SourcePageSection />
      <InstallSection />
      <InteractiveSection />
      <AiAutomationSection />
      <ChatflowSection />
      <AnalyticsSection />
    </div>
  );
}
