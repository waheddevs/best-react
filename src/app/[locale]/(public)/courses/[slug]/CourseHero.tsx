import AutoAwesomeRounded from "@mui/icons-material/AutoAwesomeRounded";
import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import { CourseImage } from "@/features/courses/CourseImage";

import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import type { Locale } from "@/config/Locales";
import type { PageCopy } from "@/dictionaries/public/PageCopy";
import type { PublicCourse } from "@/types/PublicCourse";

import { CourseHeroVisual } from "./CourseHeroVisual";

type CourseHeroProps = {
  course: PublicCourse;
  locale: Locale;
  copy: PageCopy;
};

export function CourseHero({ course, locale, copy }: CourseHeroProps) {
  if (course.heroVariant === "immersive" && (course.image || course.coverMediaId)) {
    return (
      <section className="courses__immersiveHero">
        <CourseImage
          courseId={course.id}
          uploaded={Boolean(course.coverMediaId)}
          alt={course.imageAlt?.[locale] || course.title[locale]}
          className="courses__immersiveHeroImage"
          priority
          sizes="100vw"
          src={course.image}
        />
        <span aria-hidden="true" className="courses__immersiveHeroOverlay" />
        <Container className="courses__immersiveHeroContainer">
          <ButtonLink
            className="courses__immersiveHeroBack"
            href={`/${locale}/courses`}
            shape="pill"
            size="small"
            startIcon={<ArrowBackRounded />}
            variant="inverseOutline"
          >
            {copy.courses.backToCourses}
          </ButtonLink>
          <Reveal className="courses__immersiveHeroCopy" direction="left">
            <p className="courses__immersiveHeroEyebrow">
              <AutoAwesomeRounded aria-hidden="true" />
              {copy.courses.categories[course.category]}
            </p>
            <h1 className="courses__immersiveHeroTitle">{course.title[locale]}</h1>
            <p className="courses__immersiveHeroDescription">{course.summary[locale]}</p>
            <dl className="courses__immersiveHeroMeta">
              <div>
                <dt>{copy.courses.level}</dt>
                <dd>{course.level[locale]}</dd>
              </div>
              <div>
                <dt>{copy.courses.schedule}</dt>
                <dd>{course.schedule[locale]}</dd>
              </div>
              <div>
                <dt>{copy.courses.duration}</dt>
                <dd>{course.duration[locale]}</dd>
              </div>
            </dl>
          </Reveal>
        </Container>
      </section>
    );
  }

  return (
    <PageHero
      animateCopy
      eyebrow={copy.courses.categories[course.category]}
      title={course.title[locale]}
      description={course.summary[locale]}
      visual={<CourseHeroVisual course={course} locale={locale} />}
    />
  );
}
