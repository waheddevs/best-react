import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Locale } from "@/config/Locales";
import styles from "@/css/public/courses.module.css";
import { courses } from "@/data/PublicCourses";
import type { PageCopy } from "@/dictionaries/public/PageCopy";

type CourseComparisonProps = {
  locale: Locale;
  copy: PageCopy;
};

export function CourseComparison({ locale, copy }: CourseComparisonProps) {
  return (
    <Section tone="surface">
      <Reveal className={styles.courses__sectionHeading}>
        <SectionHeading
          align="center"
          eyebrow={copy.courses.comparisonEyebrow}
          title={copy.courses.comparisonTitle}
          description={copy.courses.comparisonDescription}
        />
      </Reveal>
      <Reveal className={styles.courses__comparison} delay={0.08}>
        <div className={styles.courses__comparisonHeader} aria-hidden="true">
          <span>{copy.courses.comparisonCourse}</span>
          <span>{copy.courses.comparisonFocus}</span>
          <span>{copy.courses.level}</span>
          <span>{copy.courses.schedule}</span>
        </div>
        <div className={styles.courses__comparisonRows}>
          {courses.map((course) => (
            <article className={styles.courses__comparisonRow} key={course.slug}>
              <div className={styles.courses__comparisonCourse}>
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
