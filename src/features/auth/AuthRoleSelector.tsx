"use client";

import AdminPanelSettingsRounded from "@mui/icons-material/AdminPanelSettingsRounded";
import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import SchoolRounded from "@mui/icons-material/SchoolRounded";
import StudentRounded from "@mui/icons-material/PersonRounded";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ComponentType } from "react";

import type { Locale } from "@/config/Locales";
import styles from "@/css/public/auth.module.css";
import type { AuthCopy } from "@/dictionaries/public/Auth";
import { authRoles, type AuthRole } from "@/types/Auth";

type AuthRoleSelectorProps = {
  copy: AuthCopy;
  locale: Locale;
};

const roleIcons: Record<AuthRole, ComponentType<{ "aria-hidden"?: boolean }>> = {
  teacher: SchoolRounded,
  student: StudentRounded,
  admin: AdminPanelSettingsRounded,
};

const motionEase = [0.22, 1, 0.36, 1] as const;

export function AuthRoleSelector({ copy, locale }: AuthRoleSelectorProps) {
  /* HOOKS */
  const reduceMotion = useReducedMotion();

  const listVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: reduceMotion ? 0 : 0.28,
        staggerChildren: reduceMotion ? 0 : 0.09,
      },
    },
  };
  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: reduceMotion ? 0 : 18,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0.01 : 0.44,
        ease: motionEase,
      },
    },
  };

  return (
    <motion.ul
      animate="visible"
      className={styles.auth__roleGrid}
      initial="hidden"
      variants={listVariants}
    >
      {authRoles.map((role) => {
        const Icon = roleIcons[role];
        const roleCopy = copy.roles[role];

        return (
          <motion.li className={styles.auth__roleItem} key={role} variants={itemVariants}>
            <Link
              className={styles.auth__roleCard}
              href={`/${locale}/login?role=${role}`}
              scroll={false}
            >
              <span className={styles.auth__roleIcon}>
                <Icon aria-hidden />
              </span>
              <span className={styles.auth__roleCopy}>
                <strong className={styles.auth__roleTitle}>{roleCopy.title}</strong>
                <span className={styles.auth__roleDescription}>{roleCopy.description}</span>
              </span>
              <ArrowForwardRounded aria-hidden className={styles.auth__roleArrow} />
            </Link>
          </motion.li>
        );
      })}
    </motion.ul>
  );
}
