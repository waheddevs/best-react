import { Section } from "@/components/ui/section";
import type { PageCopy } from "@/dictionaries/page-copy";

type StoryProps = {
  copy: PageCopy;
};

export function Story({ copy }: StoryProps) {
  return (
    <Section>
      <div className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-4xl border border-border bg-surface p-7 sm:p-9">
          <h2 className="text-3xl font-black tracking-[-0.04em] text-heading">
            {copy.about.storyTitle}
          </h2>
          <p className="mt-5 leading-8 text-muted">{copy.about.storyBody}</p>
        </article>
        <article className="rounded-4xl bg-(image:--gradient-cta) p-7 text-white sm:p-9">
          <h2 className="text-3xl font-black tracking-[-0.04em] text-white">
            {copy.about.environmentTitle}
          </h2>
          <p className="mt-5 leading-8 text-white/80">{copy.about.environmentBody}</p>
        </article>
      </div>
    </Section>
  );
}
