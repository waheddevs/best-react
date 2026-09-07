import { CoursePosterCard } from "@/components/cards/CoursePosterCard";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { StaggerItem } from "@/components/motion/StaggerItem";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Locale } from "@/config/Locales";
import styles from "@/css/public/home.module.css";
import type { PageCopy } from "@/dictionaries/public/PageCopy";
import type { PublicCourse } from "@/types/PublicCourse";

type FeaturedCoursesProps = {
  locale: Locale;
  copy: PageCopy;
  courses: PublicCourse[];
};

export function FeaturedCourses({ locale, copy, courses }: FeaturedCoursesProps) {
  return (
    <Section tone="background">
      <Reveal className={styles.home__featuredCoursesHeader}>
        <SectionHeading
          align="center"
          eyebrow={copy.home.coursesEyebrow}
          title={copy.home.coursesTitle}
          description={copy.home.coursesDescription}
        />
        <ButtonLink href={`/${locale}/courses`} variant="secondary">
          {copy.common.coursesCta}
        </ButtonLink>
      </Reveal>
      <StaggerGroup className={styles.home__featuredCoursesGrid}>
        {courses.filter((course) => course.featured).map((course) => (
          <StaggerItem key={course.slug} className={styles.home__featuredCoursesItem}>
            <CoursePosterCard course={course} locale={locale} copy={copy} />
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
