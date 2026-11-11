"use client";

import MuiIconButton, {
  type IconButtonProps as MuiIconButtonProps,
} from "@mui/material/IconButton";

type IconButtonProps = Omit<MuiIconButtonProps, "aria-label" | "size"> & {
  controlSize?: "small" | "medium" | "large";
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
  const sizeClassName = {
    small: "publicShared__iconButtonSmall",
    medium: "publicShared__iconButtonMedium",
    large: "publicShared__iconButtonLarge",
  }[controlSize];
  const variantClassName =
    variant === "soft" ? "publicShared__iconButtonSoft" : "publicShared__iconButtonGhost";

  return (
    <MuiIconButton
      {...buttonProps}
      aria-label={label}
      className={`publicShared__iconButton ${sizeClassName} ${variantClassName} ${className}`}
      size="small"
    />
  );
}
