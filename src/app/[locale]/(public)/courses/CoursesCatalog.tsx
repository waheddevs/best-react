import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { StaggerItem } from "@/components/motion/StaggerItem";
import { DraftNotice } from "@/components/ui/DraftNotice";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Locale } from "@/config/Locales";
import styles from "@/css/public/courses.module.css";
import { featuredCourses } from "@/data/PublicCourses";
import type { PageCopy } from "@/dictionaries/public/PageCopy";

import { CoursePosterCard } from "./CoursePosterCard";

type CoursesCatalogProps = {
  locale: Locale;
  copy: PageCopy;
};

export function CoursesCatalog({ locale, copy }: CoursesCatalogProps) {
  return (
    <Section id="course-catalog" tone="surface">
      <Reveal>
        <DraftNotice badge={copy.common.draftBadge} note={copy.common.draftNote} />
      </Reveal>
      <Reveal className={styles.courses__sectionHeading} delay={0.05}>
        <SectionHeading
          align="center"
          eyebrow={copy.courses.featuredEyebrow}
          title={copy.courses.featuredTitle}
          description={copy.courses.featuredDescription}
        />
      </Reveal>
      <StaggerGroup className={styles.courses__catalogGrid} delay={0.08}>
        {featuredCourses.map((course) => (
          <StaggerItem className={styles.courses__catalogItem} key={course.slug}>
            <CoursePosterCard course={course} locale={locale} copy={copy} />
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
