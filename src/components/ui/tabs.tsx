"use client";

import {
  forwardRef,
  createContext,
  useContext,
  useState,
  type ReactNode,
  type HTMLAttributes,
  type ButtonHTMLAttributes,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (value: string) => void;
  variant?: "underline" | "pills" | "glass";
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabs() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs components must be used within a Tabs");
  }
  return context;
}

interface TabsProps {
  defaultValue: string;
  value?: string;
  onValueChange?: (value: string) => void;
  variant?: "underline" | "pills" | "glass";
  className?: string;
  children: ReactNode;
}

function Tabs({
  defaultValue,
  value,
  onValueChange,
  variant = "underline",
  className,
  children,
}: TabsProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const activeTab = value ?? internalValue;

  const setActiveTab = (tabValue: string) => {
    if (!value) setInternalValue(tabValue);
    onValueChange?.(tabValue);
  };

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab, variant }}>
      <div className={cn("w-full", className)}>{children}</div>
    </TabsContext.Provider>
  );
}

interface TabsListProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, children, ...props }, ref) => {
    const { variant } = useTabs();
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center gap-1",
          variant === "underline" && "border-b-2 border-white/10",
          variant === "pills" && "bg-white/10 rounded-2xl p-1.5",
          variant === "glass" &&
            "glass rounded-2xl p-1.5",
          className
        )}
        role="tablist"
        {...props}
      >
        {children}
      </div>
    );
  }
);

TabsList.displayName = "TabsList";

interface TabsTriggerProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "value"> {
  value: string;
  children: ReactNode;
  icon?: ReactNode;
}

const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, children, icon, ...props }, ref) => {
    const { activeTab, setActiveTab, variant } = useTabs();
    const isActive = activeTab === value;

    return (
      <button
        ref={ref}
        className={cn(
          "relative inline-flex items-center gap-2 font-nunito font-semibold text-sm",
          "transition-all duration-300 select-none whitespace-nowrap",
          "focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-purple",
          variant === "underline" &&
            "px-4 py-2.5 text-foreground/60 hover:text-foreground",
          variant === "underline" && isActive && "text-coral",
          variant === "pills" &&
            "px-4 py-2 rounded-xl text-foreground/60 hover:text-foreground",
          variant === "pills" && isActive && "text-white",
          variant === "glass" &&
            "px-4 py-2 rounded-xl text-foreground/60 hover:text-foreground",
          variant === "glass" && isActive && "text-foreground",
          className
        )}
        onClick={() => setActiveTab(value)}
        role="tab"
        aria-selected={isActive}
        {...props}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        {children}
        {variant === "underline" && isActive && (
          <motion.div
            layoutId="tab-underline"
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-coral rounded-full"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
        {variant === "pills" && isActive && (
          <motion.div
            layoutId="tab-pill"
            className="absolute inset-0 bg-gradient-to-r from-coral to-purple rounded-xl"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{ zIndex: -1 }}
          />
        )}
        {variant === "glass" && isActive && (
          <motion.div
            layoutId="tab-glass"
            className="absolute inset-0 bg-white/20 rounded-xl backdrop-blur-sm"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{ zIndex: -1 }}
          />
        )}
      </button>
    );
  }
);

TabsTrigger.displayName = "TabsTrigger";

interface TabsContentProps {
  value: string;
  children: ReactNode;
  className?: string;
}

const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, children }, ref) => {
    const { activeTab } = useTabs();

    return (
      <AnimatePresence mode="wait">
        {activeTab === value && (
          <motion.div
            ref={ref}
            key={value}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={cn("mt-4", className)}
            role="tabpanel"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);

TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent };
