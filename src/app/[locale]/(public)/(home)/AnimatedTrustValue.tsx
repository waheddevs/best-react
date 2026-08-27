"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";

import styles from "@/css/public/home.module.css";

type AnimatedTrustValueProps = {
  delay?: number;
  value: string;
};

type TrustValueParts = {
  groupingSeparator: string;
  prefix: string;
  suffix: string;
  target: number;
};

function getTrustValueParts(value: string): TrustValueParts {
  const firstDigitIndex = value.search(/\d/);
  const lastDigitIndex = Math.max(...Array.from(value.matchAll(/\d/g), (match) => match.index));

  if (firstDigitIndex < 0 || lastDigitIndex < firstDigitIndex) {
    return { groupingSeparator: "", prefix: "", suffix: value, target: 0 };
  }

  const numericPart = value.slice(firstDigitIndex, lastDigitIndex + 1);

  return {
    groupingSeparator: numericPart.includes(",") ? "," : numericPart.includes(" ") ? " " : "",
    prefix: value.slice(0, firstDigitIndex),
    suffix: value.slice(lastDigitIndex + 1),
    target: Number(numericPart.replace(/\D/g, "")),
  };
}

function formatTrustValue(current: number, parts: TrustValueParts) {
  const digits = Math.round(current).toString();
  const groupedDigits = parts.groupingSeparator
    ? digits.replace(/\B(?=(\d{3})+(?!\d))/g, parts.groupingSeparator)
    : digits;

  return `${parts.prefix}${groupedDigits}${parts.suffix}`;
}

export function AnimatedTrustValue({ delay = 0, value }: AnimatedTrustValueProps) {
  /* HOOKS */
  const valueRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(valueRef, { amount: 0.65, once: true });
  const reduceMotion = useReducedMotion();
  const valueParts = useMemo(() => getTrustValueParts(value), [value]);
  const [displayValue, setDisplayValue] = useState(() => formatTrustValue(0, valueParts));
  const visibleValue = reduceMotion && isInView ? value : displayValue;

  useEffect(() => {
    if (!isInView || reduceMotion) return;

    const controls = animate(0, valueParts.target, {
      delay,
      duration: 1.45,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (current) => setDisplayValue(formatTrustValue(current, valueParts)),
    });

    return () => controls.stop();
  }, [delay, isInView, reduceMotion, value, valueParts]);

  return (
    <>
      <span aria-hidden="true" ref={valueRef}>
        {visibleValue}
      </span>
      <span className={styles.home__trustAccessibleValue}>{value}</span>
    </>
  );
}
