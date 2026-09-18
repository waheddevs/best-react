import SchoolRounded from "@mui/icons-material/SchoolRounded";
import WorkspacePremiumRounded from "@mui/icons-material/WorkspacePremiumRounded";

import { HeroVisualFrame } from "@/components/motion/HeroVisualFrame";
import { LiveIllustration } from "@/components/motion/LiveIllustration";
import type { PageCopy } from "@/dictionaries/public/PageCopy";

import { ResultsPlusMotion } from "./ResultsPlusMotion";
import { ResultsProgressMotion } from "./ResultsProgressMotion";

type ResultsHeroVisualProps = {
  copy: PageCopy["results"];
};

export function ResultsHeroVisual({ copy }: ResultsHeroVisualProps) {
  return (
    <HeroVisualFrame className="results__heroVisual">
      <div className="results__heroGrid" />
      <ResultsProgressMotion />
      <span className="results__heroMilestone results__heroMilestoneStart">
        <SchoolRounded />
      </span>
      <span className="results__heroMilestone results__heroMilestoneEnd">
        <WorkspacePremiumRounded />
      </span>
      <ResultsPlusMotion />
      <LiveIllustration className="results__heroCaption" delay={0.3} variant="tilt">
        <strong>{copy.journeyTitle}</strong>
        <span>{copy.journeySteps[1].title}</span>
      </LiveIllustration>
      <span className="results__heroAccent" />
    </HeroVisualFrame>
  );
}
