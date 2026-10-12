"use client";

import { createTheme } from "@mui/material/styles";

import { createFormComponentOverrides } from "@/theme/FormStyles";
import type { AdminThemeMode } from "@/types/admin/AdminWorkspace";

export function createAdminTheme(mode: AdminThemeMode) {
  const isDark = mode === "dark";

  return createTheme({
    components: {
      ...createFormComponentOverrides({
        borderColor: isDark ? "#303641" : "#E6E7EA",
        focusColor: isDark ? "#63C3CC" : "#4AA9B2",
        labelColor: isDark ? "#A0A7B2" : "#747982",
        surfaceColor: isDark ? "#191C23" : "#FFFFFF",
      }),
      MuiButtonBase: { defaultProps: { disableRipple: true } },
      MuiMenu: {
        styleOverrides: {
          paper: {
            backgroundImage: "none",
            border: `1px solid ${isDark ? "#303641" : "#E6E7EA"}`,
            boxShadow: isDark
              ? "0 18px 45px rgba(0, 0, 0, 0.34)"
              : "0 18px 45px rgba(17, 28, 47, 0.14)",
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: isDark ? "#F1F3F5" : "#171922",
            color: isDark ? "#171922" : "#FFFFFF",
            fontSize: 11,
          },
        },
      },
    },
    palette: {
      mode,
      background: {
        default: isDark ? "#111318" : "#F5F5F6",
        paper: isDark ? "#191C23" : "#FFFFFF",
      },
      divider: isDark ? "#303641" : "#E6E7EA",
      primary: {
        contrastText: isDark ? "#111318" : "#FFFFFF",
        main: isDark ? "#EEF0FF" : "#0B0D24",
      },
      secondary: { contrastText: "#0B0D24", main: isDark ? "#63C3CC" : "#4AA9B2" },
      text: {
        primary: isDark ? "#F1F3F5" : "#171922",
        secondary: isDark ? "#A0A7B2" : "#747982",
      },
    },
    shape: { borderRadius: 10 },
    typography: {
      button: { fontWeight: 700, textTransform: "none" },
      fontFamily: '"Inter Variable", Inter, sans-serif',
      h1: { fontSize: "1.5rem", fontWeight: 700, letterSpacing: "-0.025em" },
      h2: { fontSize: "1.125rem", fontWeight: 700, letterSpacing: "-0.015em" },
    },
  });
}
