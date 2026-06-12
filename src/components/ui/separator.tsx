"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface SeparatorProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  variant?: "solid" | "gradient" | "glass";
}

const Separator = forwardRef<HTMLDivElement, SeparatorProps>(
  (
    {
      className,
      orientation = "horizontal",
      variant = "glass",
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "shrink-0",
          orientation === "horizontal" ? "w-full h-px" : "h-full w-px",
          variant === "solid" && "bg-foreground/10",
          variant === "gradient" &&
            "bg-gradient-to-r from-transparent via-foreground/20 to-transparent",
          variant === "glass" && "bg-white/10",
          className
        )}
        role="separator"
        aria-orientation={orientation}
        {...props}
      />
    );
  }
);

Separator.displayName = "Separator";

export { Separator };
export type { SeparatorProps };
