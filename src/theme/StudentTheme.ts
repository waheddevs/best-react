"use client";

import { createTheme } from "@mui/material/styles";

import { createFormComponentOverrides } from "@/theme/FormStyles";
import type { StudentThemeMode } from "@/types/student/StudentWorkspace";

export function createStudentTheme(mode: StudentThemeMode) {
  const isDark = mode === "dark";

  return createTheme({
    components: {
      ...createFormComponentOverrides({
        borderColor: isDark ? "#39365A" : "#E8E4F2",
        focusColor: isDark ? "#A99EFF" : "#6658D9",
        labelColor: isDark ? "#B1ACCD" : "#6D6A86",
        surfaceColor: isDark ? "#24213D" : "#FFFFFF",
      }),
      MuiButtonBase: { defaultProps: { disableRipple: true } },
      MuiMenu: {
        styleOverrides: {
          paper: {
            backgroundImage: "none",
            border: `1px solid ${isDark ? "#39365A" : "#E8E4F2"}`,
          },
        },
      },
    },
    palette: {
      mode,
      background: {
        default: isDark ? "#151428" : "#FBFAF5",
        paper: isDark ? "#24213D" : "#FFFFFF",
      },
      divider: isDark ? "#39365A" : "#E8E4F2",
      primary: {
        contrastText: isDark ? "#1B1931" : "#FFFFFF",
        main: isDark ? "#A99EFF" : "#6658D9",
      },
      secondary: { contrastText: "#24233D", main: "#8CDFC3" },
      text: {
        primary: isDark ? "#F3F0FF" : "#24233D",
        secondary: isDark ? "#B1ACCD" : "#6D6A86",
      },
    },
    shape: { borderRadius: 24 },
    typography: {
      button: { fontWeight: 700, textTransform: "none" },
      fontFamily: "var(--font-geist-sans), sans-serif",
    },
  });
}
