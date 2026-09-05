"use client";

import { createTheme } from "@mui/material/styles";

import { createFormComponentOverrides } from "@/theme/FormStyles";

export const adminTheme = createTheme({
  components: {
    ...createFormComponentOverrides({
      borderColor: "#DCE3EA",
      focusColor: "#0D9B78",
      labelColor: "#657287",
      surfaceColor: "#FFFFFF",
    }),
    MuiButtonBase: { defaultProps: { disableRipple: true } },
  },
  palette: {
    background: { default: "#F2F5F8", paper: "#FFFFFF" },
    divider: "#DCE3EA",
    primary: { contrastText: "#FFFFFF", main: "#111C2F" },
    secondary: { contrastText: "#FFFFFF", main: "#0D9B78" },
    text: { primary: "#192538", secondary: "#657287" },
  },
  shape: { borderRadius: 11 },
  typography: {
    button: { fontWeight: 700, textTransform: "none" },
    fontFamily: "var(--font-geist-sans), sans-serif",
  },
});
