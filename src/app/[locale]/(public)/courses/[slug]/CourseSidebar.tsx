import AccessTimeRounded from "@mui/icons-material/AccessTimeRounded";
import AutoAwesomeRounded from "@mui/icons-material/AutoAwesomeRounded";
import CalendarMonthRounded from "@mui/icons-material/CalendarMonthRounded";
import CoPresentRounded from "@mui/icons-material/CoPresentRounded";
import TimelineRounded from "@mui/icons-material/TimelineRounded";

import type { Locale } from "@/config/Locales";
import type { PageCopy } from "@/dictionaries/public/PageCopy";
import type { PublicCourse } from "@/types/PublicCourse";
import { CourseRegistrationAction } from "@/features/courses/CourseRegistrationAction";

type CourseSidebarProps = {
  course: PublicCourse;
  locale: Locale;
  copy: PageCopy;
};

const levelScale = ["A0", "A1", "A2", "B1", "B2", "C1", "C2"] as const;

const accentClassNames: Record<PublicCourse["accent"], string> = {
  blue: "courses__sidebarAccentBlue",
  turquoise: "courses__sidebarAccentTurquoise",
  yellow: "courses__sidebarAccentYellow",
};

function getLevelStops(level: string) {
  const matchedLevels = levelScale.filter((item) => level.includes(item));

  if (matchedLevels.length >= 2) {
    const firstIndex = levelScale.indexOf(matchedLevels[0]);
    const lastIndex = levelScale.indexOf(matchedLevels.at(-1) ?? matchedLevels[0]);
    const range = levelScale.slice(firstIndex, lastIndex + 1);

    if (range.length <= 3) return range;

    return [range[0], range[Math.round((range.length - 1) / 2)], range.at(-1)];
  }

  return level.split(/\s+—\s+/);
}

export function CourseSidebar({ course, locale, copy }: CourseSidebarProps) {
  const levelStops = getLevelStops(course.level[locale]);

  return (
    <aside className={`courses__sidebar ${accentClassNames[course.accent]}`}>
      <div aria-hidden="true" className="courses__sidebarGlow" />
      <header className="courses__sidebarHeader">
        <p className="courses__sidebarEyebrow">
          <AutoAwesomeRounded aria-hidden="true" />
          {copy.courses.snapshot}
        </p>
        <span aria-hidden="true" className="courses__sidebarWatermark">
          {course.symbol}
        </span>
      </header>
      <dl className="courses__sidebarMeta">
        <div className="courses__sidebarFact courses__sidebarFactLevel">
          <dt className="courses__sidebarIconLabel">
            <span className="courses__sidebarFactIcon">
              <TimelineRounded aria-hidden="true" />
            </span>
            {copy.courses.level}
          </dt>
          <dd>
            <ol className="courses__sidebarLevelTrack">
              {levelStops.map((levelStop) => (
                <li key={levelStop}>
                  <span aria-hidden="true" />
                  <strong>{levelStop}</strong>
                </li>
              ))}
            </ol>
          </dd>
        </div>
        <div className="courses__sidebarFact courses__sidebarFactFormat">
          <dt className="courses__sidebarIconLabel">
            <span className="courses__sidebarFactIcon">
              <CoPresentRounded aria-hidden="true" />
            </span>
            {copy.courses.format}
          </dt>
          <dd className="courses__sidebarValue">{course.formatLabel[locale]}</dd>
        </div>
        <div className="courses__sidebarFact courses__sidebarFactDuration">
          <dt className="courses__sidebarIconLabel">
            <span className="courses__sidebarFactIcon">
              <AccessTimeRounded aria-hidden="true" />
            </span>
            {copy.courses.duration}
          </dt>
          <dd className="courses__sidebarValue">{course.duration[locale]}</dd>
        </div>
        <div className="courses__sidebarFact courses__sidebarFactSchedule">
          <dt className="courses__sidebarIconLabel">
            <span className="courses__sidebarFactIcon">
              <CalendarMonthRounded aria-hidden="true" />
            </span>
            {copy.courses.schedule}
          </dt>
          <dd className="courses__sidebarValue">{course.schedule[locale]}</dd>
          <dd className="courses__sidebarDays">
            {copy.courses.scheduleDays.map((day) => (
              <span key={day}>{day}</span>
            ))}
          </dd>
        </div>
      </dl>
      <div className="courses__sidebarCta">
        <h2 className="courses__sidebarTitle">{copy.courses.detailCtaTitle}</h2>
        <div className="courses__sidebarAction">
          <CourseRegistrationAction course={course} locale={locale} pageCopy={copy.courses} />
        </div>
      </div>
    </aside>
  );
}
