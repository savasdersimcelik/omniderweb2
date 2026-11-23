"use client";

export function HomeHeroBackdrop() {
  return (
    <div className="home-hero__bg" aria-hidden>
      <div className="home-hero__glow home-hero__glow--a" />
      <div className="home-hero__glow home-hero__glow--b" />
      <div className="home-hero__glow home-hero__glow--c" />
      <div className="home-hero__beam" />
      <div className="home-hero__mesh" />
      <svg
        className="home-hero__hills"
        viewBox="0 0 1440 520"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="home-hill-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.14" />
            <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="home-hill-stroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0" />
            <stop offset="40%" stopColor="#6366f1" stopOpacity="0.35" />
            <stop offset="70%" stopColor="#0ea5e9" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#64748b" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          className="home-hero__hill home-hero__hill--back"
          fill="url(#home-hill-fill)"
          d="M0 320 C 180 260 320 380 520 300 C 720 220 860 340 1040 280 C 1220 220 1340 300 1440 250 L 1440 520 L 0 520 Z"
        />
        <path
          className="home-hero__hill home-hero__hill--mid"
          fill="url(#home-hill-fill)"
          d="M0 360 C 200 300 360 420 560 340 C 760 260 900 380 1100 320 C 1260 270 1360 340 1440 310 L 1440 520 L 0 520 Z"
        />
        <path
          className="home-hero__hill home-hero__hill--front"
          fill="none"
          stroke="url(#home-hill-stroke)"
          strokeWidth="1.4"
          d="M0 390 C 220 330 380 450 580 370 C 780 290 920 410 1120 350 C 1280 300 1380 370 1440 340"
        />
      </svg>
      <div className="home-hero__scrim" />
    </div>
  );
}
