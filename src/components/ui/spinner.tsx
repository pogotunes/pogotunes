"use client";

import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const spinnerVariants = cva(
  "animate-spin rounded-full border-2 border-current border-t-transparent",
  {
    variants: {
      size: {
        xs: "w-3 h-3 border-[1.5px]",
        sm: "w-4 h-4 border-2",
        md: "w-6 h-6 border-2",
        lg: "w-8 h-8 border-3",
        xl: "w-12 h-12 border-3",
      },
      color: {
        coral: "text-coral",
        yellow: "text-yellow",
        sky: "text-sky-blue",
        purple: "text-purple",
        green: "text-green",
        white: "text-white",
        foreground: "text-foreground",
      },
    },
    defaultVariants: {
      size: "md",
      color: "coral",
    },
  }
);

interface SpinnerProps
  extends VariantProps<typeof spinnerVariants> {
  label?: string;
  className?: string;
}

const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, size, color, label }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("inline-flex items-center gap-2", className)}
        role="status"
        aria-label={label || "Loading"}
      >
        <div className={cn(spinnerVariants({ size, color }))} />
        {label && (
          <span className="text-sm font-nunito font-semibold text-foreground/60">
            {label}
          </span>
        )}
      </div>
    );
  }
);

Spinner.displayName = "Spinner";

export { Spinner, spinnerVariants };
export type { SpinnerProps };
