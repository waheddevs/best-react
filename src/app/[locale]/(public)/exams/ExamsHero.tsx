import { PageHero } from "@/components/ui/PageHero";
import type { PageCopy } from "@/dictionaries/public/PageCopy";

import { ExamsHeroVisual } from "./ExamsHeroVisual";

type ExamsHeroProps = {
  eyebrow: string;
  copy: PageCopy;
};

export function ExamsHero({ eyebrow, copy }: ExamsHeroProps) {
  return (
    <PageHero
      animateCopy
      eyebrow={eyebrow}
      title={copy.exams.title}
      description={copy.exams.description}
      visual={<ExamsHeroVisual copy={copy.exams} />}
    />
  );
}
