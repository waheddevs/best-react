import { PageHero } from "@/components/ui/page-hero";
import type { PageCopy } from "@/dictionaries/page-copy";

type CoursesHeroProps = {
  eyebrow: string;
  copy: PageCopy;
};

export function CoursesHero({ eyebrow, copy }: CoursesHeroProps) {
  return (
    <PageHero eyebrow={eyebrow} title={copy.courses.title} description={copy.courses.description} />
  );
}
