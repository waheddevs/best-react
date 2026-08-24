"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type StaggerGroupProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function StaggerGroup({ children, className, delay = 0 }: StaggerGroupProps) {
  /* HOOKS */
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: reduceMotion ? 0 : delay,
            staggerChildren: reduceMotion ? 0 : 0.065,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
