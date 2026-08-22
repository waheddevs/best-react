"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type LiveIllustrationVariant = "drift" | "float" | "pulse" | "tilt";

type LiveIllustrationProps = {
  children: ReactNode;
  className: string;
  delay?: number;
  variant?: LiveIllustrationVariant;
};

const liveAnimations = {
  drift: { x: [0, 6, 0], y: [0, -3, 0] },
  float: { rotate: [0, -0.8, 0], y: [0, -7, 0] },
  pulse: { scale: [1, 1.045, 1] },
  tilt: { rotate: [0, 1.2, 0], y: [0, -4, 0] },
};

const liveDurations: Record<LiveIllustrationVariant, number> = {
  drift: 5.8,
  float: 5.2,
  pulse: 4.6,
  tilt: 6.2,
};

export function LiveIllustration({
  children,
  className,
  delay = 0,
  variant = "float",
}: LiveIllustrationProps) {
  /* HOOKS */
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={false}
      animate={reduceMotion ? undefined : liveAnimations[variant]}
      transition={{
        delay,
        duration: liveDurations[variant],
        ease: "easeInOut",
        repeat: reduceMotion ? 0 : Number.POSITIVE_INFINITY,
      }}
    >
      {children}
    </motion.div>
  );
}
