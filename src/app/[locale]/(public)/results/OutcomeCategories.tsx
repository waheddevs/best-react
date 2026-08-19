import CheckCircleRounded from "@mui/icons-material/CheckCircleRounded";

import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import type { PageCopy } from "@/dictionaries/page-copy";

type OutcomeCategoriesProps = {
  copy: PageCopy;
};

export function OutcomeCategories({ copy }: OutcomeCategoriesProps) {
  return (
    <Section>
      <SectionHeading title={copy.results.categoriesTitle} />
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {copy.results.categories.map((item) => (
          <article
            key={item.title}
            className="rounded-[1.75rem] border border-border bg-surface p-6"
          >
            <CheckCircleRounded aria-hidden="true" className="text-brand" />
            <h2 className="mt-7 text-xl font-black text-heading">{item.title}</h2>
            <p className="mt-3 text-sm leading-7 text-muted">{item.description}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
