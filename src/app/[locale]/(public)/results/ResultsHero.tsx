import { PageHero } from "@/components/ui/page-hero";
import type { PageCopy } from "@/dictionaries/page-copy";

type ResultsHeroProps = {
  eyebrow: string;
  copy: PageCopy;
};

export function ResultsHero({ eyebrow, copy }: ResultsHeroProps) {
  return (
    <PageHero eyebrow={eyebrow} title={copy.results.title} description={copy.results.description} />
  );
}
