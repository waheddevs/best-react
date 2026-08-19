import { CourseCard } from "@/components/cards/course-card";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { ButtonLink } from "@/components/ui/button-link";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Locale } from "@/config/locales";
import { courses } from "@/data/public-content";
import type { PageCopy } from "@/dictionaries/page-copy";

type FeaturedCoursesProps = {
  locale: Locale;
  copy: PageCopy;
};

export function FeaturedCourses({ locale, copy }: FeaturedCoursesProps) {
  return (
    <Section>
      <Reveal className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <SectionHeading
          eyebrow={copy.home.coursesEyebrow}
          title={copy.home.coursesTitle}
          description={copy.home.coursesDescription}
        />
        <ButtonLink href={`/${locale}/courses`} variant="secondary">
          {copy.common.coursesCta}
        </ButtonLink>
      </Reveal>
      <StaggerGroup className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {courses.map((course) => (
          <StaggerItem key={course.slug} className="h-full">
            <CourseCard course={course} locale={locale} copy={copy} />
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
