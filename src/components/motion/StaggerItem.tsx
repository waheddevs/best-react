"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
  initialScale?: number;
};

export function StaggerItem({ children, className, initialScale = 1 }: StaggerItemProps) {
  /* HOOKS */
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      data-reveal-wrapper="true"
      className={className}
      variants={{
        hidden: {
          opacity: 0,
          scale: reduceMotion ? 1 : initialScale,
          y: reduceMotion ? 0 : 14,
        },
        visible: {
          opacity: 1,
          scale: 1,
          y: 0,
          transition: { duration: reduceMotion ? 0.18 : 0.48 },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
