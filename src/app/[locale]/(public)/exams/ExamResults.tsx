import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ExamResultsPreview } from "@/features/exams/ExamResultsPreview";
import type { ExamPreviewCopy } from "@/types/ExamPreview";

type ExamResultsProps = {
  copy: ExamPreviewCopy;
};

export function ExamResults({ copy }: ExamResultsProps) {
  return (
    <Section tone="surface">
      <Reveal>
        <SectionHeading
          align="center"
          description={copy.resultsDescription}
          eyebrow={copy.resultsEyebrow}
          title={copy.resultsTitle}
        />
      </Reveal>
      <Reveal delay={0.08}>
        <ExamResultsPreview copy={copy} />
      </Reveal>
    </Section>
  );
}
