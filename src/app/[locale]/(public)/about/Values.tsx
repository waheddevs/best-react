import AutoStoriesRounded from "@mui/icons-material/AutoStoriesRounded";
import LightbulbRounded from "@mui/icons-material/LightbulbRounded";
import VerifiedRounded from "@mui/icons-material/VerifiedRounded";
import VolunteerActivismRounded from "@mui/icons-material/VolunteerActivismRounded";

import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import type { PageCopy } from "@/dictionaries/page-copy";

const valueIcons = [
  LightbulbRounded,
  AutoStoriesRounded,
  VolunteerActivismRounded,
  VerifiedRounded,
];

type ValuesProps = {
  copy: PageCopy;
};

export function Values({ copy }: ValuesProps) {
  return (
    <Section className="bg-surface">
      <SectionHeading title={copy.about.approachTitle} />
      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {copy.about.values.map((value, index) => {
          const Icon = valueIcons[index];

          return (
            <article
              key={value.title}
              className="rounded-[1.75rem] border border-border bg-background p-6"
            >
              <span className="grid size-12 place-items-center rounded-2xl bg-brand/15 text-heading">
                <Icon aria-hidden="true" />
              </span>
              <h2 className="mt-8 text-xl font-black text-heading">{value.title}</h2>
              <p className="mt-3 text-sm leading-7 text-muted">{value.description}</p>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
