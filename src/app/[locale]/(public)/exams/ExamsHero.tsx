import { PageHero } from "@/components/ui/page-hero";
import type { PageCopy } from "@/dictionaries/page-copy";

type ExamsHeroProps = {
  eyebrow: string;
  copy: PageCopy;
};

export function ExamsHero({ eyebrow, copy }: ExamsHeroProps) {
  return (
    <PageHero eyebrow={eyebrow} title={copy.exams.title} description={copy.exams.description} />
  );
}
