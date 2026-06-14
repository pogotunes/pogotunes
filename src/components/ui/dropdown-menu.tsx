"use client";

import {
  forwardRef,
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  type ReactNode,
  type HTMLAttributes,
  type ButtonHTMLAttributes,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface DropdownMenuContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DropdownMenuContext = createContext<DropdownMenuContextValue | null>(null);

function useDropdownMenu() {
  const context = useContext(DropdownMenuContext);
  if (!context) {
    throw new Error("DropdownMenu components must be within a DropdownMenu");
  }
  return context;
}

interface DropdownMenuProps {
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

function DropdownMenu({ children, open: controlledOpen, onOpenChange }: DropdownMenuProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;

  const setOpen = (value: boolean) => {
    if (!isControlled) setInternalOpen(value);
    onOpenChange?.(value);
  };

  return (
    <DropdownMenuContext.Provider value={{ open, setOpen }}>
      {children}
    </DropdownMenuContext.Provider>
  );
}

interface DropdownMenuTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  children: ReactNode;
}

const DropdownMenuTrigger = forwardRef<HTMLButtonElement, DropdownMenuTriggerProps>(
  ({ className, children, ...props }, ref) => {
    const { open, setOpen } = useDropdownMenu();

    return (
      <button
        ref={ref}
        className={cn("inline-flex items-center", className)}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="menu"
        {...props}
      >
        {children}
      </button>
    );
  }
);

DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

interface DropdownMenuContentProps {
  align?: "start" | "center" | "end";
  sideOffset?: number;
  children: ReactNode;
  className?: string;
}

const DropdownMenuContent = forwardRef<HTMLDivElement, DropdownMenuContentProps>(
  ({ className, align = "center", sideOffset = 8, children }, ref) => {
    const { open, setOpen } = useDropdownMenu();
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (
          contentRef.current &&
          !contentRef.current.contains(event.target as Node)
        ) {
          setOpen(false);
        }
      }

      function handleEscape(event: KeyboardEvent) {
        if (event.key === "Escape") setOpen(false);
      }

      if (open) {
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("keydown", handleEscape);
      };
    }, [open, setOpen]);

    const alignClass =
      align === "start"
        ? "left-0"
        : align === "end"
          ? "right-0"
          : "left-1/2 -translate-x-1/2";

    return (
      <AnimatePresence>
        {open && (
          <motion.div
            ref={(node) => {
              if (typeof ref === "function") ref(node);
              else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
              (contentRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
            }}
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.15 }}
            style={{ marginTop: sideOffset }}
            className={cn(
              "absolute z-50 min-w-[12rem] p-1.5",
              "bg-white/10 backdrop-blur-2xl border border-white/20",
              "rounded-2xl shadow-float",
              alignClass,
              className
            )}
            role="menu"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);

DropdownMenuContent.displayName = "DropdownMenuContent";

interface DropdownMenuItemProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  inset?: boolean;
  icon?: ReactNode;
  children: ReactNode;
}

const DropdownMenuItem = forwardRef<HTMLButtonElement, DropdownMenuItemProps>(
  ({ className, inset, icon, children, ...props }, ref) => {
    const { setOpen } = useDropdownMenu();

    return (
      <button
        ref={ref}
        className={cn(
          "relative flex w-full cursor-default items-center gap-2 rounded-xl px-3 py-2",
          "text-sm font-nunito text-foreground/80 outline-none",
          "transition-colors hover:bg-white/10 hover:text-foreground",
          "focus-visible:bg-white/10 focus-visible:text-foreground",
          "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
          inset && "pl-8",
          className
        )}
        role="menuitem"
        onClick={(e) => {
          props.onClick?.(e);
          setOpen(false);
        }}
        {...props}
      >
        {icon && <span className="shrink-0 w-4 h-4 text-foreground/50">{icon}</span>}
        {children}
      </button>
    );
  }
);

DropdownMenuItem.displayName = "DropdownMenuItem";

interface DropdownMenuSeparatorProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const DropdownMenuSeparator = forwardRef<HTMLDivElement, DropdownMenuSeparatorProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("h-px my-1.5 bg-white/10", className)}
      role="separator"
      {...props}
    />
  )
);

DropdownMenuSeparator.displayName = "DropdownMenuSeparator";

interface DropdownMenuLabelProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const DropdownMenuLabel = forwardRef<HTMLDivElement, DropdownMenuLabelProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "px-3 py-1.5 text-xs font-nunito font-semibold text-foreground/40 uppercase tracking-wider",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);

DropdownMenuLabel.displayName = "DropdownMenuLabel";

interface DropdownMenuGroupProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const DropdownMenuGroup = forwardRef<HTMLDivElement, DropdownMenuGroupProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn("", className)} role="group" {...props}>
      {children}
    </div>
  )
);

DropdownMenuGroup.displayName = "DropdownMenuGroup";

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuGroup,
};
