import { PageHero } from "@/components/ui/PageHero";
import type { PageCopy } from "@/dictionaries/public/PageCopy";

import { AboutHeroVisual } from "./AboutHeroVisual";

type AboutHeroProps = {
  eyebrow: string;
  copy: PageCopy;
};

export function AboutHero({ eyebrow, copy }: AboutHeroProps) {
  return (
    <PageHero
      animateCopy
      eyebrow={eyebrow}
      title={copy.about.title}
      description={copy.about.description}
      visual={<AboutHeroVisual copy={copy.about} />}
    />
  );
}
