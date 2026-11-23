"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useDemoModal } from "./DemoModalContext";

type DemoRequestButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  source?: string;
  children: ReactNode;
};

export function DemoRequestButton({
  source = "website",
  className,
  children,
  onClick,
  type = "button",
  ...props
}: DemoRequestButtonProps) {
  const { openDemo } = useDemoModal();

  return (
    <button
      type={type}
      className={cn(className)}
      {...props}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          openDemo(source);
        }
      }}
    >
      {children}
    </button>
  );
}
