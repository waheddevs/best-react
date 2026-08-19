import { PageHero } from "@/components/ui/PageHero";
import type { StudentLibraryCopy } from "@/dictionaries/student/Library";

type LibraryHeroProps = {
  copy: StudentLibraryCopy;
};

export function LibraryHero({ copy }: LibraryHeroProps) {
  return <PageHero eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />;
}
