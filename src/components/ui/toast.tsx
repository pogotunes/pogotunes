"use client";

import { Toaster as HotToaster } from "react-hot-toast";
import { cn } from "@/lib/utils";

function Toaster() {
  return (
    <HotToaster
      position="top-right"
      gutter={12}
      containerClassName="font-nunito"
      toastOptions={{
        duration: 4000,
        style: {
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          borderRadius: "1rem",
          color: "var(--foreground)",
          padding: "1rem 1.25rem",
          fontSize: "0.875rem",
          fontWeight: 600,
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
        },
        success: {
          iconTheme: {
            primary: "#51CF66",
            secondary: "#ffffff",
          },
        },
        error: {
          iconTheme: {
            primary: "#FF6B6B",
            secondary: "#ffffff",
          },
        },
      }}
    />
  );
}

export { Toaster };
