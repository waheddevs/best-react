import ExploreRounded from "@mui/icons-material/ExploreRounded";
import GroupsRounded from "@mui/icons-material/GroupsRounded";
import InsightsRounded from "@mui/icons-material/InsightsRounded";

import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import type { PageCopy } from "@/dictionaries/page-copy";

const whyIcons = [ExploreRounded, GroupsRounded, InsightsRounded];

type WhyBestProps = {
  copy: PageCopy;
};

export function WhyBest({ copy }: WhyBestProps) {
  return (
    <Section className="bg-surface">
      <SectionHeading eyebrow={copy.home.whyEyebrow} title={copy.home.whyTitle} />
      <div className="mt-10 grid gap-5 lg:grid-cols-[1.15fr_0.85fr_0.85fr]">
        {copy.home.whyItems.map((item, index) => {
          const Icon = whyIcons[index];

          return (
            <article
              key={item.title}
              className={`relative overflow-hidden rounded-[1.75rem] border border-border p-7 ${
                index === 0
                  ? "bg-(image:--gradient-cta) text-white lg:min-h-80"
                  : "bg-background text-text"
              }`}
            >
              <span
                className={`grid size-12 place-items-center rounded-2xl ${index === 0 ? "bg-white/15 text-white" : "bg-brand/15 text-heading"}`}
              >
                <Icon aria-hidden="true" />
              </span>
              <h3
                className={`mt-12 text-2xl font-black tracking-[-0.04em] ${index === 0 ? "text-white" : "text-heading"}`}
              >
                {item.title}
              </h3>
              <p
                className={`mt-3 max-w-md text-sm leading-7 ${index === 0 ? "text-white/80" : "text-muted"}`}
              >
                {item.description}
              </p>
              {index === 0 ? (
                <div className="absolute -right-16 -bottom-20 size-56 rounded-full border-34 border-white/10" />
              ) : null}
            </article>
          );
        })}
      </div>
    </Section>
  );
}
