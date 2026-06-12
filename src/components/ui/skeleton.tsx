"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "circular" | "rectangular" | "card";
}

const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant = "text", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden bg-white/10 rounded-2xl",
          "before:absolute before:inset-0 before:-translate-x-full",
          "before:animate-[shimmer_1.5s_infinite]",
          "before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent",
          variant === "text" && "h-4 w-full rounded-md",
          variant === "circular" && "rounded-full aspect-square",
          variant === "rectangular" && "aspect-video rounded-2xl",
          variant === "card" && "h-48 w-full rounded-2xl",
          className
        )}
        {...props}
      />
    );
  }
);

Skeleton.displayName = "Skeleton";

interface SkeletonGroupProps extends HTMLAttributes<HTMLDivElement> {
  count?: number;
  variant?: "text" | "circular" | "rectangular" | "card";
}

const SkeletonGroup = forwardRef<HTMLDivElement, SkeletonGroupProps>(
  ({ className, count = 3, variant = "text", ...props }, ref) => {
    return (
      <div ref={ref} className={cn("space-y-3", className)} {...props}>
        {Array.from({ length: count }).map((_, i) => (
          <Skeleton key={i} variant={variant} />
        ))}
      </div>
    );
  }
);

SkeletonGroup.displayName = "SkeletonGroup";

export { Skeleton, SkeletonGroup };
export type { SkeletonProps, SkeletonGroupProps };
