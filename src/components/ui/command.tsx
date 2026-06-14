"use client";

import {
  forwardRef,
  useState,
  useEffect,
  type ReactNode,
  type HTMLAttributes,
  type InputHTMLAttributes,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface CommandProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  label?: string;
}

function Command({
  className,
  children,
  open,
  onOpenChange,
  label = "Search",
  ...props
}: CommandProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;

  const setOpen = (value: boolean) => {
    if (!isControlled) setInternalOpen(value);
    onOpenChange?.(value);
  };

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(!isOpen);
      }
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <div className={cn("relative", className)} {...props}>
      {children}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]"
          >
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className={cn(
                "relative w-full max-w-lg overflow-hidden rounded-3xl",
                "bg-white/10 backdrop-blur-2xl border border-white/20",
                "shadow-float z-50"
              )}
              role="dialog"
              aria-label={label}
            >
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface CommandInputProps extends InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string;
}

const CommandInput = forwardRef<HTMLInputElement, CommandInputProps>(
  ({ className, containerClassName, ...props }, ref) => {
    return (
      <div
        className={cn(
          "flex items-center gap-2 border-b border-white/10 px-4",
          containerClassName
        )}
      >
        <Search className="w-4 h-4 shrink-0 text-foreground/40" />
        <input
          ref={ref}
          className={cn(
            "flex h-12 w-full bg-transparent py-3 text-sm font-nunito",
            "placeholder:text-foreground/30 outline-none",
            className
          )}
          autoFocus
          {...props}
        />
      </div>
    );
  }
);

CommandInput.displayName = "CommandInput";

interface CommandListProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const CommandList = forwardRef<HTMLDivElement, CommandListProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("max-h-80 overflow-y-auto p-2", className)}
      {...props}
    >
      {children}
    </div>
  )
);

CommandList.displayName = "CommandList";

interface CommandEmptyProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

const CommandEmpty = forwardRef<HTMLDivElement, CommandEmptyProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("py-6 text-center text-sm font-nunito text-foreground/40", className)}
      {...props}
    >
      {children || "No results found."}
    </div>
  )
);

CommandEmpty.displayName = "CommandEmpty";

interface CommandGroupProps extends HTMLAttributes<HTMLDivElement> {
  heading?: string;
  children: ReactNode;
}

const CommandGroup = forwardRef<HTMLDivElement, CommandGroupProps>(
  ({ className, heading, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("", className)}
      role="group"
      {...props}
    >
      {heading && (
        <div className="px-3 py-1.5 text-xs font-nunito font-semibold text-foreground/40 uppercase tracking-wider">
          {heading}
        </div>
      )}
      {children}
    </div>
  )
);

CommandGroup.displayName = "CommandGroup";

interface CommandItemProps {
  value?: string;
  onSelect?: (value: string) => void;
  icon?: ReactNode;
  keywords?: string[];
  children: ReactNode;
  className?: string;
}

const CommandItem = forwardRef<HTMLDivElement, CommandItemProps>(
  ({ className, value, onSelect, icon, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative flex cursor-default items-center gap-2 rounded-xl px-3 py-2.5",
          "text-sm font-nunito text-foreground/80 outline-none",
          "transition-colors hover:bg-white/10 hover:text-foreground",
          "aria-selected:bg-white/10 aria-selected:text-foreground",
          "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
          className
        )}
        role="option"
        aria-selected={false}
        onClick={() => onSelect?.(value || "")}
        {...props}
      >
        {icon && <span className="shrink-0 w-4 h-4 text-foreground/50">{icon}</span>}
        <span className="flex-1 truncate">{children}</span>
      </div>
    );
  }
);

CommandItem.displayName = "CommandItem";

interface CommandShortcutProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
}

const CommandShortcut = forwardRef<HTMLSpanElement, CommandShortcutProps>(
  ({ className, children, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "ml-auto text-xs text-foreground/30 font-nunito tracking-widest",
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
);

CommandShortcut.displayName = "CommandShortcut";

interface CommandSeparatorProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const CommandSeparator = forwardRef<HTMLDivElement, CommandSeparatorProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("h-px mx-2 my-1 bg-white/10", className)}
      {...props}
    />
  )
);

CommandSeparator.displayName = "CommandSeparator";

export {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};
