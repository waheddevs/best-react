"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  /* HOOKS */
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: reduceMotion ? 0 : 14 },
        visible: { opacity: 1, y: 0, transition: { duration: reduceMotion ? 0.18 : 0.48 } },
      }}
    >
      {children}
    </motion.div>
  );
}
