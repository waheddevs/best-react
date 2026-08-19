import { PageHero } from "@/components/ui/page-hero";
import type { PageCopy } from "@/dictionaries/page-copy";

type AboutHeroProps = {
  eyebrow: string;
  copy: PageCopy;
};

export function AboutHero({ eyebrow, copy }: AboutHeroProps) {
  return (
    <PageHero eyebrow={eyebrow} title={copy.about.title} description={copy.about.description} />
  );
}
