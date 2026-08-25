export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "filter"
  | "inverseOutline"
  | "surface"
  | "danger";

export type ButtonSize = "small" | "medium" | "large";

export type ButtonShape = "rounded" | "soft" | "pill";

export type ButtonHoverEffect = "none" | "grow" | "jump";

export type ButtonStyleProps = {
  fullWidth?: boolean;
  hoverEffect?: ButtonHoverEffect;
  shape?: ButtonShape;
  size?: ButtonSize;
  variant?: ButtonVariant;
};
