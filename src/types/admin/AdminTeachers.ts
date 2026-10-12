export type AdminTeacherStatus = "ACTIVE" | "PAUSED" | "DEBTOR";

export type AdminTeacherStatusFilter = "ALL" | AdminTeacherStatus;

export type AdminTeachersCopy = {
  actionsLabel: string;
  deleteCancelLabel: string;
  deleteConfirmLabel: string;
  deleteErrorLabel: string;
  deleteLabel: string;
  deleteMessage: string;
  deleteSuccessLabel: string;
  deleteTitle: string;
  detailsLabel: string;
  groupsLabel: string;
  nameLabel: string;
  shareLabel: string;
  statusLabels: Record<AdminTeacherStatusFilter, string>;
  summaryLabel: string;
};
