"use client";

import dynamic from "next/dynamic";
import type { LottieComponentProps } from "lottie-react";
import { cn } from "@/lib/utils";

const LottiePlayer = dynamic(() => import("lottie-react"), {
  ssr: false,
});

type LottieProps = LottieComponentProps & {
  className?: string;
};

export function Lottie({ className, ...props }: LottieProps) {
  return (
    <div className={cn("pointer-events-none", className)}>
      <LottiePlayer {...props} />
    </div>
  );
}
