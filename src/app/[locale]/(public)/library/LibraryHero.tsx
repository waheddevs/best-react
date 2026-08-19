import { PageHero } from "@/components/ui/page-hero";
import type { PageCopy } from "@/dictionaries/page-copy";

type LibraryHeroProps = {
  eyebrow: string;
  copy: PageCopy;
};

export function LibraryHero({ eyebrow, copy }: LibraryHeroProps) {
  return (
    <PageHero eyebrow={eyebrow} title={copy.library.title} description={copy.library.description} />
  );
}
