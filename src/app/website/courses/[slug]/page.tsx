import CheckCircleRounded from "@mui/icons-material/CheckCircleRounded";
import ScheduleRounded from "@mui/icons-material/ScheduleRounded";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ButtonLink } from "@/components/ui/button-link";
import { DraftNotice } from "@/components/ui/draft-notice";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { defaultLocale } from "@/config/locales";
import { courses } from "@/data/public-content";
import { getPageCopy } from "@/dictionaries/page-copy";
import { createPageMetadata } from "@/lib/metadata";

type CourseDetailPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return courses.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: CourseDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = defaultLocale;
  const course = courses.find((item) => item.slug === slug);
  if (!course) return {};
  return createPageMetadata(
    course.title[locale],
    course.summary[locale],
    `/courses/${slug}`,
    course.image,
  );
}

export default async function CourseDetailPage({ params }: CourseDetailPageProps) {
  const { slug } = await params;
  const locale = defaultLocale;
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
        <div className="courses-page__2">
          <div className="courses-page__3">
            <DraftNotice badge={copy.common.draftBadge} note={copy.common.draftNote} />
            <div>
              <SectionHeading title={copy.courses.overview} />
              <p className="courses-page__4">{course.summary[locale]}</p>
            </div>
            <div>
              <h2 className="courses-page__5">{copy.courses.audience}</h2>
              <p className="courses-page__6">{course.audience[locale]}</p>
            </div>
            <div>
              <h2 className="courses-page__7">{copy.courses.outcomes}</h2>
              <ul className="courses-page__8">
                {course.outcomes[locale].map((outcome) => (
                  <li key={outcome} className="courses-page__9">
                    <CheckCircleRounded aria-hidden="true" className="courses-page__10" />
                    {outcome}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="courses-page__11">{copy.courses.curriculum}</h2>
              <ol className="courses-page__12">
                {course.curriculum[locale].map((item, index) => (
                  <li key={item} className="courses-page__13">
                    <span className="courses-page__14">{index + 1}</span>
                    <span className="courses-page__15">{item}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <h2 className="courses-page__16">{copy.courses.prerequisites}</h2>
              <p className="courses-page__17">{course.prerequisites[locale]}</p>
            </div>
          </div>
          <aside className="courses-page__18">
            <dl className="courses-page__19">
              <div>
                <dt className="courses-page__20">{copy.courses.level}</dt>
                <dd className="courses-page__21">{course.level[locale]}</dd>
              </div>
              <div>
                <dt className="courses-page__22">{copy.courses.format}</dt>
                <dd className="courses-page__23">{course.formatLabel[locale]}</dd>
              </div>
              <div>
                <dt className="courses-page__24">
                  <ScheduleRounded aria-hidden="true" sx={{ fontSize: 18 }} />
                  {copy.courses.duration}
                </dt>
                <dd className="courses-page__25">{course.duration[locale]}</dd>
              </div>
            </dl>
            <h2 className="courses-page__26">{copy.courses.detailCtaTitle}</h2>
            <div className="courses-page__27">
              <ButtonLink href={`/website/contact`}>{copy.common.contactCta}</ButtonLink>
            </div>
          </aside>
        </div>
      </Section>
    </main>
  );
}
