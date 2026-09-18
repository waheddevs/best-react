import EventAvailableRounded from "@mui/icons-material/EventAvailableRounded";
import FactCheckRounded from "@mui/icons-material/FactCheckRounded";
import FlagRounded from "@mui/icons-material/FlagRounded";
import RouteRounded from "@mui/icons-material/RouteRounded";

import type { Locale } from "@/config/Locales";
import type { PageCopy } from "@/dictionaries/public/PageCopy";
import type { PublicCourse } from "@/types/PublicCourse";

type CoursePrerequisitesProps = {
  course: PublicCourse;
  locale: Locale;
  copy: PageCopy;
};

const stepIcons = [FlagRounded, FactCheckRounded, RouteRounded, EventAvailableRounded] as const;

const stepShapeClassNames = [
  "courses__preparationCardGoal",
  "courses__preparationCardCheck",
  "courses__preparationCardRoute",
  "courses__preparationCardReady",
] as const;

export function CoursePrerequisites({ course, locale, copy }: CoursePrerequisitesProps) {
  return (
    <section>
      <h2 className="courses__detailHeading">{copy.courses.prerequisites}</h2>
      <p className="courses__detailText">{course.prerequisites[locale]}</p>
      <ol className="courses__preparationGrid">
        {copy.courses.preparationSteps.map((step, index) => {
          const StepIcon = stepIcons[index] ?? FlagRounded;
          const shapeClassName = stepShapeClassNames[index] ?? "courses__preparationCardGoal";

          return (
            <li className={`courses__preparationCard ${shapeClassName}`} key={step.title}>
              <div className="courses__preparationCardHeader">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span className="courses__preparationCardIcon">
                  <StepIcon aria-hidden="true" />
                </span>
              </div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
