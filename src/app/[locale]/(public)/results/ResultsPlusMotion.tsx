"use client";

import AddRounded from "@mui/icons-material/AddRounded";
import { motion, useReducedMotion } from "motion/react";

const plusDuration = 4.6;

export function ResultsPlusMotion() {
  /* HOOKS */
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      className="results__heroPlus"
      initial={false}
      animate={
        reduceMotion
          ? { opacity: 1, scale: 1 }
          : {
              opacity: [0.72, 1, 1, 0.72, 0.72],
              scale: [0.82, 1, 1, 0.82, 0.82],
            }
      }
      transition={{
        duration: reduceMotion ? 0 : plusDuration,
        ease: "easeInOut",
        repeat: reduceMotion ? 0 : Number.POSITIVE_INFINITY,
        times: [0, 0.22, 0.65, 0.87, 1],
      }}
    >
      <AddRounded />
    </motion.div>
  );
}
