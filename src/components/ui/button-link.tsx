import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import Link from "next/link";
import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
};

export function ButtonLink({ href, children, variant = "primary" }: ButtonLinkProps) {
  const variantClass = variant === "primary" ? "button-link--primary" : "button-link--secondary";

  return (
    <Link href={href} className={`button-link ${variantClass}`}>
      {children}
      {variant === "primary" ? (
        <ArrowForwardRounded aria-hidden="true" className="button-link__icon" />
      ) : null}
    </Link>
  );
}
