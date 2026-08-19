import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import type { PageCopy } from "@/dictionaries/page-copy";

type LearningProcessProps = {
  copy: PageCopy;
};

export function LearningProcess({ copy }: LearningProcessProps) {
  return (
    <Section>
      <SectionHeading eyebrow={copy.home.processEyebrow} title={copy.home.processTitle} />
      <ol className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {copy.home.processItems.map((item, index) => (
          <li
            key={item.title}
            className="relative rounded-[1.75rem] border border-border bg-surface p-6"
          >
            <span className="grid size-11 place-items-center rounded-full bg-sun text-sm font-black text-heading">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-8 text-xl font-black tracking-[-0.03em] text-heading">
              {item.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-muted">{item.description}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
