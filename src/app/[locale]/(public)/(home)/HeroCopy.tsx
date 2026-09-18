"use client";

import AutoAwesomeRounded from "@mui/icons-material/AutoAwesomeRounded";
import { motion, useReducedMotion, type Variants } from "motion/react";

import { ButtonLink } from "@/components/ui/ButtonLink";
import type { Locale } from "@/config/Locales";
import type { Dictionary } from "@/dictionaries/public/Types";

type HeroCopyProps = {
  locale: Locale;
  content: Dictionary["home"];
};

const motionEase = [0.22, 1, 0.36, 1] as const;

export function HeroCopy({ locale, content }: HeroCopyProps) {
  /* HOOKS */
  const reduceMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: { opacity: 0, x: reduceMotion ? 0 : -48 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: reduceMotion ? 0.18 : 0.58,
        ease: motionEase,
        delayChildren: reduceMotion ? 0 : 0.08,
        staggerChildren: reduceMotion ? 0 : 0.075,
      },
    },
  };
  const itemVariants: Variants = {
    hidden: { opacity: 0, x: reduceMotion ? 0 : -14 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: reduceMotion ? 0.16 : 0.52, ease: motionEase },
    },
  };
  return (
    <motion.div
      className="home__heroCopy"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.p className="home__heroEyebrow" variants={itemVariants}>
        <AutoAwesomeRounded aria-hidden="true" className="home__heroEyebrowIcon" />
        {content.eyebrow}
      </motion.p>
      <h1 className="home__heroTitle">
        <span className="home__heroTitleLine">
          <motion.span className="home__heroTitleLineInner" variants={itemVariants}>
            {content.titleLead}
          </motion.span>
        </span>
        <span className="home__heroTitleLine home__heroTitleAccent">
          <motion.span className="home__heroTitleLineInner" variants={itemVariants}>
            {content.titleAccent}
          </motion.span>
        </span>
      </h1>
      <motion.p className="home__heroDescription" variants={itemVariants}>
        {content.description}
      </motion.p>
      <motion.div className="home__heroActions" variants={itemVariants}>
        <ButtonLink href={`/${locale}/courses`} hoverEffect="jump">
          {content.primaryCta}
        </ButtonLink>
        <ButtonLink href={`/${locale}/contact`} variant="secondary">
          {content.secondaryCta}
        </ButtonLink>
      </motion.div>
    </motion.div>
  );
}
