import type { AdminWorkspaceCopy } from "./AdminWorkspace";

export type AdminGroupsCopy = {
  backLabel: string;
  availableSeatsLabel: string;
  branchLabel: string;
  capacityLabel: string;
  categoryLabel: string;
  groupLabel: string;
  groupsSummaryLabel: string;
  monthlyTuitionLabel: string;
  roomLabel: string;
  scheduleLabel: string;
  teacherLabel: string;
  totalLearnersLabel: string;
};

export type AdminGroupsPageCopy = {
  common: AdminWorkspaceCopy["common"];
  groups: AdminGroupsCopy;
};
