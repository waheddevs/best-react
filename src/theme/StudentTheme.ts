"use client";

import { createTheme } from "@mui/material/styles";

import { createFormComponentOverrides } from "@/theme/FormStyles";

export const studentTheme = createTheme({
  components: {
    ...createFormComponentOverrides({
      borderColor: "#E8E4F2",
      focusColor: "#6658D9",
      labelColor: "#6D6A86",
      surfaceColor: "#FFFFFF",
    }),
    MuiButtonBase: { defaultProps: { disableRipple: true } },
  },
  palette: {
    background: { default: "#FBFAF5", paper: "#FFFFFF" },
    divider: "#E8E4F2",
    primary: { contrastText: "#FFFFFF", main: "#6658D9" },
    secondary: { contrastText: "#24233D", main: "#8CDFC3" },
    text: { primary: "#24233D", secondary: "#6D6A86" },
  },
  shape: { borderRadius: 24 },
  typography: {
    button: { fontWeight: 700, textTransform: "none" },
    fontFamily: "var(--font-geist-sans), sans-serif",
  },
});
