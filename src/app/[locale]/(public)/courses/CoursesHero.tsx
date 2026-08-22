import { PageHero } from "@/components/ui/PageHero";
import type { PageCopy } from "@/dictionaries/public/PageCopy";

import { CoursesHeroVisual } from "./CoursesHeroVisual";

type CoursesHeroProps = {
  eyebrow: string;
  copy: PageCopy;
};

export function CoursesHero({ eyebrow, copy }: CoursesHeroProps) {
  return (
    <PageHero
      animateCopy
      eyebrow={eyebrow}
      title={copy.courses.title}
      description={copy.courses.description}
      visual={<CoursesHeroVisual copy={copy.courses} />}
    />
  );
}
