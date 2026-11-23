"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type OrbitingCirclesProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
  children?: React.ReactNode;
  reverse?: boolean;
  duration?: number;
  delay?: number;
  radius?: number;
  path?: boolean;
  iconSize?: number;
  speed?: number;
  stroke?: string;
};

export function OrbitingCircles({
  className,
  children,
  reverse,
  duration = 20,
  radius = 160,
  path = true,
  iconSize = 30,
  speed = 1,
  stroke,
  ...props
}: OrbitingCirclesProps) {
  const calculatedDuration = duration / speed;
  const count = React.Children.count(children);

  return (
    <>
      {path ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className="pointer-events-none absolute inset-0 size-full"
          aria-hidden
        >
          <circle
            className={cn("stroke-1", stroke ?? "stroke-brand-200/70")}
            strokeDasharray="5 5"
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
          />
        </svg>
      ) : null}

      {count > 0
        ? React.Children.map(children, (child, index) => {
            const angle = (360 / count) * index;
            return (
              <div
                style={
                  {
                    "--duration": calculatedDuration,
                    "--radius": radius,
                    "--angle": angle,
                    "--icon-size": `${iconSize}px`,
                  } as React.CSSProperties
                }
                className={cn(
                  "absolute top-1/2 left-1/2 flex size-[var(--icon-size)] transform-gpu animate-orbit items-center justify-center rounded-full [margin-block:calc(var(--icon-size)/-2)] [margin-inline:calc(var(--icon-size)/-2)]",
                  reverse && "[animation-direction:reverse]",
                  className,
                )}
                {...props}
              >
                {child}
              </div>
            );
          })
        : null}
    </>
  );
}
