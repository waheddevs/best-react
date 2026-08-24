"use client";

import MuiIconButton, {
  type IconButtonProps as MuiIconButtonProps,
} from "@mui/material/IconButton";

import styles from "@/css/public/shared.module.css";

type IconButtonProps = Omit<MuiIconButtonProps, "aria-label" | "size"> & {
  controlSize?: "small" | "medium";
  label: string;
  variant?: "ghost" | "soft";
};

export function IconButton({
  className = "",
  controlSize = "medium",
  label,
  variant = "ghost",
  ...buttonProps
}: IconButtonProps) {
  const sizeClassName =
    controlSize === "small"
      ? styles.publicShared__iconButtonSmall
      : styles.publicShared__iconButtonMedium;
  const variantClassName =
    variant === "soft" ? styles.publicShared__iconButtonSoft : styles.publicShared__iconButtonGhost;

  return (
    <MuiIconButton
      {...buttonProps}
      aria-label={label}
      className={`${styles.publicShared__iconButton} ${sizeClassName} ${variantClassName} ${className}`}
      size="small"
    />
  );
}
