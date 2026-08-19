import { PageHero } from "@/components/ui/PageHero";
import type { PageCopy } from "@/dictionaries/public/PageCopy";

type AboutHeroProps = {
  eyebrow: string;
  copy: PageCopy;
};

export function AboutHero({ eyebrow, copy }: AboutHeroProps) {
  return (
    <PageHero eyebrow={eyebrow} title={copy.about.title} description={copy.about.description} />
  );
}
