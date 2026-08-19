import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import type { PageCopy } from "@/dictionaries/page-copy";

type ExamPreparationProps = {
  copy: PageCopy;
};

export function ExamPreparation({ copy }: ExamPreparationProps) {
  return (
    <Section>
      <SectionHeading title={copy.exams.preparationTitle} />
      <ol className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {copy.exams.preparation.map((item, index) => (
          <li key={item.title} className="rounded-[1.75rem] border border-border bg-surface p-6">
            <span className="grid size-11 place-items-center rounded-full bg-(image:--gradient-cta) text-sm font-black text-white">
              {index + 1}
            </span>
            <h2 className="mt-7 text-lg font-black text-heading">{item.title}</h2>
            <p className="mt-3 text-sm leading-6 text-muted">{item.description}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
