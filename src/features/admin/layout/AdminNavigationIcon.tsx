import AccountBalanceWalletOutlined from "@mui/icons-material/AccountBalanceWalletOutlined";
import AdminPanelSettingsOutlined from "@mui/icons-material/AdminPanelSettingsOutlined";
import CalendarMonthOutlined from "@mui/icons-material/CalendarMonthOutlined";
import CreditCardOutlined from "@mui/icons-material/CreditCardOutlined";
import DashboardOutlined from "@mui/icons-material/DashboardOutlined";
import EventOutlined from "@mui/icons-material/EventOutlined";
import GroupsOutlined from "@mui/icons-material/GroupsOutlined";
import ManageAccountsOutlined from "@mui/icons-material/ManageAccountsOutlined";
import MailOutlineRounded from "@mui/icons-material/MailOutlineRounded";
import NotificationsOutlined from "@mui/icons-material/NotificationsOutlined";
import QuizOutlined from "@mui/icons-material/QuizOutlined";
import SchoolOutlined from "@mui/icons-material/SchoolOutlined";
import SettingsOutlined from "@mui/icons-material/SettingsOutlined";
import SupportAgentOutlined from "@mui/icons-material/SupportAgentOutlined";

import type { AdminNavigationKey } from "@/types/admin/AdminWorkspace";

const icons = {
  courses: SchoolOutlined,
  dashboard: DashboardOutlined,
  exams: QuizOutlined,
  events: EventOutlined,
  groups: GroupsOutlined,
  messages: MailOutlineRounded,
  notifications: NotificationsOutlined,
  payments: CreditCardOutlined,
  requests: SupportAgentOutlined,
  salary: AccountBalanceWalletOutlined,
  schedule: CalendarMonthOutlined,
  settings: SettingsOutlined,
  students: ManageAccountsOutlined,
  teachers: AdminPanelSettingsOutlined,
} satisfies Record<AdminNavigationKey, typeof DashboardOutlined>;

type AdminNavigationIconProps = { navigationKey: AdminNavigationKey };

export function AdminNavigationIcon({ navigationKey }: AdminNavigationIconProps) {
  const Icon = icons[navigationKey];
  return <Icon aria-hidden="true" fontSize="small" />;
}
