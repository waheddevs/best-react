import { PageHero } from "@/components/ui/PageHero";
import type { PageCopy } from "@/dictionaries/public/PageCopy";

type LibraryHeroProps = {
  eyebrow: string;
  copy: PageCopy;
};

export function LibraryHero({ eyebrow, copy }: LibraryHeroProps) {
  return (
    <PageHero eyebrow={eyebrow} title={copy.library.title} description={copy.library.description} />
  );
}
