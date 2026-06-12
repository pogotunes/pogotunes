"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProgressProps {
  value?: number;
  max?: number;
  label?: string;
  showPercentage?: boolean;
  variant?: "coral" | "yellow" | "sky" | "purple" | "green" | "rainbow";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const variantColors: Record<string, string> = {
  coral: "bg-coral shadow-glow-coral",
  yellow: "bg-yellow shadow-glow-yellow",
  sky: "bg-sky-blue shadow-glow-blue",
  purple: "bg-purple shadow-glow-purple",
  green: "bg-green shadow-glow-green",
  rainbow: "gradient-rainbow",
};

const sizeHeights: Record<string, string> = {
  sm: "h-2",
  md: "h-3",
  lg: "h-4",
};

const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      value = 0,
      max = 100,
      label,
      showPercentage = false,
      variant = "coral",
      size = "md",
      className,
    },
    ref
  ) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    return (
      <div ref={ref} className={cn("w-full space-y-1.5", className)}>
        {(label || showPercentage) && (
          <div className="flex justify-between items-center">
            {label && (
              <span className="text-sm font-nunito font-semibold text-foreground/70">
                {label}
              </span>
            )}
            {showPercentage && (
              <span className="text-sm font-nunito font-bold text-coral">
                {Math.round(percentage)}%
              </span>
            )}
          </div>
        )}
        <div
          className={cn(
            "w-full rounded-full bg-white/10 backdrop-blur-sm overflow-hidden",
            sizeHeights[size]
          )}
        >
          <motion.div
            className={cn(
              "h-full rounded-full transition-all duration-500",
              variantColors[variant]
            )}
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1 }}
          />
        </div>
      </div>
    );
  }
);

Progress.displayName = "Progress";

export { Progress };
export type { ProgressProps };
