import ArrowOutwardRounded from "@mui/icons-material/ArrowOutwardRounded";
import AutoStoriesRounded from "@mui/icons-material/AutoStoriesRounded";
import ScheduleRounded from "@mui/icons-material/ScheduleRounded";
import Image from "next/image";
import Link from "next/link";

import type { Locale } from "@/config/locales";
import type { PageCopy } from "@/dictionaries/page-copy";
import type { Course } from "@/types/public-content";

type CourseCardProps = {
  course: Course;
  locale: Locale;
  copy: PageCopy;
};

export function CourseCard({ course, locale, copy }: CourseCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-border bg-surface shadow-[0_12px_34px_rgb(16_42_67_/_6%)] transition duration-200 hover:-translate-y-1 hover:border-brand hover:shadow-(--shadow-soft)">
      <Image
        src={course.image}
        alt={course.imageAlt[locale]}
        width={1448}
        height={1086}
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        className="aspect-4/3 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
      />
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <span className="rounded-full bg-[color-mix(in_srgb,var(--brand-turquoise)_14%,transparent)] px-3 py-1.5 text-xs font-bold text-heading">
            {copy.courses.categories[course.category]}
          </span>
          <span className="grid size-11 place-items-center rounded-2xl bg-[color-mix(in_srgb,var(--action-blue)_9%,transparent)] text-action">
            <AutoStoriesRounded aria-hidden="true" />
          </span>
        </div>
        <h2 className="mt-6 text-2xl font-black tracking-[-0.04em] text-heading">
          {course.title[locale]}
        </h2>
        <p className="mt-3 flex-1 text-sm leading-6 text-muted">{course.summary[locale]}</p>
        <dl className="mt-6 grid gap-3 border-t border-border pt-5 text-sm">
          <div className="flex items-center justify-between gap-4">
            <dt className="text-muted">{copy.courses.level}</dt>
            <dd className="font-bold text-heading">{course.level[locale]}</dd>
          </div>
          <div className="flex items-center justify-between gap-4">
            <dt className="flex items-center gap-2 text-muted">
              <ScheduleRounded aria-hidden="true" sx={{ fontSize: 18 }} />
              {copy.courses.format}
            </dt>
            <dd className="font-bold text-heading">{course.formatLabel[locale]}</dd>
          </div>
        </dl>
        <Link
          href={`/${locale}/courses/${course.slug}`}
          className="mt-6 inline-flex min-h-11 items-center justify-between rounded-xl border border-border px-4 font-bold text-heading transition-colors group-hover:border-action group-hover:text-action"
        >
          {copy.common.learnMore}
          <ArrowOutwardRounded aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
