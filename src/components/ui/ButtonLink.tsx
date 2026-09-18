import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import type { ComponentProps, ReactNode } from "react";

import { ScrollToTopLink } from "@/components/navigation/ScrollToTopLink";
import { getButtonClassName } from "@/components/ui/ButtonStyles";
import type { ButtonStyleProps } from "@/types/Button";

type ButtonLinkProps = Omit<ComponentProps<typeof ScrollToTopLink>, "children"> &
  ButtonStyleProps & {
    children: ReactNode;
    endIcon?: ReactNode;
    startIcon?: ReactNode;
  };

export function ButtonLink({
  children,
  className,
  endIcon,
  fullWidth,
  hoverEffect,
  shape = "soft",
  size,
  startIcon,
  variant = "primary",
  ...linkProps
}: ButtonLinkProps) {
  const resolvedEndIcon =
    endIcon !== undefined ? endIcon : variant === "primary" ? <ArrowForwardRounded /> : null;

  return (
    <ScrollToTopLink
      {...linkProps}
      className={getButtonClassName({
        className,
        fullWidth,
        hoverEffect,
        shape,
        size,
        variant,
      })}
    >
      {startIcon ? (
        <span aria-hidden="true" className="publicShared__buttonIcon">
          {startIcon}
        </span>
      ) : null}
      <span>{children}</span>
      {resolvedEndIcon ? (
        <span aria-hidden="true" className="publicShared__buttonIcon">
          {resolvedEndIcon}
        </span>
      ) : null}
    </ScrollToTopLink>
  );
}
