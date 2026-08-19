import FactCheckRounded from "@mui/icons-material/FactCheckRounded";

import { Section } from "@/components/ui/section";
import type { PageCopy } from "@/dictionaries/page-copy";

type ResultsNoticeProps = {
  copy: PageCopy;
};

export function ResultsNotice({ copy }: ResultsNoticeProps) {
  return (
    <Section>
      <div className="grid items-center gap-8 rounded-4xl border border-border bg-surface p-7 sm:p-10 lg:grid-cols-[auto_1fr]">
        <span className="grid size-16 place-items-center rounded-2xl bg-sun text-heading">
          <FactCheckRounded aria-hidden="true" sx={{ fontSize: 32 }} />
        </span>
        <div>
          <h2 className="text-2xl font-black tracking-[-0.04em] text-heading">
            {copy.results.noticeTitle}
          </h2>
          <p className="mt-3 max-w-4xl leading-7 text-muted">{copy.results.noticeBody}</p>
        </div>
      </div>
    </Section>
  );
}
