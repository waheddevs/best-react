import styles from "@/css/public/shared.module.css";
import type {
  ButtonHoverEffect,
  ButtonShape,
  ButtonSize,
  ButtonStyleProps,
  ButtonVariant,
} from "@/types/Button";

const variantClassNames: Record<ButtonVariant, string> = {
  primary: styles.publicShared__buttonPrimary,
  secondary: styles.publicShared__buttonSecondary,
  outline: styles.publicShared__buttonOutline,
  ghost: styles.publicShared__buttonGhost,
  filter: styles.publicShared__buttonFilter,
  inverseOutline: styles.publicShared__buttonInverseOutline,
  surface: styles.publicShared__buttonSurface,
  danger: styles.publicShared__buttonDanger,
};

const sizeClassNames: Record<ButtonSize, string> = {
  small: styles.publicShared__buttonSmall,
  medium: styles.publicShared__buttonMedium,
  large: styles.publicShared__buttonLarge,
};

const shapeClassNames: Record<ButtonShape, string> = {
  rounded: styles.publicShared__buttonRounded,
  soft: styles.publicShared__buttonSoft,
  pill: styles.publicShared__buttonPill,
};

const hoverEffectClassNames: Record<ButtonHoverEffect, string> = {
  none: "",
  grow: styles.publicShared__buttonGrow,
  jump: styles.publicShared__buttonJump,
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
    styles.publicShared__button,
    variantClassNames[variant],
    sizeClassNames[size],
    shapeClassNames[shape],
    hoverEffectClassNames[hoverEffect],
    fullWidth ? styles.publicShared__buttonFullWidth : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
}
