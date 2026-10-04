import AdminPanelSettingsOutlined from "@mui/icons-material/AdminPanelSettingsOutlined";
import ApartmentOutlined from "@mui/icons-material/ApartmentOutlined";
import AssignmentTurnedInOutlined from "@mui/icons-material/AssignmentTurnedInOutlined";
import AutoStoriesOutlined from "@mui/icons-material/AutoStoriesOutlined";
import CalendarMonthOutlined from "@mui/icons-material/CalendarMonthOutlined";
import CreditCardOutlined from "@mui/icons-material/CreditCardOutlined";
import DashboardOutlined from "@mui/icons-material/DashboardOutlined";
import EventOutlined from "@mui/icons-material/EventOutlined";
import FactCheckOutlined from "@mui/icons-material/FactCheckOutlined";
import GroupsOutlined from "@mui/icons-material/GroupsOutlined";
import HistoryOutlined from "@mui/icons-material/HistoryOutlined";
import ImportExportOutlined from "@mui/icons-material/ImportExportOutlined";
import InsightsOutlined from "@mui/icons-material/InsightsOutlined";
import ManageAccountsOutlined from "@mui/icons-material/ManageAccountsOutlined";
import NotificationsOutlined from "@mui/icons-material/NotificationsOutlined";
import QuizOutlined from "@mui/icons-material/QuizOutlined";
import SchoolOutlined from "@mui/icons-material/SchoolOutlined";
import SettingsOutlined from "@mui/icons-material/SettingsOutlined";
import SupportAgentOutlined from "@mui/icons-material/SupportAgentOutlined";

import type { AdminNavigationKey } from "@/types/admin/AdminWorkspace";

const icons = {
  attendance: FactCheckOutlined,
  audit: HistoryOutlined,
  courses: SchoolOutlined,
  dashboard: DashboardOutlined,
  events: EventOutlined,
  groups: GroupsOutlined,
  imports: ImportExportOutlined,
  library: AutoStoriesOutlined,
  locations: ApartmentOutlined,
  notifications: NotificationsOutlined,
  payments: CreditCardOutlined,
  reports: InsightsOutlined,
  requests: SupportAgentOutlined,
  results: AssignmentTurnedInOutlined,
  schedule: CalendarMonthOutlined,
  settings: SettingsOutlined,
  students: ManageAccountsOutlined,
  teachers: AdminPanelSettingsOutlined,
  tests: QuizOutlined,
} satisfies Record<AdminNavigationKey, typeof DashboardOutlined>;

type AdminNavigationIconProps = { navigationKey: AdminNavigationKey };

export function AdminNavigationIcon({ navigationKey }: AdminNavigationIconProps) {
  const Icon = icons[navigationKey];
  return <Icon aria-hidden="true" fontSize="small" />;
}
