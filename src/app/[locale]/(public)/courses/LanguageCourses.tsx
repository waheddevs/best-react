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
import type { PageCopy } from "@/dictionaries/public/PageCopy";
import type { CourseAccent, PublicCourse } from "@/types/PublicCourse";

type LanguageCoursesProps = {
  locale: Locale;
  copy: PageCopy;
  courses: PublicCourse[];
};

const accentClassNames: Record<CourseAccent, string> = {
  blue: "courses__languageSymbolBlue",
  turquoise: "courses__languageSymbolTurquoise",
  yellow: "courses__languageSymbolYellow",
};

export function LanguageCourses({ locale, copy, courses }: LanguageCoursesProps) {
  return (
    <Section tone="background">
      <Reveal className="courses__sectionHeading">
        <SectionHeading
          align="center"
          eyebrow={copy.courses.languagesEyebrow}
          title={copy.courses.languagesTitle}
          description={copy.courses.languagesDescription}
        />
      </Reveal>
      <StaggerGroup className="courses__languageGrid" delay={0.06}>
        {courses
          .filter((course) => course.category === "language")
          .map((course) => (
            <StaggerItem className="courses__languageItem" key={course.slug}>
              <article className="courses__languageCard">
                <div className="courses__languageHeader">
                  <span className={`courses__languageSymbol ${accentClassNames[course.accent]}`}>
                    {course.symbol}
                  </span>
                  <span className="courses__languageLevel">{course.level[locale]}</span>
                </div>
                <h2 className="courses__languageTitle">{course.title[locale]}</h2>
                <p className="courses__languageSummary">{course.summary[locale]}</p>
                <ul className="courses__languageHighlights">
                  {course.highlights[locale].map((highlight) => (
                    <li key={highlight}>
                      <CheckRounded aria-hidden="true" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
                <div className="courses__languageFooter">
                  <span className="courses__languageSchedule">
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
