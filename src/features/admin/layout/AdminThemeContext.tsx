"use client";

import { createContext, useContext } from "react";

import type { AdminThemeMode } from "@/types/admin/AdminWorkspace";

type AdminThemeContextValue = {
  mode: AdminThemeMode;
  toggleMode: () => void;
};

export const AdminThemeContext = createContext<AdminThemeContextValue | null>(null);

export function useAdminTheme() {
  const context = useContext(AdminThemeContext);
  if (!context) throw new Error("useAdminTheme must be used within AdminThemeProvider");
  return context;
}
