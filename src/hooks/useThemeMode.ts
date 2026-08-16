"use client";

import { useColorScheme } from "@mui/material/styles";

export function useThemeMode() {
  const { mode, setMode } = useColorScheme();
  const isDark = mode === "dark";

  return {
    isDark,
    toggleTheme: () => setMode(isDark ? "light" : "dark"),
  };
}
