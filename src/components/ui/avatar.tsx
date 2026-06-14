"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn, getInitials } from "@/lib/utils";

const avatarVariants = cva(
  [
    "relative inline-flex items-center justify-center shrink-0",
    "rounded-full overflow-hidden font-baloo font-bold",
  ].join(" "),
  {
    variants: {
      size: {
        xs: "w-6 h-6 text-xs",
        sm: "w-8 h-8 text-sm",
        md: "w-10 h-10 text-base",
        lg: "w-14 h-14 text-xl",
        xl: "w-20 h-20 text-2xl",
        "2xl": "w-28 h-28 text-3xl",
      },
      ringColor: {
        coral: "ring-2 ring-coral ring-offset-2 ring-offset-warm-cream",
        yellow: "ring-2 ring-yellow ring-offset-2 ring-offset-warm-cream",
        sky: "ring-2 ring-sky-blue ring-offset-2 ring-offset-warm-cream",
        purple: "ring-2 ring-purple ring-offset-2 ring-offset-warm-cream",
        green: "ring-2 ring-green ring-offset-2 ring-offset-warm-cream",
        white: "ring-2 ring-white/50 ring-offset-2 ring-offset-transparent",
        none: "",
      },
    },
    defaultVariants: {
      size: "md",
      ringColor: "none",
    },
  }
);

interface AvatarProps
  extends VariantProps<typeof avatarVariants> {
  src?: string;
  alt?: string;
  name?: string;
  status?: "online" | "offline" | "away" | "busy";
  className?: string;
}

const statusColors: Record<string, string> = {
  online: "bg-green",
  offline: "bg-gray-400",
  away: "bg-yellow",
  busy: "bg-coral",
};

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, alt, name, size, ringColor, status, className }, ref) => {
    const initials = name ? getInitials(name) : "?";

    return (
      <motion.div
        ref={ref}
        className={cn(avatarVariants({ size, ringColor, className }))}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {src ? (
          <img
            src={src}
            alt={alt || name || "Avatar"}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.currentTarget;
              target.style.display = "none";
              target.nextElementSibling?.classList.remove("hidden");
            }}
          />
        ) : null}
        <div
          className={cn(
            "w-full h-full flex items-center justify-center bg-gradient-to-br from-coral to-purple text-white",
            src ? "hidden" : ""
          )}
        >
          {initials}
        </div>
        {status && (
          <span
            className={cn(
              "absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-warm-cream",
              statusColors[status]
            )}
          />
        )}
      </motion.div>
    );
  }
);

Avatar.displayName = "Avatar";

export { Avatar };
export type { AvatarProps };
