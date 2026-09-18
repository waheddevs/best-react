import CheckRounded from "@mui/icons-material/CheckRounded";

import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { StaggerItem } from "@/components/motion/StaggerItem";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Locale } from "@/config/Locales";
import type { PageCopy } from "@/dictionaries/public/PageCopy";
import type { PublicCourse } from "@/types/PublicCourse";

type CourseTracksProps = {
  course: PublicCourse;
  locale: Locale;
  copy: PageCopy;
};

export function CourseTracks({ course, locale, copy }: CourseTracksProps) {
  if (!course.tracks) return null;

  return (
    <section>
      <SectionHeading title={copy.courses.tracks} description={copy.courses.tracksDescription} />
      <StaggerGroup className="courses__trackGrid" delay={0.05}>
        {course.tracks.map((track, index) => (
          <StaggerItem className="courses__trackItem" key={track.title.en}>
            <article className="courses__trackCard">
              <div className="courses__trackHeader">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <small>{track.level[locale]}</small>
              </div>
              <h3>{track.title[locale]}</h3>
              <p>{track.summary[locale]}</p>
              <ul>
                {track.highlights[locale].map((highlight) => (
                  <li key={highlight}>
                    <CheckRounded aria-hidden="true" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </article>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
