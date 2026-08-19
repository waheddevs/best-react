import { PageHero } from "@/components/ui/page-hero";
import type { PageCopy } from "@/dictionaries/page-copy";

type FaqHeroProps = {
  eyebrow: string;
  copy: PageCopy;
};

export function FaqHero({ eyebrow, copy }: FaqHeroProps) {
  return <PageHero eyebrow={eyebrow} title={copy.faq.title} description={copy.faq.description} />;
}
