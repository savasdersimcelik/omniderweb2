import { AdReferralSection } from "./AdReferralSection";
import { CommentsSection } from "./CommentsSection";
import { InteractiveSection } from "./InteractiveSection";
import { MessengerHero } from "./MessengerHero";
import { PublishSection } from "./PublishSection";
import { TrySection } from "./TrySection";

export async function MessengerPage() {
  return (
    <>
      <MessengerHero />
      <InteractiveSection />
      <CommentsSection />
      <PublishSection />
      <AdReferralSection />
      <TrySection />
    </>
  );
}
