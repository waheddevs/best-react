export type AdminStudentStatus = "ACTIVE" | "PAUSED" | "DEBTOR" | "DEPARTED";

export type AdminStudentStatusFilter = "ALL" | AdminStudentStatus;

export type AdminStudentDirectoryValues = {
  activeGroupId: string | null;
  activeGroupName: string | null;
  activeMembershipStartedAt: string | null;
  activeTeacherId: string | null;
  activeTeacherName: string | null;
};

export type AdminStudentFilterState = {
  groupId: string;
  joinedWithinDays: "ALL" | "30" | "90" | "365";
  status: AdminStudentStatusFilter;
  teacherId: string;
};

export type AdminStudentsCopy = {
  actionsLabel: string;
  allGroupsLabel: string;
  allTeachersLabel: string;
  clearFiltersLabel: string;
  groupLabel: string;
  joinedLabel: string;
  joinedOptions: Record<"ALL" | "30" | "90" | "365", string>;
  deleteCancelLabel: string;
  deleteConfirmLabel: string;
  deleteErrorLabel: string;
  deleteLabel: string;
  deleteMessage: string;
  deleteSuccessLabel: string;
  deleteTitle: string;
  detailsLabel: string;
  nameLabel: string;
  paymentLabel: string;
  paymentPaidLabel: string;
  paymentUnpaidLabel: string;
  shareLabel: string;
  statusLabels: Record<AdminStudentStatusFilter, string>;
  summaryLabel: string;
  teacherLabel: string;
};
