"use client";

import { ThemeProvider } from "@mui/material/styles";
import type { ReactNode } from "react";

import { bestTheme } from "@/theme/BestTheme";

export function BestThemeProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      theme={bestTheme}
      defaultMode="light"
      modeStorageKey="best-lc-theme"
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
