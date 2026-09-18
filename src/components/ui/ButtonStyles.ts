import type {
  ButtonHoverEffect,
  ButtonShape,
  ButtonSize,
  ButtonStyleProps,
  ButtonVariant,
} from "@/types/Button";

const variantClassNames: Record<ButtonVariant, string> = {
  primary: "publicShared__buttonPrimary",
  secondary: "publicShared__buttonSecondary",
  outline: "publicShared__buttonOutline",
  ghost: "publicShared__buttonGhost",
  filter: "publicShared__buttonFilter",
  inverseOutline: "publicShared__buttonInverseOutline",
  surface: "publicShared__buttonSurface",
  danger: "publicShared__buttonDanger",
};

const sizeClassNames: Record<ButtonSize, string> = {
  small: "publicShared__buttonSmall",
  medium: "publicShared__buttonMedium",
  large: "publicShared__buttonLarge",
};

const shapeClassNames: Record<ButtonShape, string> = {
  rounded: "publicShared__buttonRounded",
  soft: "publicShared__buttonSoft",
  pill: "publicShared__buttonPill",
};

const hoverEffectClassNames: Record<ButtonHoverEffect, string> = {
  none: "",
  grow: "publicShared__buttonGrow",
  jump: "publicShared__buttonJump",
};

type GetButtonClassNameOptions = ButtonStyleProps & {
  className?: string;
};

export function getButtonClassName({
  className = "",
  fullWidth = false,
  hoverEffect = "none",
  shape = "rounded",
  size = "medium",
  variant = "primary",
}: GetButtonClassNameOptions = {}) {
  return [
    "publicShared__button",
    variantClassNames[variant],
    sizeClassNames[size],
    shapeClassNames[shape],
    hoverEffectClassNames[hoverEffect],
    fullWidth ? "publicShared__buttonFullWidth" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
}
