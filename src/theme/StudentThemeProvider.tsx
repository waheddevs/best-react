"use client";

import { ThemeProvider } from "@mui/material/styles";
import { useCallback, useEffect, useMemo, useSyncExternalStore, type ReactNode } from "react";

import { StudentThemeContext } from "@/features/student/layout/StudentThemeContext";
import { createStudentTheme } from "@/theme/StudentTheme";
import type { StudentThemeMode } from "@/types/student/StudentWorkspace";

const preferenceKey = "best-lc-student-theme";
const preferenceEvent = "best-lc-student-theme-change";

function subscribeToThemePreference(handleStoreChange: () => void) {
  window.addEventListener("storage", handleStoreChange);
  window.addEventListener(preferenceEvent, handleStoreChange);
  return () => {
    window.removeEventListener("storage", handleStoreChange);
    window.removeEventListener(preferenceEvent, handleStoreChange);
  };
}

function getThemePreference(): StudentThemeMode {
  return window.localStorage.getItem(preferenceKey) === "dark" ? "dark" : "light";
}

export function StudentThemeProvider({ children }: { children: ReactNode }) {
  const mode = useSyncExternalStore<StudentThemeMode>(
    subscribeToThemePreference,
    getThemePreference,
    () => "light",
  );
  const theme = useMemo(() => createStudentTheme(mode), [mode]);

  useEffect(() => {
    document.body.dataset.studentTheme = mode;
    return () => {
      delete document.body.dataset.studentTheme;
    };
  }, [mode]);

  const toggleMode = useCallback(() => {
    window.localStorage.setItem(preferenceKey, mode === "light" ? "dark" : "light");
    window.dispatchEvent(new Event(preferenceEvent));
  }, [mode]);

  const contextValue = useMemo(() => ({ mode, toggleMode }), [mode, toggleMode]);

  return (
    <StudentThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </StudentThemeContext.Provider>
  );
}
