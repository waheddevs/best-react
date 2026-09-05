"use client";

import { ThemeProvider } from "@mui/material/styles";
import type { ReactNode } from "react";

import { studentTheme } from "@/theme/StudentTheme";

export function StudentThemeProvider({ children }: { children: ReactNode }) {
  return <ThemeProvider theme={studentTheme}>{children}</ThemeProvider>;
}
