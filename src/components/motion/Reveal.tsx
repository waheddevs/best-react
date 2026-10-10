"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "left" | "right" | "scale" | "up";
};

const revealOffsets = {
  left: { x: -24, y: 0, scale: 1 },
  right: { x: 24, y: 0, scale: 1 },
  scale: { x: 0, y: 0, scale: 0.975 },
  up: { x: 0, y: 18, scale: 1 },
};

export function Reveal({ children, className, delay = 0, direction = "up" }: RevealProps) {
  /* HOOKS */
  const reduceMotion = useReducedMotion();
  const offset = revealOffsets[direction];

  return (
    <motion.div
      data-reveal-wrapper="true"
      className={className}
      initial={{
        opacity: 0,
        scale: reduceMotion ? 1 : offset.scale,
        x: reduceMotion ? 0 : offset.x,
        y: reduceMotion ? 0 : offset.y,
      }}
      whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: reduceMotion ? 0.18 : 0.55, delay: reduceMotion ? 0 : delay }}
    >
      {children}
    </motion.div>
  );
}
