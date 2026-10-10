"use client";

import { createTheme } from "@mui/material/styles";

import { createFormComponentOverrides } from "@/theme/FormStyles";

export const adminTheme = createTheme({
  components: {
    ...createFormComponentOverrides({
      borderColor: "#E6E7EA",
      focusColor: "#4AA9B2",
      labelColor: "#747982",
      surfaceColor: "#FFFFFF",
    }),
    MuiButtonBase: { defaultProps: { disableRipple: true } },
  },
  palette: {
    background: { default: "#F5F5F6", paper: "#FFFFFF" },
    divider: "#E6E7EA",
    primary: { contrastText: "#FFFFFF", main: "#0B0D24" },
    secondary: { contrastText: "#FFFFFF", main: "#4AA9B2" },
    text: { primary: "#171922", secondary: "#747982" },
  },
  shape: { borderRadius: 10 },
  typography: {
    button: { fontWeight: 700, textTransform: "none" },
    fontFamily: "var(--font-geist-sans), sans-serif",
    h1: { fontSize: "1.5rem", fontWeight: 700, letterSpacing: "-0.025em" },
    h2: { fontSize: "1.125rem", fontWeight: 700, letterSpacing: "-0.015em" },
  },
});
