"use client";

import AutoAwesomeRounded from "@mui/icons-material/AutoAwesomeRounded";
import { motion, useReducedMotion } from "motion/react";

type PageHeroCopyProps = {
  animate: boolean;
  description: string;
  eyebrow: string;
  title: string;
};

const copyEase = [0.22, 1, 0.36, 1] as const;

export function PageHeroCopy({ animate, description, eyebrow, title }: PageHeroCopyProps) {
  /* HOOKS */
  const reduceMotion = useReducedMotion();

  const shouldAnimate = animate && !reduceMotion;

  return (
    <motion.div
      className="publicShared__pageHeroContent"
      initial={animate ? { opacity: 0, x: shouldAnimate ? -36 : 0 } : false}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: animate ? (reduceMotion ? 0.18 : 0.64) : 0,
        ease: copyEase,
      }}
    >
      <p className="publicShared__pageHeroEyebrow">
        <AutoAwesomeRounded aria-hidden="true" className="publicShared__pageHeroIcon" />
        {eyebrow}
      </p>
      <h1 className="publicShared__pageHeroTitle">{title}</h1>
      <p className="publicShared__pageHeroDescription">{description}</p>
    </motion.div>
  );
}
