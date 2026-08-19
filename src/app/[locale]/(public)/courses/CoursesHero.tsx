import { PageHero } from "@/components/ui/PageHero";
import type { PageCopy } from "@/dictionaries/public/PageCopy";

type CoursesHeroProps = {
  eyebrow: string;
  copy: PageCopy;
};

export function CoursesHero({ eyebrow, copy }: CoursesHeroProps) {
  return (
    <PageHero eyebrow={eyebrow} title={copy.courses.title} description={copy.courses.description} />
  );
}
