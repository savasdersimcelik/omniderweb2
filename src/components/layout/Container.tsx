import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type ContainerProps = ComponentProps<"div"> & {
  as?: "div" | "section" | "nav";
};

export function Container({
  as: Comp = "div",
  className,
  ...props
}: ContainerProps) {
  return <Comp className={cn("container-page", className)} {...props} />;
}
