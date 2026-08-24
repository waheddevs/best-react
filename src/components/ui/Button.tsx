import type { ButtonHTMLAttributes, ReactNode } from "react";

import { getButtonClassName } from "@/components/ui/ButtonStyles";
import styles from "@/css/public/shared.module.css";
import type { ButtonStyleProps } from "@/types/Button";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonStyleProps & {
    endIcon?: ReactNode;
    startIcon?: ReactNode;
  };

export function Button({
  children,
  className,
  endIcon,
  fullWidth,
  hoverEffect,
  shape,
  size,
  startIcon,
  type = "button",
  variant,
  ...buttonProps
}: ButtonProps) {
  return (
    <button
      {...buttonProps}
      className={getButtonClassName({
        className,
        fullWidth,
        hoverEffect,
        shape,
        size,
        variant,
      })}
      type={type}
    >
      {startIcon ? (
        <span aria-hidden="true" className={styles.publicShared__buttonIcon}>
          {startIcon}
        </span>
      ) : null}
      <span>{children}</span>
      {endIcon ? (
        <span aria-hidden="true" className={styles.publicShared__buttonIcon}>
          {endIcon}
        </span>
      ) : null}
    </button>
  );
}
