"use client";

import { motion, useReducedMotion } from "motion/react";

import styles from "@/css/public/home.module.css";
import type { PageCopy } from "@/dictionaries/public/PageCopy";

type LearningProcessStepsProps = {
  items: PageCopy["home"]["processItems"];
};

export function LearningProcessSteps({ items }: LearningProcessStepsProps) {
  /* HOOKS */
  const reduceMotion = useReducedMotion();

  return (
    <motion.ol
      className={styles.home__processList}
      initial="hidden"
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: reduceMotion ? 0 : 0.08,
            staggerChildren: reduceMotion ? 0 : 0.1,
          },
        },
      }}
      viewport={{ amount: 0.2, once: true }}
      whileInView="visible"
    >
      {items.map((item, index) => (
        <motion.li
          className={styles.home__processItem}
          key={item.title}
          variants={{
            hidden: {
              opacity: 0,
              scale: reduceMotion ? 1 : 0.985,
              y: reduceMotion ? 0 : 20,
            },
            visible: {
              opacity: 1,
              scale: 1,
              transition: {
                duration: reduceMotion ? 0.18 : 0.5,
                ease: [0.22, 1, 0.36, 1],
              },
              y: 0,
            },
          }}
        >
          <span className={styles.home__processNumber}>{String(index + 1).padStart(2, "0")}</span>
          <h3 className={styles.home__processTitle}>{item.title}</h3>
          <p className={styles.home__processDescription}>{item.description}</p>
        </motion.li>
      ))}
    </motion.ol>
  );
}
