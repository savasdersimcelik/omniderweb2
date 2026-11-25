import Image from "next/image";

export function MessengerHeroBackdrop() {
  return (
    <div className="ms-hero__bg" aria-hidden>
      <Image
        src="/images/platforms/messenger/hero-forest.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="ms-hero__photo"
      />
      <div className="ms-hero__scrim" />
    </div>
  );
}
