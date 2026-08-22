"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type HeroVisualFrameProps = {
  children: ReactNode;
  className: string;
};

const visualEase = [0.22, 1, 0.36, 1] as const;

export function HeroVisualFrame({ children, className }: HeroVisualFrameProps) {
  /* HOOKS */
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      className={className}
      initial={{
        opacity: 0,
        x: reduceMotion ? 0 : 36,
        scale: reduceMotion ? 1 : 0.97,
      }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{
        duration: reduceMotion ? 0.18 : 0.68,
        delay: reduceMotion ? 0 : 0.16,
        ease: visualEase,
      }}
    >
      {children}
    </motion.div>
  );
}
