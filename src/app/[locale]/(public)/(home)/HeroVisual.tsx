"use client";

import AutoStoriesRounded from "@mui/icons-material/AutoStoriesRounded";
import BoltRounded from "@mui/icons-material/BoltRounded";
import SchoolRounded from "@mui/icons-material/SchoolRounded";
import TrendingUpRounded from "@mui/icons-material/TrendingUpRounded";
import { motion, useReducedMotion } from "motion/react";

import styles from "@/css/public/home.module.css";

type HeroVisualProps = {
  label: string;
  title: string;
  progress: string;
};

export function HeroVisual({ label, title, progress }: HeroVisualProps) {
  /* HOOKS */
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={styles.home__heroVisual}
      aria-label={label}
      role="img"
      initial={{ opacity: 0, y: reduceMotion ? 0 : 24, scale: reduceMotion ? 1 : 0.965 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: reduceMotion ? 0.18 : 0.72, delay: reduceMotion ? 0 : 0.2 }}
    >
      <div className={styles.home__heroVisualShape} />
      <motion.div
        className={styles.home__heroVisualCard}
        initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0.18 : 0.58, delay: reduceMotion ? 0 : 0.34 }}
      >
        <div className={styles.home__heroVisualHeader}>
          <span className={styles.home__heroVisualLabel}>{label}</span>
          <span className={styles.home__heroVisualBolt}>
            <BoltRounded aria-hidden="true" />
          </span>
        </div>
        <div className={styles.home__heroVisualCenter}>
          <motion.div
            className={styles.home__heroVisualIcon}
            initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.78, rotate: reduceMotion ? 0 : -8 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: reduceMotion ? 0.18 : 0.62, delay: reduceMotion ? 0 : 0.46 }}
          >
            <SchoolRounded aria-hidden="true" className={styles.home__heroVisualSchoolIcon} />
            <span className={styles.home__heroVisualTrend}>
              <TrendingUpRounded aria-hidden="true" />
            </span>
          </motion.div>
        </div>
        <p className={styles.home__heroVisualTitle}>{title}</p>
        <div className={styles.home__heroVisualProgress}>
          <span className={styles.home__heroVisualProgressIcon}>
            <AutoStoriesRounded aria-hidden="true" />
          </span>
          <div className={styles.home__heroVisualProgressContent}>
            <p className={styles.home__heroVisualProgressLabel}>{progress}</p>
            <div className={styles.home__heroVisualProgressTrack}>
              <motion.div
                className={styles.home__heroVisualProgressValue}
                initial={{ scaleX: reduceMotion ? 0.75 : 0 }}
                animate={{ scaleX: 0.75 }}
                transition={{
                  duration: reduceMotion ? 0.18 : 0.82,
                  delay: reduceMotion ? 0 : 0.68,
                }}
              />
            </div>
          </div>
        </div>
      </motion.div>
      <span className={styles.home__heroVisualDot} />
      <span className={styles.home__heroVisualAccent} />
    </motion.div>
  );
}
