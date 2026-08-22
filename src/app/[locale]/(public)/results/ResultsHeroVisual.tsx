import SchoolRounded from "@mui/icons-material/SchoolRounded";
import WorkspacePremiumRounded from "@mui/icons-material/WorkspacePremiumRounded";

import { HeroVisualFrame } from "@/components/motion/HeroVisualFrame";
import { LiveIllustration } from "@/components/motion/LiveIllustration";
import styles from "@/css/public/results.module.css";
import type { PageCopy } from "@/dictionaries/public/PageCopy";

import { ResultsPlusMotion } from "./ResultsPlusMotion";
import { ResultsProgressMotion } from "./ResultsProgressMotion";

type ResultsHeroVisualProps = {
  copy: PageCopy["results"];
};

export function ResultsHeroVisual({ copy }: ResultsHeroVisualProps) {
  return (
    <HeroVisualFrame className={styles.results__heroVisual}>
      <div className={styles.results__heroGrid} />
      <ResultsProgressMotion />
      <span className={`${styles.results__heroMilestone} ${styles.results__heroMilestoneStart}`}>
        <SchoolRounded />
      </span>
      <span className={`${styles.results__heroMilestone} ${styles.results__heroMilestoneEnd}`}>
        <WorkspacePremiumRounded />
      </span>
      <ResultsPlusMotion />
      <LiveIllustration className={styles.results__heroCaption} delay={0.3} variant="tilt">
        <strong>{copy.journeyTitle}</strong>
        <span>{copy.journeySteps[1].title}</span>
      </LiveIllustration>
      <span className={styles.results__heroAccent} />
    </HeroVisualFrame>
  );
}
