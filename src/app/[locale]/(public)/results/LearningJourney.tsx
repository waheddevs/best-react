import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import type { PageCopy } from "@/dictionaries/page-copy";

type LearningJourneyProps = {
  copy: PageCopy;
};

export function LearningJourney({ copy }: LearningJourneyProps) {
  return (
    <Section className="bg-surface">
      <SectionHeading title={copy.results.journeyTitle} />
      <ol className="mt-10 grid gap-5 lg:grid-cols-3">
        {copy.results.journeySteps.map((step, index) => (
          <li key={step.title} className="rounded-[1.75rem] border border-border bg-background p-6">
            <span className="grid size-11 place-items-center rounded-full bg-(image:--gradient-cta) text-sm font-black text-white">
              {index + 1}
            </span>
            <h2 className="mt-8 text-xl font-black text-heading">{step.title}</h2>
            <p className="mt-3 text-sm leading-7 text-muted">{step.description}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
