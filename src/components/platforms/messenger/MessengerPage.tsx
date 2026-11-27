import "./messenger-colors.css";

import { AdReferralSection } from "./AdReferralSection";
import { AiAutomationSection } from "./AiAutomationSection";
import { AnalyticsSection } from "./AnalyticsSection";
import { ChatflowSection } from "./ChatflowSection";
import { CommentsSection } from "./CommentsSection";
import { InboxSection } from "./InboxSection";
import { InteractiveSection } from "./InteractiveSection";
import { MessengerHero } from "./MessengerHero";
import { PublishSection } from "./PublishSection";
import { TrySection } from "./TrySection";

export async function MessengerPage() {
  return (
    <div className="ms-page-atmosphere ms-page">
      <MessengerHero />
      <InboxSection />
      <InteractiveSection />
      <AiAutomationSection />
      <ChatflowSection />
      <CommentsSection />
      <PublishSection />
      <AdReferralSection />
      <AnalyticsSection />
      <TrySection />
    </div>
  );
}
