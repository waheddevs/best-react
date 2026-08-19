import InfoRounded from "@mui/icons-material/InfoRounded";

import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import type { PageCopy } from "@/dictionaries/page-copy";

type ExamDirectionsProps = {
  copy: PageCopy;
};

export function ExamDirections({ copy }: ExamDirectionsProps) {
  return (
    <Section>
      <div className="flex gap-3 rounded-3xl border border-coral/30 bg-[color-mix(in_srgb,var(--coral)_8%,var(--surface))] p-5">
        <InfoRounded aria-hidden="true" className="shrink-0 text-coral" />
        <p className="leading-7 text-text">{copy.exams.notice}</p>
      </div>
      <div className="mt-12">
        <SectionHeading title={copy.exams.directionsTitle} />
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {copy.exams.directions.map((item) => (
          <article
            key={item.title}
            className="rounded-[1.75rem] border border-border bg-surface p-6"
          >
            <h2 className="text-xl font-black text-heading">{item.title}</h2>
            <p className="mt-3 text-sm leading-7 text-muted">{item.description}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
