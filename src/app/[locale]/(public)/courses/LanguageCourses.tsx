import ArrowOutwardRounded from "@mui/icons-material/ArrowOutwardRounded";
import CheckRounded from "@mui/icons-material/CheckRounded";
import ScheduleRounded from "@mui/icons-material/ScheduleRounded";

import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { StaggerItem } from "@/components/motion/StaggerItem";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Locale } from "@/config/Locales";
import styles from "@/css/public/courses.module.css";
import { languageCourses } from "@/data/PublicCourses";
import type { PageCopy } from "@/dictionaries/public/PageCopy";
import type { CourseAccent } from "@/types/PublicCourse";

type LanguageCoursesProps = {
  locale: Locale;
  copy: PageCopy;
};

const accentClassNames: Record<CourseAccent, string> = {
  blue: styles.courses__languageSymbolBlue,
  turquoise: styles.courses__languageSymbolTurquoise,
  yellow: styles.courses__languageSymbolYellow,
};

export function LanguageCourses({ locale, copy }: LanguageCoursesProps) {
  return (
    <Section tone="background">
      <Reveal className={styles.courses__sectionHeading}>
        <SectionHeading
          align="center"
          eyebrow={copy.courses.languagesEyebrow}
          title={copy.courses.languagesTitle}
          description={copy.courses.languagesDescription}
        />
      </Reveal>
      <StaggerGroup className={styles.courses__languageGrid} delay={0.06}>
        {languageCourses.map((course) => (
          <StaggerItem className={styles.courses__languageItem} key={course.slug}>
            <article className={styles.courses__languageCard}>
              <div className={styles.courses__languageHeader}>
                <span
                  className={`${styles.courses__languageSymbol} ${accentClassNames[course.accent]}`}
                >
                  {course.symbol}
                </span>
                <span className={styles.courses__languageLevel}>{course.level[locale]}</span>
              </div>
              <h2 className={styles.courses__languageTitle}>{course.title[locale]}</h2>
              <p className={styles.courses__languageSummary}>{course.summary[locale]}</p>
              <ul className={styles.courses__languageHighlights}>
                {course.highlights[locale].map((highlight) => (
                  <li key={highlight}>
                    <CheckRounded aria-hidden="true" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
              <div className={styles.courses__languageFooter}>
                <span className={styles.courses__languageSchedule}>
                  <ScheduleRounded aria-hidden="true" />
                  {course.schedule[locale]}
                </span>
                <ButtonLink
                  aria-label={`${copy.common.learnMore}: ${course.title[locale]}`}
                  endIcon={<ArrowOutwardRounded />}
                  href={`/${locale}/courses/${course.slug}`}
                  shape="rounded"
                  size="small"
                  variant="ghost"
                >
                  {copy.common.learnMore}
                </ButtonLink>
              </div>
            </article>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
