"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import styles from "@/css/public/home.module.css";

const landmarkEase = [0.22, 1, 0.36, 1] as const;

export function HeroLandmark() {
  /* HOOKS */
  const reduceMotion = useReducedMotion();

  return (
    <div aria-hidden="true" className={styles.home__heroLandmark}>
      <motion.div
        className={styles.home__heroLandmarkFrame}
        initial={{ opacity: 0, y: reduceMotion ? 0 : 72 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: reduceMotion ? 0.18 : 0.82,
          delay: reduceMotion ? 0 : 0.12,
          ease: landmarkEase,
        }}
      >
        <Image
          alt=""
          className={styles.home__heroLandmarkImage}
          fill
          quality={95}
          sizes="(max-width: 767px) 1px, (max-width: 1279px) 304px, 464px"
          src="/images/generated/hero-big-ben-upright-v2.png"
        />
      </motion.div>
    </div>
  );
}
