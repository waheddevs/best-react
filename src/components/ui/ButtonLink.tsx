import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import Link from "next/link";
import type { ReactNode } from "react";

import styles from "@/css/public/shared.module.css";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
};

export function ButtonLink({ href, children, variant = "primary" }: ButtonLinkProps) {
  const variantClass =
    variant === "primary"
      ? styles.publicShared__buttonLinkPrimary
      : styles.publicShared__buttonLinkSecondary;

  return (
    <Link
      href={href}
      className={`${styles.publicShared__buttonLink} ${variantClass}`}
    >
      {children}
      {variant === "primary" ? (
        <ArrowForwardRounded aria-hidden="true" className={styles.publicShared__buttonLinkIcon} />
      ) : null}
    </Link>
  );
}
