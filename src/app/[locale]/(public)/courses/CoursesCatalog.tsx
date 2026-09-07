import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { StaggerItem } from "@/components/motion/StaggerItem";
import { CoursePosterCard } from "@/components/cards/CoursePosterCard";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Locale } from "@/config/Locales";
import styles from "@/css/public/courses.module.css";
import type { PageCopy } from "@/dictionaries/public/PageCopy";
import type { PublicCourse } from "@/types/PublicCourse";

type CoursesCatalogProps = {
  locale: Locale;
  copy: PageCopy;
  courses: PublicCourse[];
};

export function CoursesCatalog({ locale, copy, courses }: CoursesCatalogProps) {
  return (
    <Section id="course-catalog" tone="surface">
      <Reveal className={styles.courses__sectionHeading} delay={0.05}>
        <SectionHeading
          align="center"
          eyebrow={copy.courses.featuredEyebrow}
          title={copy.courses.featuredTitle}
          description={copy.courses.featuredDescription}
        />
      </Reveal>
      <StaggerGroup className={styles.courses__catalogGrid} delay={0.08}>
        {courses.filter((course) => course.featured).map((course) => (
          <StaggerItem className={styles.courses__catalogItem} key={course.slug}>
            <CoursePosterCard course={course} locale={locale} copy={copy} />
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
