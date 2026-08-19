"use client";

import { createTheme } from "@mui/material/styles";

export const bestTheme = createTheme({
  cssVariables: { colorSchemeSelector: "data" },
  colorSchemes: {
    light: {
      palette: {
        primary: { main: "#2563EB", contrastText: "#FFFFFF" },
        secondary: { main: "#49BFD1", contrastText: "#102A43" },
        background: { default: "#F4FBFD", paper: "#FFFFFF" },
        text: { primary: "#172033", secondary: "#64748B" },
        divider: "#D9EDF1",
      },
    },
    dark: {
      palette: {
        primary: { main: "#7CA7FF", contrastText: "#071521" },
        secondary: { main: "#62D0DF", contrastText: "#071521" },
        background: { default: "#071521", paper: "#0E2233" },
        text: { primary: "#EAF7FA", secondary: "#9CB0C0" },
        divider: "#1D3B4A",
      },
    },
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
