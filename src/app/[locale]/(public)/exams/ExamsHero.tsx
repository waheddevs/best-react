import { PageHero } from "@/components/ui/PageHero";
import type { PageCopy } from "@/dictionaries/public/PageCopy";

type ExamsHeroProps = {
  eyebrow: string;
  copy: PageCopy;
};

export function ExamsHero({ eyebrow, copy }: ExamsHeroProps) {
  return (
    <PageHero eyebrow={eyebrow} title={copy.exams.title} description={copy.exams.description} />
  );
}
