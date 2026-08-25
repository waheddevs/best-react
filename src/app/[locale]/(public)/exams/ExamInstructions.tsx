import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";

import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import styles from "@/css/public/exams.module.css";
import type { ExamPreviewCopy } from "@/types/ExamPreview";

type ExamInstructionsProps = {
  copy: ExamPreviewCopy;
};

export function ExamInstructions({ copy }: ExamInstructionsProps) {
  return (
    <Section tone="surface">
      <Reveal>
        <SectionHeading
          align="center"
          description={copy.instructionsDescription}
          eyebrow={copy.instructionsEyebrow}
          title={copy.instructionsTitle}
        />
      </Reveal>
      <Reveal delay={0.08}>
        <ol className={styles.exams__instructionList}>
          {copy.instructionSteps.map((step, index) => (
            <li className={styles.exams__instructionItem} key={step.title}>
              <span className={styles.exams__instructionNumber}>0{index + 1}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
              {index < copy.instructionSteps.length - 1 ? (
                <ArrowForwardRounded
                  aria-hidden="true"
                  className={styles.exams__instructionArrow}
                />
              ) : null}
            </li>
          ))}
        </ol>
      </Reveal>
    </Section>
  );
}
