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
            <stop offset="0%" stopColor="#026450" stopOpacity="0.26" />
            <stop offset="48%" stopColor="#026450" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#026450" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="wa-hill-fill-mid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#03856a" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#026450" stopOpacity="0.06" />
          </linearGradient>
          <linearGradient id="wa-hill-stroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#026450" stopOpacity="0" />
            <stop offset="28%" stopColor="#026450" stopOpacity="0.5" />
            <stop offset="55%" stopColor="#03856a" stopOpacity="0.42" />
            <stop offset="78%" stopColor="#026450" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#026450" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          className="wa-biz-hero__hill wa-biz-hero__hill--back"
          fill="url(#wa-hill-fill)"
          d="M0 300 C 160 240 300 360 480 280 C 680 190 820 330 1000 250 C 1180 170 1320 280 1440 230 L 1440 520 L 0 520 Z"
        />
        <path
          className="wa-biz-hero__hill wa-biz-hero__hill--mid"
          fill="url(#wa-hill-fill-mid)"
          d="M0 350 C 190 290 340 410 540 330 C 740 250 880 390 1080 320 C 1240 270 1340 350 1440 315 L 1440 520 L 0 520 Z"
        />
        <path
          className="wa-biz-hero__hill wa-biz-hero__hill--front"
          fill="none"
          stroke="url(#wa-hill-stroke)"
          strokeWidth="1.5"
          d="M0 400 C 210 340 370 460 570 375 C 770 290 910 420 1110 355 C 1270 305 1370 375 1440 345"
        />
      </svg>
      <div className="wa-biz-hero__scrim" />
    </div>
  );
}
