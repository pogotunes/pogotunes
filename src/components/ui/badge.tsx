"use client";

import { forwardRef, type ReactNode } from "react";
import { motion, type Variants } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  [
    "inline-flex items-center gap-1.5 font-nunito font-semibold",
    "rounded-full transition-all duration-200 select-none",
  ].join(" "),
  {
    variants: {
      variant: {
        coral:
          "bg-coral/15 text-coral border border-coral/30",
        yellow:
          "bg-yellow/15 text-yellow-dark border border-yellow/30",
        sky: "bg-sky-blue/15 text-sky-blue-dark border border-sky-blue/30",
        purple:
          "bg-purple/15 text-purple border border-purple/30",
        green:
          "bg-green/15 text-green-dark border border-green/30",
        white:
          "bg-white/20 text-white border border-white/30",
        ghost:
          "bg-transparent text-foreground/70 border border-transparent",
        outline:
          "bg-transparent text-foreground border border-foreground/20",
      },
      size: {
        sm: "px-2.5 py-0.5 text-xs",
        md: "px-3 py-1 text-sm",
        lg: "px-4 py-1.5 text-base",
      },
      dot: {
        true: "relative",
      },
    },
    defaultVariants: {
      variant: "coral",
      size: "md",
    },
  }
);

interface BadgeProps
  extends VariantProps<typeof badgeVariants> {
  dot?: boolean;
  dotColor?: string;
  children?: ReactNode;
  className?: string;
}

const variants: Variants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    { className, variant, size, dot, dotColor, children },
    ref
  ) => {
    return (
      <motion.span
        ref={ref}
        className={cn(badgeVariants({ variant, size, dot, className }))}
        variants={variants}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.2 }}
      >
        {dot && (
          <span
            className={cn(
              "inline-block w-2 h-2 rounded-full",
              dotColor || "bg-current"
            )}
          />
        )}
        {children}
      </motion.span>
    );
  }
);

Badge.displayName = "Badge";

export { Badge, badgeVariants };
export type { BadgeProps };
