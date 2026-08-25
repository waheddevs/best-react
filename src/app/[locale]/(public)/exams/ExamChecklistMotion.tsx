"use client";

import CheckRounded from "@mui/icons-material/CheckRounded";
import { useEffect } from "react";
import { useAnimate, useReducedMotion } from "motion/react";

import styles from "@/css/public/exams.module.css";

const checklistRows = [0, 1, 2] as const;
const checklistEase = [0.22, 1, 0.36, 1] as const;

export function ExamChecklistMotion() {
  /* HOOKS */
  const reduceMotion = useReducedMotion();
  const [scope, animate] = useAnimate<HTMLDivElement>();

  useEffect(() => {
    const checklist = scope.current;
    let cancelled = false;
    let holdTimer: number | undefined;
    let resolveHold: (() => void) | undefined;

    if (!checklist) {
      return;
    }

    const checks = Array.from(checklist.querySelectorAll<HTMLElement>("[data-exam-check]"));
    const checkFills = Array.from(
      checklist.querySelectorAll<HTMLElement>("[data-exam-check-fill]"),
    );
    const bars = Array.from(checklist.querySelectorAll<HTMLElement>("[data-exam-bar]"));

    if (
      checks.length !== checklistRows.length ||
      checkFills.length !== checklistRows.length ||
      bars.length !== checklistRows.length
    ) {
      return;
    }

    const hold = async (duration: number) => {
      await new Promise<void>((resolve) => {
        resolveHold = resolve;
        holdTimer = window.setTimeout(() => {
          resolveHold = undefined;
          resolve();
        }, duration * 1000);
      });
    };

    const resetChecklist = async () => {
      await Promise.all([
        animate(checks, { scale: 1 }, { duration: 0 }),
        animate(checkFills, { opacity: 0 }, { duration: 0 }),
        animate(bars, { scaleX: 0 }, { duration: 0 }),
      ]);
    };

    const showCompletedChecklist = async () => {
      await Promise.all([
        animate(checks, { scale: 1 }, { duration: 0 }),
        animate(checkFills, { opacity: 1 }, { duration: 0 }),
        animate(bars, { scaleX: 1 }, { duration: 0 }),
      ]);
    };

    const runChecklist = async () => {
      if (reduceMotion) {
        await showCompletedChecklist();
        return;
      }

      while (!cancelled) {
        await resetChecklist();

        for (const row of checklistRows) {
          if (cancelled) {
            return;
          }

          await animate(bars[row], { scaleX: 1 }, { duration: 1.1, ease: checklistEase });

          if (cancelled) {
            return;
          }

          await Promise.all([
            animate(checkFills[row], { opacity: 1 }, { duration: 0 }),
            animate(
              checks[row],
              { scale: [1, 1.3, 0.94, 1] },
              { duration: 0.34, ease: checklistEase, times: [0, 0.35, 0.68, 1] },
            ),
          ]);
        }

        await hold(2);

        for (const row of [...checklistRows].reverse()) {
          if (cancelled) {
            return;
          }

          await Promise.all([
            animate(bars[row], { scaleX: 0 }, { duration: 0.28, ease: "easeInOut" }),
            animate(checkFills[row], { opacity: 0 }, { duration: 0.28 }),
          ]);
        }

        await hold(0.2);
      }
    };

    void runChecklist();

    return () => {
      cancelled = true;
      if (holdTimer) {
        window.clearTimeout(holdTimer);
      }
      resolveHold?.();
    };
  }, [animate, reduceMotion, scope]);

  return (
    <div ref={scope} aria-hidden="true" className={styles.exams__heroChecklist}>
      {checklistRows.map((row) => (
        <div className={styles.exams__heroChecklistRow} key={row}>
          <span className={styles.exams__heroChecklistCheck} data-exam-check={row}>
            <i className={styles.exams__heroChecklistCheckFill} data-exam-check-fill={row} />
            <CheckRounded />
          </span>
          <span className={styles.exams__heroChecklistTrack}>
            <i className={styles.exams__heroChecklistFill} data-exam-bar={row} />
          </span>
        </div>
      ))}
    </div>
  );
}
