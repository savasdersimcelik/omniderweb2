import { AdReferralSection } from "./AdReferralSection";
import { CommentsSection } from "./CommentsSection";
import { InstagramHero } from "./InstagramHero";
import { ModerationSection } from "./ModerationSection";
import { PublishSection } from "./PublishSection";
import { TrySection } from "./TrySection";

export async function InstagramPage() {
  return (
    <>
      <InstagramHero />
      <CommentsSection />
      <ModerationSection />
      <PublishSection />
      <AdReferralSection />
      <TrySection />
    </>
  );
}
