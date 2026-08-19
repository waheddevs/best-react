import type { HTMLAttributes } from "react";

import styles from "@/css/public/shared.module.css";

type ContainerProps = HTMLAttributes<HTMLDivElement>;

export function Container({ className = "", ...props }: ContainerProps) {
  return (
    <div
      className={`${styles.publicShared__container} ${className}`}
      {...props}
    />
  );
}
