"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";
import { SurfaceEntrance } from "./SurfaceEntrance";

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
      <SurfaceEntrance />
      {children}
    </MotionConfig>
  );
}
