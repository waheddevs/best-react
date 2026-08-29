"use client";

import { ThemeProvider } from "@mui/material/styles";
import { useCallback, useEffect, useMemo, useSyncExternalStore, type ReactNode } from "react";

import { TeacherThemeContext } from "@/features/teacher/layout/TeacherThemeContext";
import { createTeacherTheme } from "@/features/teacher/layout/TeacherTheme";
import type { TeacherThemeMode } from "@/types/teacher/Teacher";

const preferenceKey = "best-lc-teacher-theme";
const preferenceEvent = "best-lc-teacher-theme-change";

function subscribeToThemePreference(handleStoreChange: () => void) {
  window.addEventListener("storage", handleStoreChange);
  window.addEventListener(preferenceEvent, handleStoreChange);
  return () => {
    window.removeEventListener("storage", handleStoreChange);
    window.removeEventListener(preferenceEvent, handleStoreChange);
  };
}

function getThemePreference(): TeacherThemeMode {
  return window.localStorage.getItem(preferenceKey) === "dark" ? "dark" : "light";
}

export function TeacherThemeProvider({ children }: { children: ReactNode }) {
  /* HOOKS */
  const mode = useSyncExternalStore<TeacherThemeMode>(
    subscribeToThemePreference,
    getThemePreference,
    () => "light",
  );
  const theme = useMemo(() => createTeacherTheme(mode), [mode]);

  useEffect(() => {
    document.body.dataset.teacherTheme = mode;

    return () => {
      delete document.body.dataset.teacherTheme;
    };
  }, [mode]);

  const toggleMode = useCallback(() => {
    window.localStorage.setItem(preferenceKey, mode === "light" ? "dark" : "light");
    window.dispatchEvent(new Event(preferenceEvent));
  }, [mode]);

  const contextValue = useMemo(() => ({ mode, toggleMode }), [mode, toggleMode]);

  return (
    <TeacherThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </TeacherThemeContext.Provider>
  );
}
