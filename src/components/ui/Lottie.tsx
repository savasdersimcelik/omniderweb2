"use client";

import dynamic from "next/dynamic";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const LottiePlayer = dynamic(
  () => import("lottie-react").then((mod) => mod.Lottie),
  { ssr: false },
);

type LottieProps = ComponentProps<typeof LottiePlayer> & {
  className?: string;
};

export function Lottie({ className, ...props }: LottieProps) {
  return (
    <div className={cn("pointer-events-none", className)}>
      <LottiePlayer {...props} />
    </div>
  );
}
