"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Spinner } from "./spinner";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 font-nunito font-semibold",
    "rounded-full transition-all duration-300 select-none",
    "focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-purple",
    "disabled:pointer-events-none disabled:opacity-50",
    "magnetic",
  ].join(" "),
  {
    variants: {
      variant: {
        coral:
          "bg-coral text-white shadow-glow-coral hover:bg-coral-light active:bg-coral-dark",
        yellow:
          "bg-yellow text-amber-900 shadow-glow-yellow hover:bg-yellow-light active:bg-yellow-dark",
        sky: "bg-sky-blue text-white shadow-glow-blue hover:bg-sky-blue-light active:bg-sky-blue-dark",
        purple:
          "bg-purple text-white shadow-glow-purple hover:bg-purple-light active:bg-purple-dark",
        green:
          "bg-green text-white shadow-glow-green hover:bg-green-light active:bg-green-dark",
        rainbow:
          "gradient-rainbow text-white shadow-lg hover:shadow-xl",
        glass:
          "glass text-foreground hover:bg-white/25 active:bg-white/10",
        ghost:
          "bg-transparent text-foreground hover:bg-black/5 dark:hover:bg-white/10",
        outline:
          "border-2 border-coral text-coral hover:bg-coral hover:text-white",
        white:
          "bg-white text-gray-800 shadow-soft hover:shadow-card",
      },
      size: {
        xs: "px-3 py-1.5 text-xs gap-1",
        sm: "px-4 py-2 text-sm gap-1.5",
        md: "px-6 py-2.5 text-base gap-2",
        lg: "px-8 py-3 text-lg gap-2",
        xl: "px-10 py-4 text-xl gap-2.5",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "coral",
      size: "md",
    },
  }
);

type MotionButtonProps = HTMLMotionProps<"button">;
type ButtonVariants = VariantProps<typeof buttonVariants>;

interface ButtonProps
  extends Omit<MotionButtonProps, "size">,
    ButtonVariants {
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  children?: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      loading = false,
      icon,
      iconPosition = "left",
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <motion.button
        ref={ref}
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        whileHover={disabled ? undefined : { scale: 1.05 }}
        whileTap={disabled ? undefined : { scale: 0.95 }}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <Spinner
            size="sm"
            color={
              variant === "yellow" || variant === "white" || variant === "glass"
                ? "coral"
                : "white"
            }
          />
        ) : icon && iconPosition === "left" ? (
          <span className="shrink-0">{icon}</span>
        ) : null}
        {children}
        {!loading && icon && iconPosition === "right" ? (
          <span className="shrink-0">{icon}</span>
        ) : null}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
export type { ButtonProps };
