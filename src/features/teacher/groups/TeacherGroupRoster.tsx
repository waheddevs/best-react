"use client";

import AddRounded from "@mui/icons-material/AddRounded";
import DeleteOutlineRounded from "@mui/icons-material/DeleteOutlineRounded";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import SearchRounded from "@mui/icons-material/SearchRounded";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { teacherGroupCapacity } from "@/config/teacher/TeacherGroupCapacity";
import type { Locale } from "@/config/Locales";
import { TeacherAddStudentDialog } from "@/features/teacher/groups/TeacherAddStudentDialog";
import { deleteConnectedTeacherStudent } from "@/features/teacher/groups/TeacherGroupActions";
import { TeacherStudentDetailsDrawer } from "@/features/teacher/groups/TeacherStudentDetailsDrawer";
import { useConfirmDialog } from "@/hooks/notifications/useConfirmDialog";
import { useNotifications } from "@/hooks/notifications/useNotifications";
import {
  useTeacherGroupRoster,
  type TeacherRosterStatusFilter,
} from "@/hooks/teacher/groups/useTeacherGroupRoster";
import { formatPhoneNumber } from "@/lib/PhoneNumber";
import { formatTeacherRosterEmail } from "@/lib/teacher/TeacherRosterEmail";
import type {
  TeacherCopy,
  TeacherGroupRosterSummary,
  TeacherLearner,
} from "@/types/teacher/Teacher";

type TeacherGroupRosterProps = {
  connected: boolean;
  copy: TeacherCopy;
  coursePriceUzs: number | null;
  groupId: string;
  groupName: string;
  initialLearners: TeacherLearner[];
  initialSummary?: TeacherGroupRosterSummary;
  locale: Locale;
};

export function TeacherGroupRoster({
  connected,
  copy,
  coursePriceUzs,
  groupId,
  groupName,
  initialLearners,
  initialSummary,
  locale,
}: TeacherGroupRosterProps) {
  /* HOOKS */
  const router = useRouter();
  const confirm = useConfirmDialog();
  const notifications = useNotifications();
  const roster = useTeacherGroupRoster({ initialLearners, initialSummary });
  const [pendingMembershipId, setPendingMembershipId] = useState<string | null>(null);
  const [selectedLearner, setSelectedLearner] = useState<TeacherLearner | null>(null);

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

  const handleDetailsOpen = (learner: TeacherLearner) => {
    setSelectedLearner(learner);
  };

  const handleDetailsClose = () => {
    setSelectedLearner(null);
  };

  const handleLearnerStatusChanged = (
    learner: TeacherLearner,
    status: TeacherLearner["status"],
  ) => {
    roster.handleLearnerStatusChanged(learner.membershipId, status);
    setSelectedLearner((current) =>
      current?.membershipId === learner.membershipId ? { ...current, status } : current,
    );
  };

  const paymentIsPaid = (learner: TeacherLearner) =>
    learner.balance <= 0 && !roster.newUnpaidMembershipIds.has(learner.membershipId);

  const handleDeleteAction = async (learner: TeacherLearner) => {
    if (pendingMembershipId !== null) return;
    const accepted = await confirm({
      cancelLabel: copy.groups.deleteLearnerCancel,
      confirmLabel: copy.groups.deleteLearnerConfirm,
      icon: "delete",
      message: copy.groups.deleteLearnerMessage
        .replace("{name}", learner.name)
        .replace("{studentName}", learner.name),
      title: copy.groups.deleteLearnerTitle,
      tone: "danger",
    });
    if (!accepted) return;
    if (!connected) {
      notifications.info({
        title: copy.groups.deleteLearner,
        message: copy.groups.deleteLearnerUnavailable,
      });
      return;
    }

    setPendingMembershipId(learner.membershipId);
    try {
      const result = await deleteConnectedTeacherStudent({ membershipId: learner.membershipId });
      if (!result.ok || result.membership.status !== "DELETED") {
        notifications.error({
          title: copy.groups.deleteLearner,
          message: copy.groups.deleteLearnerError,
        });
        return;
      }
      roster.handleLearnerDeleted(learner.membershipId);
      notifications.success({
        icon: "delete",
        title: copy.groups.deleteLearner,
        message: copy.groups.deleteLearnerSuccess.replace("{name}", learner.name),
      });
      router.refresh();
    } catch {
      notifications.error({
        title: copy.groups.deleteLearner,
        message: copy.groups.deleteLearnerError,
      });
    } finally {
      setPendingMembershipId(null);
    }
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
          {copy.common.add}
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
                <th scope="col">{copy.groups.rosterName}</th>
                <th scope="col">{copy.groupWorkspace.status}</th>
                <th scope="col">{copy.groups.phone}</th>
                <th scope="col">{copy.groups.email}</th>
                <th scope="col">{copy.groups.balance}</th>
                <th scope="col">{copy.groups.rosterActions}</th>
              </tr>
            </thead>
            <tbody>
              {roster.visibleLearners.map((learner, index) => {
                const learnerPaymentIsPaid = paymentIsPaid(learner);

                return (
                  <tr key={learner.id}>
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
                    <td className="teacherGroups__learnerPhone">
                      {formatPhoneNumber(learner.phone) || learner.phone}
                    </td>
                    <td className="teacherGroups__learnerEmail" title={learner.email ?? undefined}>
                      {formatTeacherRosterEmail(learner.email)}
                    </td>
                    <td>
                      <span
                        className="teacherGroups__statusBadge"
                        data-status={learnerPaymentIsPaid ? "paid" : "unpaid"}
                      >
                        {learnerPaymentIsPaid ? copy.groups.paid : copy.groups.unpaid}
                      </span>
                    </td>
                    <td>
                      <div className="teacherGroups__learnerActions">
                        <button
                          aria-label={`${copy.groups.detail}: ${learner.name}`}
                          onClick={() => handleDetailsOpen(learner)}
                          type="button"
                        >
                          <InfoOutlined />
                        </button>
                        <button
                          aria-label={`${copy.groups.deleteLearner}: ${learner.name}`}
                          className="teacherGroups__learnerDeleteButton"
                          disabled={pendingMembershipId !== null || learner.status === "departed"}
                          onClick={() => void handleDeleteAction(learner)}
                          type="button"
                        >
                          <DeleteOutlineRounded aria-hidden="true" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
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
          onStudentCreated={roster.handleLearnerAdded}
        />
      ) : null}

      {selectedLearner ? (
        <TeacherStudentDetailsDrawer
          connected={connected}
          copy={copy}
          coursePriceUzs={coursePriceUzs}
          groupName={groupName}
          learner={selectedLearner}
          locale={locale}
          onClose={handleDetailsClose}
          onStatusChanged={(status) => handleLearnerStatusChanged(selectedLearner, status)}
          paymentIsPaid={paymentIsPaid(selectedLearner)}
        />
      ) : null}
    </section>
  );
}
