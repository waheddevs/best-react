"use client";

import { motion, useReducedMotion } from "motion/react";

import styles from "@/css/public/exams.module.css";

export function ExamClockMotion() {
  /* HOOKS */
  const reduceMotion = useReducedMotion();

  return (
    <span aria-hidden="true" className={styles.exams__heroClock}>
      <motion.i
        className={styles.exams__heroClockHour}
        initial={false}
        animate={{ rotate: reduceMotion ? 35 : [35, 395] }}
        transition={{
          duration: reduceMotion ? 0 : 12,
          ease: "linear",
          repeat: reduceMotion ? 0 : Number.POSITIVE_INFINITY,
        }}
      />
      <motion.i
        className={styles.exams__heroClockMinute}
        initial={false}
        animate={{ rotate: reduceMotion ? 125 : [125, 485] }}
        transition={{
          duration: reduceMotion ? 0 : 3,
          ease: "linear",
          repeat: reduceMotion ? 0 : Number.POSITIVE_INFINITY,
        }}
      />
      <i className={styles.exams__heroClockHub} />
    </span>
  );
}
