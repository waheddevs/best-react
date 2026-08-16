"use client";

import { useReducedMotion } from "motion/react";

export function useMotionPreference() {
  return Boolean(useReducedMotion());
}
