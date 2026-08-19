import { PageHero } from "@/components/ui/PageHero";
import type { PageCopy } from "@/dictionaries/public/PageCopy";

type ResultsHeroProps = {
  eyebrow: string;
  copy: PageCopy;
};

export function ResultsHero({ eyebrow, copy }: ResultsHeroProps) {
  return (
    <PageHero eyebrow={eyebrow} title={copy.results.title} description={copy.results.description} />
  );
}
