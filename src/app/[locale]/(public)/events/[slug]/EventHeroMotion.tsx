"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type EventHeroMotionProps = {
  children: ReactNode;
  className: string;
  variant: "copy" | "visual";
};

export function EventHeroMotion({ children, className, variant }: EventHeroMotionProps) {
  /* HOOKS */
  const reduceMotion = useReducedMotion();
  const isCopy = variant === "copy";

  return (
    <motion.div
      animate={{ opacity: 1, scale: 1, x: 0 }}
      className={className}
      initial={{
        opacity: 0,
        scale: reduceMotion || isCopy ? 1 : 0.985,
        x: reduceMotion || !isCopy ? 0 : -20,
      }}
      transition={{
        delay: reduceMotion || isCopy ? 0 : 0.06,
        duration: reduceMotion ? 0.18 : isCopy ? 0.58 : 0.64,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
