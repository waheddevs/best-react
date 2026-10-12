"use client";

import { ThemeProvider } from "@mui/material/styles";
import { useCallback, useEffect, useMemo, useSyncExternalStore, type ReactNode } from "react";

import { AdminThemeContext } from "@/features/admin/layout/AdminThemeContext";
import { createAdminTheme } from "@/theme/AdminTheme";
import type { AdminThemeMode } from "@/types/admin/AdminWorkspace";

const preferenceKey = "best-lc-admin-theme";
const preferenceEvent = "best-lc-admin-theme-change";

function subscribeToThemePreference(handleStoreChange: () => void) {
  window.addEventListener("storage", handleStoreChange);
  window.addEventListener(preferenceEvent, handleStoreChange);
  return () => {
    window.removeEventListener("storage", handleStoreChange);
    window.removeEventListener(preferenceEvent, handleStoreChange);
  };
}

function getThemePreference(): AdminThemeMode {
  return window.localStorage.getItem(preferenceKey) === "dark" ? "dark" : "light";
}

export function AdminThemeProvider({ children }: { children: ReactNode }) {
  const mode = useSyncExternalStore<AdminThemeMode>(
    subscribeToThemePreference,
    getThemePreference,
    () => "light",
  );
  const theme = useMemo(() => createAdminTheme(mode), [mode]);

  useEffect(() => {
    document.body.dataset.adminTheme = mode;
    return () => {
      delete document.body.dataset.adminTheme;
    };
  }, [mode]);

  const toggleMode = useCallback(() => {
    window.localStorage.setItem(preferenceKey, mode === "light" ? "dark" : "light");
    window.dispatchEvent(new Event(preferenceEvent));
  }, [mode]);

  const contextValue = useMemo(() => ({ mode, toggleMode }), [mode, toggleMode]);

  return (
    <AdminThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </AdminThemeContext.Provider>
  );
}
