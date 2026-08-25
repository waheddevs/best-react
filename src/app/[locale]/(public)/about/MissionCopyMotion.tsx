"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type MissionCopyMotionProps = {
  children: ReactNode;
  className: string;
};

export function MissionCopyMotion({ children, className }: MissionCopyMotionProps) {
  /* HOOKS */
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: reduceMotion ? 0 : -24 }}
      transition={{ duration: reduceMotion ? 0.18 : 0.58, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, amount: 0.25 }}
      whileInView={{ opacity: 1, x: 0 }}
    >
      {children}
    </motion.div>
  );
}
