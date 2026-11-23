import Image from "next/image";
import {
  getPlatformIconSrc,
  type PlatformIconId,
} from "@/config/platforms";
import { cn } from "@/lib/utils";

type PlatformIconProps = {
  name: PlatformIconId | string;
  alt?: string;
  className?: string;
  /** Outer frame size (default h-9 w-9) */
  frameClassName?: string;
  size?: number;
};

export function PlatformIcon({
  name,
  alt = "",
  className,
  frameClassName,
  size = 20,
}: PlatformIconProps) {
  const src = getPlatformIconSrc(name);

  if (!src) return null;

  return (
    <span
      className={cn(
        "flex h-8 w-8 shrink-0 items-center justify-center",
        frameClassName,
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        className="object-contain"
        style={{ width: size, height: size }}
        unoptimized
      />
    </span>
  );
}
