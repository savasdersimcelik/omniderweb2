import { AdReferralSection } from "./AdReferralSection";
import { CommentsSection } from "./CommentsSection";
import { InboxSection } from "./InboxSection";
import { InstagramHero } from "./InstagramHero";
import { InteractiveSection } from "./InteractiveSection";
import { PublishSection } from "./PublishSection";
import { TrySection } from "./TrySection";

export async function InstagramPage() {
  return (
    <>
      <InstagramHero />
      <InboxSection />
      <InteractiveSection />
      <CommentsSection />
      <PublishSection />
      <AdReferralSection />
      <TrySection />
    </>
  );
}
