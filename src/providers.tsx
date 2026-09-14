"use client";

import type { ReactNode } from "react";

import { Toaster } from "@/components/ui/sonner";
import { StoreProvider } from "@/lib/store";
import { ThemeProvider } from "@/lib/theme";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <StoreProvider>
        {children}
        <Toaster richColors position="top-right" />
      </StoreProvider>
    </ThemeProvider>
  );
}