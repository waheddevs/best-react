import type { Components, Theme } from "@mui/material/styles";

type FormStyleOptions = {
  borderColor: string;
  focusColor: string;
  labelColor: string;
  surfaceColor: string;
};

export function createFormComponentOverrides({
  borderColor,
  focusColor,
  labelColor,
  surfaceColor,
}: FormStyleOptions): Components<Theme> {
  return {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: labelColor,
          lineHeight: 1.35,
          "&.MuiInputLabel-outlined.MuiInputLabel-shrink": {
            paddingInline: 4,
            backgroundColor: surfaceColor,
            transform: "translate(10px, -9px) scale(0.75)",
          },
          "&.Mui-focused": {
            color: focusColor,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: surfaceColor,
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor,
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: focusColor,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: focusColor,
            borderWidth: 1,
          },
        },
        input: {
          lineHeight: 1.5,
          "&:-webkit-autofill": {
            WebkitBoxShadow: `0 0 0 1000px ${surfaceColor} inset`,
            WebkitTextFillColor: "inherit",
            caretColor: "inherit",
          },
          "&:focus-visible": {
            outline: "none",
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: { variant: "outlined" },
    },
  };
}
