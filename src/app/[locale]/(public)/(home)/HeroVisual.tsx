"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import styles from "@/css/public/home.module.css";

type HeroVisualProps = {
  label: string;
};

export function HeroVisual({ label }: HeroVisualProps) {
  /* HOOKS */
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={styles.home__heroVisual}
      initial={{ opacity: 0, x: reduceMotion ? 0 : 56, scale: reduceMotion ? 1 : 0.97 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: reduceMotion ? 0.18 : 0.68, delay: reduceMotion ? 0 : 0.22 }}
    >
      <Image
        alt={label}
        className={styles.home__heroVisualImage}
        fill
        priority
        quality={95}
        sizes="(max-width: 1023px) 100vw, (max-width: 1439px) 58vw, 736px"
        src="/images/generated/best-graduate-paper-plane-hero-v4.png"
      />
    </motion.div>
  );
}
