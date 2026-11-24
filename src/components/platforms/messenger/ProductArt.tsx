type ProductArtProps = {
  tone: "bag" | "shoe" | "watch";
};

export function ProductArt({ tone }: ProductArtProps) {
  if (tone === "shoe") {
    return (
      <svg viewBox="0 0 160 108" aria-hidden>
        <ellipse cx="84" cy="96" rx="40" ry="5" fill="rgb(0 0 0 / 0.14)" />
        <path
          fill="#f7efe4"
          d="M38 72c8-18 22-28 46-28 18 0 28 6 42 16 8 6 16 10 20 18-18 4-46 8-78 2-16-3-28-4-30-8Z"
        />
        <path
          fill="#e8d5bc"
          d="M42 70c6-4 16-6 28-6 3 8-2 16-12 18-10 1-18-4-16-12Z"
        />
        <path
          fill="none"
          stroke="#cbb79a"
          strokeWidth="1.6"
          d="M72 48c8 8 10 18 8 28"
        />
        <path
          fill="#d9c2a4"
          d="M118 76c10 2 22 6 28 12H44c2-6 12-10 28-12 18-2 32 0 46 0Z"
        />
      </svg>
    );
  }

  if (tone === "watch") {
    return (
      <svg viewBox="0 0 160 108" aria-hidden>
        <ellipse cx="80" cy="98" rx="28" ry="4" fill="rgb(0 0 0 / 0.2)" />
        <rect x="70" y="14" width="20" height="22" rx="4" fill="#d7dde8" />
        <rect x="70" y="72" width="20" height="22" rx="4" fill="#d7dde8" />
        <circle cx="80" cy="54" r="22" fill="#f4f7fb" stroke="#c5d0de" strokeWidth="3" />
        <circle cx="80" cy="54" r="3" fill="#94a3b8" />
        <path stroke="#334155" strokeWidth="2" strokeLinecap="round" d="M80 54V40" />
        <path stroke="#64748b" strokeWidth="1.7" strokeLinecap="round" d="M80 54l10 6" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 160 108" aria-hidden>
      <ellipse cx="80" cy="96" rx="36" ry="5" fill="rgb(0 0 0 / 0.16)" />
      <path
        fill="#f3e6d8"
        d="M52 44h56c6 0 10 5 11 11l6 34c1 6-3 11-9 11H44c-6 0-10-5-9-11l6-34c1-6 5-11 11-11Z"
      />
      <path
        fill="none"
        stroke="#c4a07a"
        strokeWidth="4"
        strokeLinecap="round"
        d="M64 46c1-16 32-16 32 0"
      />
      <path
        fill="#e2c8ae"
        d="M70 58h20c2 0 3 1 3 3v8c0 4-5 7-13 7s-13-3-13-7v-8c0-2 1-3 3-3Z"
      />
    </svg>
  );
}
