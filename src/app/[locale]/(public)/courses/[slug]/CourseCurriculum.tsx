import type { Locale } from "@/config/Locales";
import type { PageCopy } from "@/dictionaries/public/PageCopy";
import type { PublicCourse } from "@/types/PublicCourse";

type CourseCurriculumProps = {
  course: PublicCourse;
  locale: Locale;
  copy: PageCopy;
};

export function CourseCurriculum({ course, locale, copy }: CourseCurriculumProps) {
  return (
    <section>
      <h2 className="courses__detailHeading">{copy.courses.curriculum}</h2>
      <ol className="courses__curriculumList">
        {course.curriculum[locale].map((item, index) => (
          <li key={item} className="courses__curriculumItem">
            <span className="courses__curriculumNumber">{index + 1}</span>
            <span className="courses__curriculumText">{item}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
