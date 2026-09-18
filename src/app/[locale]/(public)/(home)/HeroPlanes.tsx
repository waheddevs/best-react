"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

const planeEase = [0.22, 1, 0.36, 1] as const;

export function HeroPlanes() {
  /* HOOKS */
  const reduceMotion = useReducedMotion();

  return (
    <div aria-hidden="true" className="home__heroPlanes">
      <span className="home__heroPlane home__heroPlaneBank">
        <motion.span
          className="home__heroPlaneFrame"
          initial={{ opacity: 0, x: reduceMotion ? 0 : -28, y: reduceMotion ? 0 : 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{
            duration: reduceMotion ? 0.16 : 0.62,
            delay: reduceMotion ? 0 : 0.32,
            ease: planeEase,
          }}
        >
          <Image
            alt=""
            className="home__heroPlaneImage"
            fill
            sizes="176px"
            src="/images/home-page/hero-plane-bank-up-right.png"
          />
        </motion.span>
      </span>
      <span className="home__heroPlane home__heroPlaneLow">
        <motion.span
          className="home__heroPlaneFrame"
          initial={{ opacity: 0, x: 0, y: reduceMotion ? 0 : 24 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{
            duration: reduceMotion ? 0.16 : 0.58,
            delay: reduceMotion ? 0 : 0.24,
            ease: planeEase,
          }}
        >
          <Image
            alt=""
            className="home__heroPlaneImage"
            fill
            sizes="192px"
            src="/images/home-page/hero-plane-low-left-v2.png"
          />
        </motion.span>
      </span>
      <span className="home__heroPlane home__heroPlaneBlur">
        <motion.span
          className="home__heroPlaneFrame"
          initial={{ opacity: 0, x: reduceMotion ? 0 : -18, y: reduceMotion ? 0 : -14 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{
            duration: reduceMotion ? 0.16 : 0.58,
            delay: reduceMotion ? 0 : 0.24,
            ease: planeEase,
          }}
        >
          <Image
            alt=""
            className="home__heroPlaneImage"
            fill
            sizes="88px"
            src="/images/home-page/hero-plane-climb-front.png"
          />
        </motion.span>
      </span>
      <span className="home__heroPlane home__heroPlaneMotion">
        <motion.span
          className="home__heroPlaneFrame"
          initial={{ opacity: 0, x: reduceMotion ? 0 : 30, y: reduceMotion ? 0 : 16 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{
            duration: reduceMotion ? 0.16 : 0.64,
            delay: reduceMotion ? 0 : 0.52,
            ease: planeEase,
          }}
        >
          <Image
            alt=""
            className="home__heroPlaneImage home__heroPlaneMotionTrailFar"
            fill
            sizes="80px"
            src="/images/home-page/hero-plane-turn-down-right.png"
          />
          <Image
            alt=""
            className="home__heroPlaneImage home__heroPlaneMotionTrailNear"
            fill
            sizes="80px"
            src="/images/home-page/hero-plane-turn-down-right.png"
          />
          <Image
            alt=""
            className="home__heroPlaneImage home__heroPlaneMotionCore"
            fill
            sizes="80px"
            src="/images/home-page/hero-plane-turn-down-right.png"
          />
        </motion.span>
      </span>
    </div>
  );
}
