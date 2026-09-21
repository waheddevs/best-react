"use client";

import AddRounded from "@mui/icons-material/AddRounded";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import SearchRounded from "@mui/icons-material/SearchRounded";

import { Button } from "@/components/ui/Button";
import { teacherGroupCapacity } from "@/config/teacher/TeacherGroupCapacity";
import type { Locale } from "@/config/Locales";
import { TeacherAddStudentDialog } from "@/features/teacher/groups/TeacherAddStudentDialog";
import { useNotifications } from "@/hooks/notifications/useNotifications";
import {
  useTeacherGroupRoster,
  type TeacherRosterStatusFilter,
} from "@/hooks/teacher/groups/useTeacherGroupRoster";
import { formatTeacherNumber } from "@/lib/teacher/TeacherNumberFormat";
import type {
  TeacherCopy,
  TeacherGroupRosterSummary,
  TeacherLearner,
} from "@/types/teacher/Teacher";

type TeacherGroupRosterProps = {
  connected: boolean;
  copy: TeacherCopy;
  groupId: string;
  monthlyTuitionUzs: number | null;
  initialLearners: TeacherLearner[];
  initialSummary?: TeacherGroupRosterSummary;
  locale: Locale;
};

export function TeacherGroupRoster({
  connected,
  copy,
  groupId,
  monthlyTuitionUzs,
  initialLearners,
  initialSummary,
}: TeacherGroupRosterProps) {
  /* HOOKS */
  const notifications = useNotifications();
  const roster = useTeacherGroupRoster({ initialLearners, initialSummary });

  const statusLabels: Record<TeacherLearner["status"], string> = {
    active: copy.groups.active,
    debtor: copy.groups.debtors,
    departed: copy.groups.departed,
    paused: copy.groups.paused,
  };
  const statusFilters: Array<{
    label: string;
    status: TeacherRosterStatusFilter;
    value: number;
  }> = [
    { label: copy.groups.total, status: "total", value: roster.summary.total },
    { label: copy.groups.active, status: "active", value: roster.summary.active },
    { label: copy.groups.paused, status: "paused", value: roster.summary.paused },
    { label: copy.groups.debtors, status: "debtor", value: roster.summary.debtor },
    { label: copy.groups.departed, status: "departed", value: roster.summary.departed },
  ];

  /* HANDLERS */
  const handleAddDialogOpen = () => {
    roster.handleAddDialogOpen();
  };

  const handlePreviewAction = () => {
    notifications.info({ title: copy.groups.unsavedTitle, message: copy.groups.unsavedMessage });
  };

  return (
    <section aria-labelledby="roster-title" className="teacherGroups__rosterSection">
      <div className="teacherGroups__summaryGrid">
        {statusFilters.map(({ label, status, value }) => (
          <button
            aria-pressed={roster.activeStatusFilter === status}
            className="teacherGroups__summaryCard"
            data-active={roster.activeStatusFilter === status}
            data-tone={status}
            key={status}
            onClick={() => roster.handleStatusFilterChange(status)}
            type="button"
          >
            <strong>{value}</strong>
            <span>{label}</span>
          </button>
        ))}
      </div>

      <div className="teacherGroups__rosterHeader">
        <div>
          <h2 className="teacherShared__sectionTitle" id="roster-title">
            {copy.groups.rosterTitle}
          </h2>
          <span className="teacherGroups__resultCount">
            {roster.summary.total}/{teacherGroupCapacity} {copy.groups.learners}
          </span>
        </div>
        <Button
          hoverEffect="jump"
          onClick={handleAddDialogOpen}
          shape="soft"
          size="small"
          startIcon={<AddRounded />}
        >
          {copy.groups.addLearner}
        </Button>
      </div>

      {roster.visibleLearners.length > 0 ? (
        <div
          aria-label={copy.groups.rosterTitle}
          className="teacherGroups__learnerList"
          role="region"
          tabIndex={0}
        >
          <table aria-label={copy.groups.rosterTitle} className="teacherGroups__learnerTable">
            <thead>
              <tr>
                <th scope="col">{copy.groups.learnerName}</th>
                <th scope="col">{copy.groupWorkspace.status}</th>
                <th scope="col">{copy.groups.balance}</th>
                <th scope="col">{copy.groups.rosterActions}</th>
              </tr>
            </thead>
            <tbody>
              {roster.visibleLearners.map((learner, index) => (
                <tr data-alert={learner.status === "debtor"} key={learner.id}>
                  <td>
                    <div className="teacherGroups__learnerIdentity">
                      <span className="teacherGroups__learnerIndex">{index + 1}</span>
                      <span className="teacherGroups__learnerAvatar">{learner.initials}</span>
                      <strong>{learner.name}</strong>
                    </div>
                  </td>
                  <td>
                    <span className="teacherGroups__statusBadge" data-status={learner.status}>
                      {statusLabels[learner.status]}
                    </span>
                  </td>
                  <td className="teacherGroups__learnerFinance">
                    <strong>{formatTeacherNumber(learner.balance)} UZS</strong>
                    {monthlyTuitionUzs !== null ? (
                      <small>
                        {copy.groups.paid}: {formatTeacherNumber(learner.paidAmountUzs)} /{" "}
                        {formatTeacherNumber(monthlyTuitionUzs)} UZS
                      </small>
                    ) : null}
                  </td>
                  <td>
                    <div className="teacherGroups__learnerActions">
                      <button
                        aria-label={`${copy.groups.detail}: ${learner.name}`}
                        onClick={handlePreviewAction}
                        type="button"
                      >
                        <InfoOutlined />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="teacherShared__emptyState">
          <div>
            <span className="teacherShared__emptyIcon">
              <SearchRounded />
            </span>
            <h3 className="teacherShared__emptyTitle">
              {roster.summary.historicalTotal === 0 ? copy.groups.emptyRoster : copy.groups.empty}
            </h3>
          </div>
        </div>
      )}

      {roster.isAddDialogOpen ? (
        <TeacherAddStudentDialog
          atCapacity={roster.atCapacity}
          connected={connected}
          copy={copy}
          groupId={groupId}
          onClose={roster.handleAddDialogClose}
        />
      ) : null}
    </section>
  );
}
