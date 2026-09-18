"use client";

import TrendingUpRounded from "@mui/icons-material/TrendingUpRounded";
import { motion, useReducedMotion } from "motion/react";

const pathPoints = [
  [42, 248],
  [85, 242],
  [116, 227],
  [143, 209],
  [173, 194],
  [214, 188],
  [256, 182],
  [287, 166],
  [313, 148],
  [342, 132],
  [382, 126],
  [413, 121],
  [437, 106],
  [456, 87],
  [472, 65],
  [486, 45],
] as const;

const pathX = pathPoints.map(([x]) => x);
const pathY = pathPoints.map(([, y]) => y);
const travelTimes = pathPoints.map((_, index) => 0.04 + (index / (pathPoints.length - 1)) * 0.5);
const markerTimes = [0, ...travelTimes, 0.58, 0.9, 0.91, 1];
const markerX = [15, ...pathX, 504, 504, 15, 15].map((position) => `${8 + (position / 520) * 84}%`);
const markerY = [274, ...pathY, 30, 30, 274, 274].map(
  (position) => `${8 + (position / 290) * 84}%`,
);
const markerOpacity = [0, ...pathPoints.map(() => 1), 0, 0, 0, 0];

export function ResultsProgressMotion() {
  /* HOOKS */
  const reduceMotion = useReducedMotion();

  return (
    <div aria-hidden="true" className="results__heroProgressMotion">
      <svg
        className="results__heroPath"
        viewBox="0 0 520 290"
        fill="none"
        preserveAspectRatio="none"
      >
        <path d="M42 248C128 248 133 188 214 188C298 188 303 126 382 126C441 126 462 76 486 45" />
      </svg>
      <motion.div
        className="results__heroProgressMarker"
        initial={false}
        animate={
          reduceMotion
            ? {
                left: `${8 + (214 / 520) * 84}%`,
                opacity: 1,
                top: `${8 + (188 / 290) * 84}%`,
              }
            : {
                left: markerX,
                opacity: markerOpacity,
                top: markerY,
              }
        }
        transition={{
          duration: reduceMotion ? 0 : 6.4,
          ease: "linear",
          repeat: reduceMotion ? 0 : Number.POSITIVE_INFINITY,
          times: markerTimes,
        }}
      >
        <span className="results__heroProgressTile">
          <TrendingUpRounded />
        </span>
      </motion.div>
    </div>
  );
}
