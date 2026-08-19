"use client";

import { createTheme } from "@mui/material/styles";

export const bestTheme = createTheme({
  palette: {
    primary: { main: "#2563EB", contrastText: "#FFFFFF" },
    secondary: { main: "#49BFD1", contrastText: "#102A43" },
    background: { default: "#F4FBFD", paper: "#FFFFFF" },
    text: { primary: "#172033", secondary: "#64748B" },
    divider: "#D9EDF1",
  },
  typography: {
    fontFamily: "var(--font-geist-sans), sans-serif",
    button: { textTransform: "none", fontWeight: 700 },
  },
  shape: { borderRadius: 14 },
  components: {
    MuiButtonBase: { defaultProps: { disableRipple: true } },
    MuiIconButton: {
      styleOverrides: {
        root: {
          border: "1px solid var(--border)",
          color: "var(--heading)",
          transition: "background-color 180ms ease, border-color 180ms ease",
          "&:hover": {
            backgroundColor: "color-mix(in srgb, var(--brand-turquoise) 12%, transparent)",
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundImage: "none",
          backgroundColor: "var(--surface)",
          color: "var(--text)",
        },
      },
    },
  },
});
