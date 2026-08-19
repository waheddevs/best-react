import ScheduleRounded from "@mui/icons-material/ScheduleRounded";

import { ButtonLink } from "@/components/ui/button-link";
import type { Locale } from "@/config/locales";
import type { PageCopy } from "@/dictionaries/page-copy";
import type { Course } from "@/types/public-content";

type CourseSidebarProps = {
  course: Course;
  locale: Locale;
  copy: PageCopy;
};

export function CourseSidebar({ course, locale, copy }: CourseSidebarProps) {
  return (
    <aside className="h-fit rounded-[1.75rem] border border-border bg-surface p-6 lg:sticky lg:top-28">
      <dl className="grid gap-5 text-sm">
        <div>
          <dt className="text-muted">{copy.courses.level}</dt>
          <dd className="mt-1 font-extrabold text-heading">{course.level[locale]}</dd>
        </div>
        <div>
          <dt className="text-muted">{copy.courses.format}</dt>
          <dd className="mt-1 font-extrabold text-heading">{course.formatLabel[locale]}</dd>
        </div>
        <div>
          <dt className="flex items-center gap-2 text-muted">
            <ScheduleRounded aria-hidden="true" sx={{ fontSize: 18 }} />
            {copy.courses.duration}
          </dt>
          <dd className="mt-1 font-extrabold text-heading">{course.duration[locale]}</dd>
        </div>
      </dl>
      <h2 className="mt-8 text-xl font-black tracking-[-0.03em] text-heading">
        {copy.courses.detailCtaTitle}
      </h2>
      <div className="mt-5">
        <ButtonLink href={`/${locale}/contact`}>{copy.common.contactCta}</ButtonLink>
      </div>
    </aside>
  );
}
