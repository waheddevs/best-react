import { PageHero } from "@/components/ui/PageHero";
import type { PageCopy } from "@/dictionaries/public/PageCopy";

import { ResultsHeroVisual } from "./ResultsHeroVisual";

type ResultsHeroProps = {
  eyebrow: string;
  copy: PageCopy;
};

export function ResultsHero({ eyebrow, copy }: ResultsHeroProps) {
  return (
    <PageHero
      animateCopy
      eyebrow={eyebrow}
      title={copy.results.title}
      description={copy.results.description}
      visual={<ResultsHeroVisual copy={copy.results} />}
    />
  );
}
