import { PageHero } from "@/components/ui/PageHero";
import type { PageCopy } from "@/dictionaries/public/PageCopy";

type FaqHeroProps = {
  eyebrow: string;
  copy: PageCopy;
};

export function FaqHero({ eyebrow, copy }: FaqHeroProps) {
  return <PageHero eyebrow={eyebrow} title={copy.faq.title} description={copy.faq.description} />;
}
