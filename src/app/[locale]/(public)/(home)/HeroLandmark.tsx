"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

const landmarkEase = [0.22, 1, 0.36, 1] as const;

export function HeroLandmark() {
  /* HOOKS */
  const reduceMotion = useReducedMotion();

  return (
    <div aria-hidden="true" className="home__heroLandmark">
      <motion.div
        className="home__heroLandmarkFrame"
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
          className="home__heroLandmarkImage"
          fill
          quality={95}
          sizes="(max-width: 767px) 1px, (max-width: 1279px) 304px, 464px"
          src="/images/home-page/hero-big-ben-upright-v2.png"
        />
      </motion.div>
    </div>
  );
}
