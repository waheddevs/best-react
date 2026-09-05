import AssignmentRounded from "@mui/icons-material/AssignmentRounded";
import AutoStoriesRounded from "@mui/icons-material/AutoStoriesRounded";
import CalendarMonthRounded from "@mui/icons-material/CalendarMonthRounded";
import CreditCardRounded from "@mui/icons-material/CreditCardRounded";
import DashboardRounded from "@mui/icons-material/DashboardRounded";
import EmojiEventsRounded from "@mui/icons-material/EmojiEventsRounded";
import InsightsRounded from "@mui/icons-material/InsightsRounded";
import NotificationsRounded from "@mui/icons-material/NotificationsRounded";
import QuizRounded from "@mui/icons-material/QuizRounded";
import SchoolRounded from "@mui/icons-material/SchoolRounded";
import SettingsRounded from "@mui/icons-material/SettingsRounded";

import type { StudentNavigationKey } from "@/types/student/StudentWorkspace";

const icons = {
  assignments: AssignmentRounded,
  courses: SchoolRounded,
  dashboard: DashboardRounded,
  library: AutoStoriesRounded,
  notifications: NotificationsRounded,
  payments: CreditCardRounded,
  progress: InsightsRounded,
  results: EmojiEventsRounded,
  schedule: CalendarMonthRounded,
  settings: SettingsRounded,
  tests: QuizRounded,
} satisfies Record<StudentNavigationKey, typeof DashboardRounded>;

type StudentNavigationIconProps = { navigationKey: StudentNavigationKey };

export function StudentNavigationIcon({ navigationKey }: StudentNavigationIconProps) {
  const Icon = icons[navigationKey];
  return <Icon aria-hidden="true" fontSize="small" />;
}
