"use client";

import { ThemeProvider } from "@mui/material/styles";
import type { ReactNode } from "react";

import { adminTheme } from "@/theme/AdminTheme";

export function AdminThemeProvider({ children }: { children: ReactNode }) {
  return <ThemeProvider theme={adminTheme}>{children}</ThemeProvider>;
}
