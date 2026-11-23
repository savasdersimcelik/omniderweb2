"use client";

export function InstagramHeroBackdrop() {
  return (
    <div className="ig-hero__bg" aria-hidden>
      <div className="ig-hero__glow ig-hero__glow--a" />
      <div className="ig-hero__glow ig-hero__glow--b" />
      <div className="ig-hero__glow ig-hero__glow--c" />
      <div className="ig-hero__beam" />
      <div className="ig-hero__mesh" />
      <div className="ig-hero__scrim" />
    </div>
  );
}
