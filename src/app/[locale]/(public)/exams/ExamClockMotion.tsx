"use client";

import { motion, useReducedMotion } from "motion/react";

export function ExamClockMotion() {
  /* HOOKS */
  const reduceMotion = useReducedMotion();

  return (
    <span aria-hidden="true" className="exams__heroClock">
      <motion.i
        className="exams__heroClockHour"
        initial={false}
        animate={{ rotate: reduceMotion ? 35 : [35, 395] }}
        transition={{
          duration: reduceMotion ? 0 : 12,
          ease: "linear",
          repeat: reduceMotion ? 0 : Number.POSITIVE_INFINITY,
        }}
      />
      <motion.i
        className="exams__heroClockMinute"
        initial={false}
        animate={{ rotate: reduceMotion ? 125 : [125, 485] }}
        transition={{
          duration: reduceMotion ? 0 : 3,
          ease: "linear",
          repeat: reduceMotion ? 0 : Number.POSITIVE_INFINITY,
        }}
      />
      <i className="exams__heroClockHub" />
    </span>
  );
}
