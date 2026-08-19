"use client";

import AutoAwesomeRounded from "@mui/icons-material/AutoAwesomeRounded";
import { motion, useReducedMotion, type Variants } from "motion/react";

import { ButtonLink } from "@/components/ui/ButtonLink";
import type { Locale } from "@/config/Locales";
import styles from "@/css/public/home.module.css";
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
    hidden: {},
    visible: {
      transition: {
        delayChildren: reduceMotion ? 0 : 0.08,
        staggerChildren: reduceMotion ? 0 : 0.075,
      },
    },
  };
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0.16 : 0.52, ease: motionEase },
    },
  };
  const titleVariants: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : "105%" },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0.16 : 0.68, ease: motionEase },
    },
  };

  return (
    <motion.div
      className={styles.home__heroCopy}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.p className={styles.home__heroEyebrow} variants={itemVariants}>
        <AutoAwesomeRounded aria-hidden="true" className={styles.home__heroEyebrowIcon} />
        {content.eyebrow}
      </motion.p>
      <h1 className={styles.home__heroTitle}>
        <span className={styles.home__heroTitleLine}>
          <motion.span className={styles.home__heroTitleLineInner} variants={titleVariants}>
            {content.titleLead}
          </motion.span>
        </span>
        <span className={`${styles.home__heroTitleLine} ${styles.home__heroTitleAccent}`}>
          <motion.span className={styles.home__heroTitleLineInner} variants={titleVariants}>
            {content.titleAccent}
          </motion.span>
        </span>
      </h1>
      <motion.p className={styles.home__heroDescription} variants={itemVariants}>
        {content.description}
      </motion.p>
      <motion.div className={styles.home__heroActions} variants={itemVariants}>
        <ButtonLink href={`/${locale}/courses`}>{content.primaryCta}</ButtonLink>
        <ButtonLink href={`/${locale}/contact`} variant="secondary">
          {content.secondaryCta}
        </ButtonLink>
      </motion.div>
    </motion.div>
  );
}
