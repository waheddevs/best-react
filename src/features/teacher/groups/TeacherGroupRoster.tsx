"use client";

import AccountBalanceWalletRounded from "@mui/icons-material/AccountBalanceWalletRounded";
import AddRounded from "@mui/icons-material/AddRounded";
import CallRounded from "@mui/icons-material/CallRounded";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import PauseCircleOutlineRounded from "@mui/icons-material/PauseCircleOutlineRounded";
import SearchRounded from "@mui/icons-material/SearchRounded";
import TaskAltRounded from "@mui/icons-material/TaskAltRounded";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { Button } from "@/components/ui/Button";
import { teacherGroupCapacity } from "@/config/teacher/TeacherGroupCapacity";
import type { Locale } from "@/config/Locales";
import styles from "@/css/teacher/groups.module.css";
import sharedStyles from "@/css/teacher/shared.module.css";
import { setConnectedGroupMembershipParticipationStatus } from "@/features/teacher/groups/TeacherGroupActions";
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
  initialLearners: TeacherLearner[];
  initialSummary?: TeacherGroupRosterSummary;
  locale: Locale;
};

export function TeacherGroupRoster({
  connected,
  copy,
  initialLearners,
  initialSummary,
}: TeacherGroupRosterProps) {
  /* HOOKS */
  const notifications = useNotifications();
  const roster = useTeacherGroupRoster({ initialLearners, initialSummary });
  const router = useRouter();
  const [isStatusPending, startStatusTransition] = useTransition();

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
  const handleAddLearner = () => {
    if (!roster.handleAddLearner()) return;
    notifications.info({
      title: copy.groups.addLearnerTitle,
      message: copy.groups.addLearnerMessage,
    });
  };

  const handleAddDialogOpen = () => {
    if (!connected) {
      roster.handleAddDialogOpen();
      return;
    }
    notifications.info({
      title: copy.groups.addLearner,
      message: copy.groups.addLearnerUnavailable,
    });
  };

  const handleContact = () => {
    notifications.info({ title: copy.groups.contactTitle, message: copy.groups.contactMessage });
  };

  const handleStatusToggle = (learner: TeacherLearner) => {
    if (!connected) {
      roster.handleStatusToggle(learner.id);
      notifications.info({ title: copy.groups.unsavedTitle, message: copy.groups.unsavedMessage });
      return;
    }
    if (learner.status === "departed" || isStatusPending) return;
    startStatusTransition(async () => {
      const result = await setConnectedGroupMembershipParticipationStatus({
        membershipId: learner.membershipId,
        reason: "Teacher updated participation from the group roster.",
        status: learner.status === "paused" ? "ACTIVE" : "PAUSED",
      });
      if (!result.ok) {
        notifications.error({ title: copy.groups.paused, message: copy.groups.statusUpdateError });
        return;
      }
      notifications.success({
        title: copy.groups.paused,
        message: copy.groups.statusUpdateSuccess,
      });
      router.refresh();
    });
  };

  const handlePreviewAction = () => {
    notifications.info({ title: copy.groups.unsavedTitle, message: copy.groups.unsavedMessage });
  };

  return (
    <section aria-labelledby="roster-title" className={styles.teacherGroups__rosterSection}>
      <div className={styles.teacherGroups__summaryGrid}>
        {statusFilters.map(({ label, status, value }) => (
          <button
            aria-pressed={roster.activeStatusFilter === status}
            className={styles.teacherGroups__summaryCard}
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

      <div className={styles.teacherGroups__rosterHeader}>
        <div>
          <h2 className={sharedStyles.teacherShared__sectionTitle} id="roster-title">
            {copy.groups.rosterTitle}
          </h2>
          <span className={styles.teacherGroups__resultCount}>
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
        <div className={styles.teacherGroups__learnerList}>
          {roster.visibleLearners.map((learner, index) => (
            <article
              className={styles.teacherGroups__learnerCard}
              data-alert={learner.status === "debtor"}
              key={learner.id}
            >
              <span className={styles.teacherGroups__learnerIndex}>{index + 1}</span>
              <span className={styles.teacherGroups__learnerAvatar}>{learner.initials}</span>
              <div className={styles.teacherGroups__learnerIdentity}>
                <strong>{learner.name}</strong>
                <span className={styles.teacherGroups__statusBadge} data-status={learner.status}>
                  {statusLabels[learner.status]}
                </span>
              </div>
              <div className={styles.teacherGroups__learnerFinance}>
                <small>{copy.groups.balance}</small>
                <strong>{formatTeacherNumber(learner.balance)} UZS</strong>
              </div>
              <div className={styles.teacherGroups__learnerProgress}>
                <small>{copy.groups.taskProgress}</small>
                <strong>{learner.taskProgress === null ? "—" : `${learner.taskProgress}%`}</strong>
              </div>
              <div className={styles.teacherGroups__learnerActions}>
                <button
                  aria-label={`${copy.groups.phone}: ${learner.name}`}
                  onClick={handleContact}
                  type="button"
                >
                  <CallRounded />
                </button>
                <button
                  aria-label={`${copy.groups.paused}: ${learner.name}`}
                  disabled={isStatusPending || learner.status === "departed"}
                  onClick={() => handleStatusToggle(learner)}
                  type="button"
                >
                  <PauseCircleOutlineRounded />
                </button>
                <button
                  aria-label={`${copy.groups.balance}: ${learner.name}`}
                  onClick={handlePreviewAction}
                  type="button"
                >
                  <AccountBalanceWalletRounded />
                </button>
                <button
                  aria-label={`${copy.groups.taskProgress}: ${learner.name}`}
                  onClick={handlePreviewAction}
                  type="button"
                >
                  <TaskAltRounded />
                </button>
                <button
                  aria-label={`${copy.groups.detail}: ${learner.name}`}
                  onClick={handlePreviewAction}
                  type="button"
                >
                  <InfoOutlined />
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className={sharedStyles.teacherShared__emptyState}>
          <div>
            <span className={sharedStyles.teacherShared__emptyIcon}>
              <SearchRounded />
            </span>
            <h3 className={sharedStyles.teacherShared__emptyTitle}>{copy.groups.empty}</h3>
          </div>
        </div>
      )}

      <Dialog
        fullWidth
        maxWidth="xs"
        onClose={roster.handleAddDialogClose}
        open={roster.isAddDialogOpen}
      >
        <DialogTitle>{copy.groups.addLearner}</DialogTitle>
        <DialogContent className={styles.teacherGroups__dialogContent}>
          <p>{copy.groups.addLearnerMessage}</p>
          <TextField
            autoFocus
            error={roster.atCapacity}
            fullWidth
            helperText={roster.atCapacity ? copy.groups.groupCapacityReached : undefined}
            label={copy.groups.learnerName}
            onChange={roster.handleNewLearnerNameChange}
            value={roster.newLearnerName}
          />
          <TextField
            fullWidth
            label={copy.groups.phone}
            onChange={roster.handleNewLearnerPhoneChange}
            value={roster.newLearnerPhone}
          />
        </DialogContent>
        <DialogActions className={styles.teacherGroups__dialogActions}>
          <Button onClick={roster.handleAddDialogClose} variant="ghost">
            {copy.common.cancel}
          </Button>
          <Button
            disabled={roster.atCapacity || !roster.newLearnerName.trim()}
            onClick={handleAddLearner}
          >
            {copy.common.add}
          </Button>
        </DialogActions>
      </Dialog>
    </section>
  );
}
