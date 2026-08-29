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

import { Button } from "@/components/ui/Button";
import type { Locale } from "@/config/Locales";
import styles from "@/css/teacher/groups.module.css";
import sharedStyles from "@/css/teacher/shared.module.css";
import { useNotifications } from "@/hooks/notifications/useNotifications";
import { useTeacherGroupRoster } from "@/hooks/teacher/groups/useTeacherGroupRoster";
import type { TeacherCopy, TeacherLearner } from "@/types/teacher/Teacher";

type TeacherGroupRosterProps = {
  copy: TeacherCopy;
  initialLearners: TeacherLearner[];
  locale: Locale;
};

export function TeacherGroupRoster({ copy, initialLearners, locale }: TeacherGroupRosterProps) {
  /* HOOKS */
  const notifications = useNotifications();
  const roster = useTeacherGroupRoster({ initialLearners });

  const statusLabels: Record<TeacherLearner["status"], string> = {
    active: copy.groups.active,
    debtor: copy.groups.debtors,
    departed: copy.groups.departed,
    paused: copy.groups.paused,
  };

  /* HANDLERS */
  const handleAddLearner = () => {
    if (!roster.handleAddLearner()) return;
    notifications.info({
      title: copy.groups.addLearnerTitle,
      message: copy.groups.addLearnerMessage,
    });
  };

  const handleContact = () => {
    notifications.info({ title: copy.groups.contactTitle, message: copy.groups.contactMessage });
  };

  const handleStatusToggle = (learnerId: string) => {
    roster.handleStatusToggle(learnerId);
    notifications.info({ title: copy.groups.unsavedTitle, message: copy.groups.unsavedMessage });
  };

  const handlePreviewAction = () => {
    notifications.info({ title: copy.groups.unsavedTitle, message: copy.groups.unsavedMessage });
  };

  return (
    <section aria-labelledby="roster-title" className={styles.teacherGroups__rosterSection}>
      <div className={styles.teacherGroups__summaryGrid}>
        {[
          [copy.groups.total, roster.summary.total, "total"],
          [copy.groups.active, roster.summary.active, "active"],
          [copy.groups.paused, roster.summary.paused, "paused"],
          [copy.groups.debtors, roster.summary.debtor, "debtor"],
          [copy.groups.departed, roster.summary.departed, "departed"],
        ].map(([label, value, tone]) => (
          <article
            className={styles.teacherGroups__summaryCard}
            data-tone={tone}
            key={String(tone)}
          >
            <strong>{value}</strong>
            <span>{label}</span>
          </article>
        ))}
      </div>

      <div className={styles.teacherGroups__rosterHeader}>
        <div>
          <h2 className={sharedStyles.teacherShared__sectionTitle} id="roster-title">
            {copy.groups.rosterTitle}
          </h2>
          <span className={styles.teacherGroups__resultCount}>
            {roster.visibleLearners.length} {copy.groups.learners}
          </span>
        </div>
        <Button
          hoverEffect="jump"
          onClick={roster.handleAddDialogOpen}
          shape="soft"
          size="small"
          startIcon={<AddRounded />}
        >
          {copy.groups.addLearner}
        </Button>
      </div>

      <div className={styles.teacherGroups__filters}>
        <label className={styles.teacherGroups__searchField}>
          <SearchRounded aria-hidden="true" />
          <span className={styles.teacherGroups__srOnly}>{copy.common.search}</span>
          <input
            onChange={roster.handleSearchChange}
            placeholder={copy.groups.searchPlaceholder}
            type="search"
            value={roster.searchQuery}
          />
        </label>
        <Button
          aria-pressed={roster.showDebtorsOnly}
          onClick={roster.handleDebtorsToggle}
          shape="pill"
          size="small"
          variant="filter"
        >
          {copy.groups.debtors}
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
                <strong>{new Intl.NumberFormat(locale).format(learner.balance)} UZS</strong>
              </div>
              <div className={styles.teacherGroups__learnerProgress}>
                <small>{copy.groups.taskProgress}</small>
                <strong>{learner.taskProgress}%</strong>
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
                  onClick={() => handleStatusToggle(learner.id)}
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
            fullWidth
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
          <Button disabled={!roster.newLearnerName.trim()} onClick={handleAddLearner}>
            {copy.common.add}
          </Button>
        </DialogActions>
      </Dialog>
    </section>
  );
}
