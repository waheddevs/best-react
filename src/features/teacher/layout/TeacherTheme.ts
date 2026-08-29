"use client";

import { createTheme } from "@mui/material/styles";

import type { TeacherThemeMode } from "@/types/teacher/Teacher";

export function createTeacherTheme(mode: TeacherThemeMode) {
  const isDark = mode === "dark";

  return createTheme({
    palette: {
      mode,
      primary: { main: isDark ? "#60A5FA" : "#2563EB", contrastText: "#FFFFFF" },
      secondary: { main: isDark ? "#67D8E8" : "#49BFD1", contrastText: "#102A43" },
      background: {
        default: isDark ? "#0B1220" : "#F4FBFD",
        paper: isDark ? "#111C2E" : "#FFFFFF",
      },
      text: {
        primary: isDark ? "#F3F7FC" : "#172033",
        secondary: isDark ? "#A7B4C7" : "#64748B",
      },
      divider: isDark ? "#263750" : "#D9EDF1",
      success: { main: "#15803D" },
      warning: { main: "#B45309" },
      error: { main: "#DC2626" },
    },
    typography: {
      fontFamily: "var(--font-geist-sans), sans-serif",
      button: { textTransform: "none", fontWeight: 750 },
    },
    shape: { borderRadius: 14 },
    components: {
      MuiButtonBase: { defaultProps: { disableRipple: true } },
      MuiDialog: {
        styleOverrides: {
          paper: {
            backgroundImage: "none",
            border: `1px solid ${isDark ? "#263750" : "#D9EDF1"}`,
            borderRadius: 20,
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundImage: "none",
            backgroundColor: isDark ? "#111C2E" : "#FFFFFF",
          },
        },
      },
      MuiMenu: {
        styleOverrides: {
          paper: {
            backgroundImage: "none",
            border: `1px solid ${isDark ? "#263750" : "#D9EDF1"}`,
            borderRadius: 16,
          },
        },
      },
      MuiTextField: {
        defaultProps: { variant: "outlined" },
      },
    },
  });
}
