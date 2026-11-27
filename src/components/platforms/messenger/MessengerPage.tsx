import "./messenger-colors.css";

import { AdReferralSection } from "./AdReferralSection";
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
      <CommentsSection />
      <PublishSection />
      <AdReferralSection />
      <TrySection />
    </div>
  );
}
