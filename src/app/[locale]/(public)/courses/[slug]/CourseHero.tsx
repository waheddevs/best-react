import AutoAwesomeRounded from "@mui/icons-material/AutoAwesomeRounded";
import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import Image from "next/image";

import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import type { Locale } from "@/config/Locales";
import styles from "@/css/public/courses.module.css";
import type { PageCopy } from "@/dictionaries/public/PageCopy";
import type { PublicCourse } from "@/types/PublicCourse";

import { CourseHeroVisual } from "./CourseHeroVisual";

type CourseHeroProps = {
  course: PublicCourse;
  locale: Locale;
  copy: PageCopy;
};

export function CourseHero({ course, locale, copy }: CourseHeroProps) {
  if (course.heroVariant === "immersive" && course.image && course.imageAlt) {
    return (
      <section className={styles.courses__immersiveHero}>
        <Image
          alt={course.imageAlt[locale]}
          className={styles.courses__immersiveHeroImage}
          fill
          priority
          sizes="100vw"
          src={course.image}
        />
        <span aria-hidden="true" className={styles.courses__immersiveHeroOverlay} />
        <Container className={styles.courses__immersiveHeroContainer}>
          <ButtonLink
            className={styles.courses__immersiveHeroBack}
            href={`/${locale}/courses`}
            shape="pill"
            size="small"
            startIcon={<ArrowBackRounded />}
            variant="inverseOutline"
          >
            {copy.courses.backToCourses}
          </ButtonLink>
          <Reveal className={styles.courses__immersiveHeroCopy} direction="left">
            <p className={styles.courses__immersiveHeroEyebrow}>
              <AutoAwesomeRounded aria-hidden="true" />
              {copy.courses.categories[course.category]}
            </p>
            <h1 className={styles.courses__immersiveHeroTitle}>{course.title[locale]}</h1>
            <p className={styles.courses__immersiveHeroDescription}>{course.summary[locale]}</p>
            <dl className={styles.courses__immersiveHeroMeta}>
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
