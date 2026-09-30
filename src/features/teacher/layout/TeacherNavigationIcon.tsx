import AccountBalanceWalletRounded from "@mui/icons-material/AccountBalanceWalletRounded";
import CalendarMonthRounded from "@mui/icons-material/CalendarMonthRounded";
import DashboardRounded from "@mui/icons-material/DashboardRounded";
import GroupsRounded from "@mui/icons-material/GroupsRounded";
import LocalLibraryRounded from "@mui/icons-material/LocalLibraryRounded";
import ManageAccountsRounded from "@mui/icons-material/ManageAccountsRounded";
import MoveUpRounded from "@mui/icons-material/MoveUpRounded";
import TaskAltRounded from "@mui/icons-material/TaskAltRounded";

import type { TeacherNavigationKey } from "@/types/teacher/Teacher";

type TeacherNavigationIconProps = {
  navigationKey: TeacherNavigationKey;
};

export function TeacherNavigationIcon({ navigationKey }: TeacherNavigationIconProps) {
  const icons = {
    dashboard: DashboardRounded,
    finance: AccountBalanceWalletRounded,
    groups: GroupsRounded,
    library: LocalLibraryRounded,
    profile: ManageAccountsRounded,
    reception: CalendarMonthRounded,
    tasks: TaskAltRounded,
    transferRequests: MoveUpRounded,
  } satisfies Record<TeacherNavigationKey, typeof DashboardRounded>;
  const Icon = icons[navigationKey];

  return <Icon aria-hidden="true" />;
}
