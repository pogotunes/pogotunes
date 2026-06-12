"use client";

import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  containerClassName?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      error,
      icon,
      iconPosition = "left",
      containerClassName,
      id,
      placeholder,
      ...props
    },
    ref
  ) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className={cn("relative", containerClassName)}>
        {icon && (
          <div
            className={cn(
              "absolute top-1/2 -translate-y-1/2 text-foreground/40 pointer-events-none z-10",
              iconPosition === "left" ? "left-4" : "right-4"
            )}
          >
            {icon}
          </div>
        )}
        <input
          ref={ref}
          id={inputId}
          placeholder={placeholder || (label ? " " : undefined)}
          className={cn(
            "peer w-full rounded-2xl border-2 border-white/20 bg-white/10 px-4 py-3.5",
            "font-nunito text-foreground placeholder:text-foreground/30",
            "backdrop-blur-lg transition-all duration-300",
            "focus:border-coral focus:bg-white/15 focus:outline-none focus:shadow-glow-coral",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error &&
              "border-red-400 focus:border-red-500 focus:shadow-[0_0_20px_rgba(239,68,68,0.3)]",
            icon && iconPosition === "left" && "pl-12",
            icon && iconPosition === "right" && "pr-12",
            label && "pt-6 pb-2",
            className
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "absolute left-4 top-4 font-nunito text-sm text-foreground/50",
              "transition-all duration-300 pointer-events-none",
              "peer-focus:top-2 peer-focus:text-xs peer-focus:text-coral",
              "peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm",
              "peer-focus:peer-placeholder-shown:top-2 peer-focus:peer-placeholder-shown:text-xs"
            )}
          >
            {label}
          </label>
        )}
        {error && (
          <motion.p
            id={`${inputId}-error`}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1.5 ml-1 text-sm text-red-400 font-nunito"
            role="alert"
          >
            {error}
          </motion.p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
export type { InputProps };
