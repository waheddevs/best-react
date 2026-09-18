import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Locale } from "@/config/Locales";
import type { PageCopy } from "@/dictionaries/public/PageCopy";
import type { PublicCourse } from "@/types/PublicCourse";

type CourseComparisonProps = {
  locale: Locale;
  copy: PageCopy;
  courses: PublicCourse[];
};

export function CourseComparison({ locale, copy, courses }: CourseComparisonProps) {
  return (
    <Section tone="surface">
      <Reveal className="courses__sectionHeading">
        <SectionHeading
          align="center"
          eyebrow={copy.courses.comparisonEyebrow}
          title={copy.courses.comparisonTitle}
          description={copy.courses.comparisonDescription}
        />
      </Reveal>
      <Reveal className="courses__comparison" delay={0.08}>
        <div className="courses__comparisonHeader" aria-hidden="true">
          <span>{copy.courses.comparisonCourse}</span>
          <span>{copy.courses.comparisonFocus}</span>
          <span>{copy.courses.level}</span>
          <span>{copy.courses.schedule}</span>
        </div>
        <div className="courses__comparisonRows">
          {courses.map((course) => (
            <article className="courses__comparisonRow" key={course.slug}>
              <div className="courses__comparisonCourse">
                <span>{course.symbol}</span>
                <strong>{course.comparisonTitle?.[locale] ?? course.title[locale]}</strong>
              </div>
              <p data-label={copy.courses.comparisonFocus}>{course.focus[locale]}</p>
              <p data-label={copy.courses.level}>{course.level[locale]}</p>
              <p data-label={copy.courses.schedule}>{course.schedule[locale]}</p>
            </article>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
