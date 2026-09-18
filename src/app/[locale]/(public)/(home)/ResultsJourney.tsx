"use client";

import FactCheckRounded from "@mui/icons-material/FactCheckRounded";
import MenuBookRounded from "@mui/icons-material/MenuBookRounded";
import TrackChangesRounded from "@mui/icons-material/TrackChangesRounded";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import type { PageCopy } from "@/dictionaries/public/PageCopy";

type ResultsJourneyProps = {
  items: PageCopy["results"]["journeySteps"];
};

const journeyIcons = [TrackChangesRounded, MenuBookRounded, FactCheckRounded];

export function ResultsJourney({ items }: ResultsJourneyProps) {
  /* HOOKS */
  const panelRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(panelRef, { amount: 0.3, once: true });
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(-1);
  const visibleActiveIndex = reduceMotion && isInView ? items.length - 1 : activeIndex;

  useEffect(() => {
    if (!isInView || reduceMotion) return;

    const timers = items.map((_, index) =>
      window.setTimeout(() => setActiveIndex(index), 420 + index * 720),
    );

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [isInView, items, reduceMotion]);

  return (
    <div className="home__resultsPanel" ref={panelRef}>
      <div aria-hidden="true" className="home__resultsTrack">
        <span className="home__resultsTrackBase" />
        <motion.span
          animate={{ scaleX: isInView ? 1 : 0 }}
          className="home__resultsTrackProgress"
          initial={{ scaleX: reduceMotion ? 1 : 0 }}
          transition={{ duration: reduceMotion ? 0 : 1.75, ease: [0.22, 1, 0.36, 1] }}
        />
        {items.map((item, index) => {
          const JourneyIcon = journeyIcons[index] ?? FactCheckRounded;

          return (
            <span
              className="home__resultsTrackNode"
              data-active={index <= visibleActiveIndex}
              key={item.title}
            >
              <JourneyIcon />
            </span>
          );
        })}
      </div>

      <motion.ol
        animate={isInView ? "visible" : "hidden"}
        className="home__resultsGrid"
        initial="hidden"
        variants={{
          hidden: {},
          visible: {
            transition: {
              delayChildren: reduceMotion ? 0 : 0.16,
              staggerChildren: reduceMotion ? 0 : 0.12,
            },
          },
        }}
      >
        {items.map((item, index) => (
          <motion.li
            className="home__resultsCard"
            data-active={index === visibleActiveIndex}
            key={item.title}
            variants={{
              hidden: { opacity: 0, scale: reduceMotion ? 1 : 0.98, y: reduceMotion ? 0 : 18 },
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
            <span className="home__resultsMeta">{item.meta}</span>
            <h3 className="home__resultsTitle">{item.title}</h3>
            <p className="home__resultsDescription">{item.description}</p>
          </motion.li>
        ))}
      </motion.ol>
    </div>
  );
}
