import { CourseCard } from "@/components/cards/CourseCard";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { StaggerItem } from "@/components/motion/StaggerItem";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Locale } from "@/config/Locales";
import styles from "@/css/public/home.module.css";
import { courses } from "@/data/PublicContent";
import type { PageCopy } from "@/dictionaries/public/PageCopy";

type FeaturedCoursesProps = {
  locale: Locale;
  copy: PageCopy;
};

export function FeaturedCourses({ locale, copy }: FeaturedCoursesProps) {
  return (
    <Section>
      <Reveal className={styles.home__featuredCoursesHeader}>
        <SectionHeading
          eyebrow={copy.home.coursesEyebrow}
          title={copy.home.coursesTitle}
          description={copy.home.coursesDescription}
        />
        <ButtonLink href={`/${locale}/courses`} variant="secondary">
          {copy.common.coursesCta}
        </ButtonLink>
      </Reveal>
      <StaggerGroup className={styles.home__featuredCoursesGrid}>
        {courses.map((course) => (
          <StaggerItem key={course.slug} className={styles.home__featuredCoursesItem}>
            <CourseCard course={course} locale={locale} copy={copy} />
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
