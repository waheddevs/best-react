import CheckCircleRounded from "@mui/icons-material/CheckCircleRounded";
import ScheduleRounded from "@mui/icons-material/ScheduleRounded";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ButtonLink } from "@/components/ui/button-link";
import { DraftNotice } from "@/components/ui/draft-notice";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { isLocale, locales } from "@/config/locales";
import { courses } from "@/data/public-content";
import { getPageCopy } from "@/dictionaries/page-copy";
import { createPageMetadata } from "@/lib/metadata";

type CourseDetailPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return locales.flatMap((locale) => courses.map((course) => ({ locale, slug: course.slug })));
}

export async function generateMetadata({ params }: CourseDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const course = courses.find((item) => item.slug === slug);
  if (!course) return {};
  return createPageMetadata(
    locale,
    course.title[locale],
    course.summary[locale],
    `/courses/${slug}`,
    course.image,
  );
}

export default async function CourseDetailPage({ params }: CourseDetailPageProps) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const course = courses.find((item) => item.slug === slug);
  if (!course) notFound();
  const copy = getPageCopy(locale);

  return (
    <main>
      <PageHero
        eyebrow={copy.courses.categories[course.category]}
        title={course.title[locale]}
        description={course.summary[locale]}
      />
      <Section>
        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          <div className="space-y-10">
            <DraftNotice badge={copy.common.draftBadge} note={copy.common.draftNote} />
            <div>
              <SectionHeading title={copy.courses.overview} />
              <p className="mt-5 max-w-[72ch] text-base leading-8 text-muted">
                {course.summary[locale]}
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-black tracking-[-0.04em] text-heading">
                {copy.courses.audience}
              </h2>
              <p className="mt-4 max-w-[72ch] leading-8 text-muted">{course.audience[locale]}</p>
            </div>
            <div>
              <h2 className="text-2xl font-black tracking-[-0.04em] text-heading">
                {copy.courses.outcomes}
              </h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {course.outcomes[locale].map((outcome) => (
                  <li
                    key={outcome}
                    className="flex gap-3 rounded-2xl border border-border bg-surface p-4 leading-6 text-text"
                  >
                    <CheckCircleRounded aria-hidden="true" className="shrink-0 text-brand" />
                    {outcome}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-black tracking-[-0.04em] text-heading">
                {copy.courses.curriculum}
              </h2>
              <ol className="mt-5 space-y-3">
                {course.curriculum[locale].map((item, index) => (
                  <li
                    key={item}
                    className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-4"
                  >
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-sun text-sm font-black text-heading">
                      {index + 1}
                    </span>
                    <span className="font-semibold text-heading">{item}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <h2 className="text-2xl font-black tracking-[-0.04em] text-heading">
                {copy.courses.prerequisites}
              </h2>
              <p className="mt-4 leading-8 text-muted">{course.prerequisites[locale]}</p>
            </div>
          </div>
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
        </div>
      </Section>
    </main>
  );
}
