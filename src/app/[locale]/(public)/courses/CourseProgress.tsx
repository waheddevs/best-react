"use client";

import { motion, useReducedMotion } from "motion/react";

import styles from "@/css/public/courses.module.css";

const progressDuration = 5.2;
const progressTimes = [0, 0.23, 0.62, 0.85, 1];
const middleNodeTimes = [0, 0.1, 0.125, 0.155, 0.19, 1];
const endNodeTimes = [0, 0.205, 0.23, 0.26, 0.3, 1];
const nodeReaction = {
  rotate: [0, 0, 8, -5, 0, 0],
  scale: [1, 1, 1.35, 0.94, 1, 1],
  y: [0, 0, -3, 1, 0, 0],
};

export function CourseProgress() {
  /* HOOKS */
  const reduceMotion = useReducedMotion();

  return (
    <div aria-hidden="true" className={styles.courses__heroProgress}>
      <span className={styles.courses__heroProgressTrack} />
      <motion.span
        className={styles.courses__heroProgressFill}
        initial={false}
        animate={reduceMotion ? { scaleX: 1 } : { scaleX: [0, 1, 1, 0, 0] }}
        transition={{
          duration: reduceMotion ? 0 : progressDuration,
          ease: "easeInOut",
          repeat: reduceMotion ? 0 : Number.POSITIVE_INFINITY,
          times: progressTimes,
        }}
      />
      <span className={styles.courses__heroProgressNode} />
      <motion.span
        className={styles.courses__heroProgressNode}
        initial={false}
        animate={reduceMotion ? undefined : nodeReaction}
        transition={{
          duration: progressDuration,
          ease: "easeInOut",
          repeat: reduceMotion ? 0 : Number.POSITIVE_INFINITY,
          times: middleNodeTimes,
        }}
      />
      <motion.span
        className={styles.courses__heroProgressNode}
        initial={false}
        animate={reduceMotion ? undefined : nodeReaction}
        transition={{
          duration: progressDuration,
          ease: "easeInOut",
          repeat: reduceMotion ? 0 : Number.POSITIVE_INFINITY,
          times: endNodeTimes,
        }}
      />
    </div>
  );
}
