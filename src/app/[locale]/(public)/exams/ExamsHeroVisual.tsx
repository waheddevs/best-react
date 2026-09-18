import DescriptionRounded from "@mui/icons-material/DescriptionRounded";
import EditRounded from "@mui/icons-material/EditRounded";

import { HeroVisualFrame } from "@/components/motion/HeroVisualFrame";
import { LiveIllustration } from "@/components/motion/LiveIllustration";
import type { ExamPreviewCopy } from "@/types/ExamPreview";

import { ExamChecklistMotion } from "./ExamChecklistMotion";
import { ExamClockMotion } from "./ExamClockMotion";

type ExamsHeroVisualProps = {
  copy: ExamPreviewCopy;
};

export function ExamsHeroVisual({ copy }: ExamsHeroVisualProps) {
  return (
    <HeroVisualFrame className="exams__heroVisual">
      <span className="exams__heroOrbit" />
      <LiveIllustration className="exams__heroPaper" variant="tilt">
        <span className="exams__heroPaperIcon">
          <DescriptionRounded />
        </span>
        <strong className="exams__heroPaperTitle">{copy.heroVisualTitle}</strong>
        <span className="exams__heroPaperMeta">{copy.heroVisualMeta}</span>
        <ExamChecklistMotion />
      </LiveIllustration>
      <LiveIllustration className="exams__heroTimer" delay={0.4} variant="pulse">
        <ExamClockMotion />
      </LiveIllustration>
      <LiveIllustration className="exams__heroPencil" delay={0.9} variant="drift">
        <EditRounded />
      </LiveIllustration>
      <span className="exams__heroAccent" />
    </HeroVisualFrame>
  );
}
