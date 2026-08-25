import { PageHero } from "@/components/ui/PageHero";
import type { ExamPreviewCopy } from "@/types/ExamPreview";

import { ExamsHeroVisual } from "./ExamsHeroVisual";

type ExamsHeroProps = {
  eyebrow: string;
  copy: ExamPreviewCopy;
};

export function ExamsHero({ eyebrow, copy }: ExamsHeroProps) {
  return (
    <PageHero
      animateCopy
      eyebrow={eyebrow}
      title={copy.title}
      description={copy.description}
      visual={<ExamsHeroVisual copy={copy} />}
    />
  );
}
