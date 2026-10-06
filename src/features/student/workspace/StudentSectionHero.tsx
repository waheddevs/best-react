import AutoStoriesRounded from "@mui/icons-material/AutoStoriesRounded";
import CalendarMonthRounded from "@mui/icons-material/CalendarMonthRounded";
import CreditCardRounded from "@mui/icons-material/CreditCardRounded";
import DashboardRounded from "@mui/icons-material/DashboardRounded";
import EmojiEventsRounded from "@mui/icons-material/EmojiEventsRounded";
import InsightsRounded from "@mui/icons-material/InsightsRounded";
import NotificationsActiveRounded from "@mui/icons-material/NotificationsActiveRounded";
import PersonRounded from "@mui/icons-material/PersonRounded";
import QuizRounded from "@mui/icons-material/QuizRounded";
import SchoolRounded from "@mui/icons-material/SchoolRounded";
import TaskAltRounded from "@mui/icons-material/TaskAltRounded";

import type { Locale } from "@/config/Locales";
import { getStudentHeroCopy, type StudentHeroKind } from "@/dictionaries/student/StudentHero";

type StudentSectionHeroProps = {
  description: string;
  eyebrow: string;
  kind: StudentHeroKind;
  label?: string;
  locale: Locale;
  preview?: boolean;
  title: string;
  value?: number | string;
};

const icons = {
  dashboard: DashboardRounded,
  courses: SchoolRounded,
  schedule: CalendarMonthRounded,
  assignments: TaskAltRounded,
  library: AutoStoriesRounded,
  tests: QuizRounded,
  results: EmojiEventsRounded,
  progress: InsightsRounded,
  payments: CreditCardRounded,
  notifications: NotificationsActiveRounded,
  settings: PersonRounded,
} satisfies Record<StudentHeroKind, typeof DashboardRounded>;

export function StudentSectionHero({
  description,
  eyebrow,
  kind,
  label,
  locale,
  preview = false,
  title,
  value,
}: StudentSectionHeroProps) {
  const copy = getStudentHeroCopy(locale);
  const Icon = icons[kind];

  return (
    <header className="studentHero">
      <div className="studentHero__copy">
        <span className="studentHero__eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <div className="studentHero__visual" data-kind={kind}>
        <span aria-hidden="true" className="studentHero__orbit" />
        <div className="studentHero__signal">
          <Icon aria-hidden="true" className="studentHero__icon" />
          {value !== undefined ? <strong>{value}</strong> : null}
          <span>{label ?? copy.labels[kind]}</span>
          {preview ? <small>{copy.preview}</small> : null}
        </div>
      </div>
    </header>
  );
}
