import AccountBalanceWalletRounded from "@mui/icons-material/AccountBalanceWalletRounded";
import DashboardRounded from "@mui/icons-material/DashboardRounded";
import GroupsRounded from "@mui/icons-material/GroupsRounded";
import ManageAccountsRounded from "@mui/icons-material/ManageAccountsRounded";
import MoveUpRounded from "@mui/icons-material/MoveUpRounded";
import ReceptionDeskRounded from "@mui/icons-material/RoomPreferencesRounded";
import TaskAltRounded from "@mui/icons-material/TaskAltRounded";
import ForumRounded from "@mui/icons-material/ForumRounded";

import type { TeacherNavigationKey } from "@/types/teacher/Teacher";

type TeacherNavigationIconProps = {
  navigationKey: TeacherNavigationKey;
};

export function TeacherNavigationIcon({ navigationKey }: TeacherNavigationIconProps) {
  const icons = {
    dashboard: DashboardRounded,
    finance: AccountBalanceWalletRounded,
    generalGroup: ForumRounded,
    groups: GroupsRounded,
    profile: ManageAccountsRounded,
    reception: ReceptionDeskRounded,
    tasks: TaskAltRounded,
    transferRequests: MoveUpRounded,
  } satisfies Record<TeacherNavigationKey, typeof DashboardRounded>;
  const Icon = icons[navigationKey];

  return <Icon aria-hidden="true" />;
}
