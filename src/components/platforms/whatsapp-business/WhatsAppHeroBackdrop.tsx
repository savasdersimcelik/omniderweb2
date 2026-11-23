"use client";

export function WhatsAppHeroBackdrop() {
  return (
    <div className="wa-biz-hero__bg" aria-hidden>
      <div className="wa-biz-hero__glow wa-biz-hero__glow--a" />
      <div className="wa-biz-hero__glow wa-biz-hero__glow--b" />
      <div className="wa-biz-hero__glow wa-biz-hero__glow--c" />
      <div className="wa-biz-hero__beam" />
      <div className="wa-biz-hero__mesh" />
      <svg
        className="wa-biz-hero__hills"
        viewBox="0 0 1440 520"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="wa-hill-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#25d366" stopOpacity="0.22" />
            <stop offset="55%" stopColor="#128c7e" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#075e54" stopOpacity="0.04" />
          </linearGradient>
          <linearGradient id="wa-hill-stroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#25d366" stopOpacity="0" />
            <stop offset="35%" stopColor="#25d366" stopOpacity="0.45" />
            <stop offset="65%" stopColor="#128c7e" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#075e54" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          className="wa-biz-hero__hill wa-biz-hero__hill--back"
          fill="url(#wa-hill-fill)"
          d="M0 320 C 180 260 320 380 520 300 C 720 220 860 340 1040 280 C 1220 220 1340 300 1440 250 L 1440 520 L 0 520 Z"
        />
        <path
          className="wa-biz-hero__hill wa-biz-hero__hill--mid"
          fill="url(#wa-hill-fill)"
          d="M0 360 C 200 300 360 420 560 340 C 760 260 900 380 1100 320 C 1260 270 1360 340 1440 310 L 1440 520 L 0 520 Z"
        />
        <path
          className="wa-biz-hero__hill wa-biz-hero__hill--front"
          fill="none"
          stroke="url(#wa-hill-stroke)"
          strokeWidth="1.4"
          d="M0 390 C 220 330 380 450 580 370 C 780 290 920 410 1120 350 C 1280 300 1380 370 1440 340"
        />
      </svg>
      <div className="wa-biz-hero__scrim" />
    </div>
  );
}
