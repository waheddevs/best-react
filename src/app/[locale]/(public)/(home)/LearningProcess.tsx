import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { PageCopy } from "@/dictionaries/public/PageCopy";

import { LearningProcessSteps } from "./LearningProcessSteps";

type LearningProcessProps = {
  copy: PageCopy;
};

export function LearningProcess({ copy }: LearningProcessProps) {
  return (
    <Section tone="surface">
      <Reveal>
        <SectionHeading
          align="center"
          eyebrow={copy.home.processEyebrow}
          title={copy.home.processTitle}
        />
      </Reveal>
      <LearningProcessSteps items={copy.home.processItems} />
    </Section>
  );
}
