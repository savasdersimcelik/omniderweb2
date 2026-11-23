import Image from "next/image";

export function OmniderAuthMark({ className }: { className?: string }) {
  return (
    <Image
      src="/icons/icon-192.png"
      alt="Omnider"
      width={56}
      height={56}
      className={className ?? "h-full w-full object-contain"}
      priority
    />
  );
}
