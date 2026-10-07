"use client";

import AccountBalanceWalletOutlined from "@mui/icons-material/AccountBalanceWalletOutlined";
import CalendarMonthOutlined from "@mui/icons-material/CalendarMonthOutlined";
import CloseRounded from "@mui/icons-material/CloseRounded";
import EmailOutlined from "@mui/icons-material/EmailOutlined";
import GroupsOutlined from "@mui/icons-material/GroupsOutlined";
import LocalOfferOutlined from "@mui/icons-material/LocalOfferOutlined";
import PaymentsOutlined from "@mui/icons-material/PaymentsOutlined";
import PhoneOutlined from "@mui/icons-material/PhoneOutlined";
import PriceCheckOutlined from "@mui/icons-material/PriceCheckOutlined";
import Drawer from "@mui/material/Drawer";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import type { Locale } from "@/config/Locales";
import { TeacherLearnerAvatar } from "@/features/teacher/groups/TeacherLearnerAvatar";
import { setConnectedTeacherStudentParticipationStatus } from "@/features/teacher/groups/TeacherGroupActions";
import type { GroupMembershipStatus, GroupRosterStatus } from "@/gql/graphql";
import { useNotifications } from "@/hooks/notifications/useNotifications";
import { formatPhoneNumber } from "@/lib/PhoneNumber";
import type { TeacherCopy, TeacherLearner, TeacherLearnerStatus } from "@/types/teacher/Teacher";

type TeacherStudentDetailsDrawerProps = {
  connected: boolean;
  copy: TeacherCopy;
  coursePriceUzs: number | null;
  groupName: string;
  learner: TeacherLearner;
  locale: Locale;
  onClose: () => void;
  onStatusChanged: (status: TeacherLearnerStatus) => void;
  paymentIsPaid: boolean;
};

const localeTags: Record<Locale, string> = {
  en: "en-US",
  ru: "ru-RU",
  uz: "uz-UZ",
};

function formatMoney(locale: Locale, value: number | null): string {
  if (value === null || !Number.isFinite(value)) return "—";
  return `${new Intl.NumberFormat(localeTags[locale]).format(value)} UZS`;
}

function formatDate(locale: Locale, value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat(localeTags[locale], {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function mapRosterStatus(status: GroupRosterStatus): TeacherLearnerStatus {
  if (status === "PAUSED") return "paused";
  if (status === "DEBTOR") return "debtor";
  if (status === "DEPARTED") return "departed";
  return "active";
}

function configureDrawerTransition(node: HTMLElement, duration: number) {
  node.style.transitionProperty = "transform, opacity";
  node.style.transitionDuration = `${duration}ms, var(--teacher-student-details-fade-duration)`;
  node.style.transitionTimingFunction = "cubic-bezier(0.4, 0, 0.2, 1), ease-out";
}

export function TeacherStudentDetailsDrawer({
  connected,
  copy,
  coursePriceUzs,
  groupName,
  learner,
  locale,
  onClose,
  onStatusChanged,
  paymentIsPaid,
}: TeacherStudentDetailsDrawerProps) {
  const currentParticipationStatus: GroupMembershipStatus =
    learner.status === "paused" ? "PAUSED" : "ACTIVE";
  const [nextStatus, setNextStatus] = useState<GroupMembershipStatus>(currentParticipationStatus);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const notifications = useNotifications();
  const statusLabels: Record<TeacherLearnerStatus, string> = {
    active: copy.groups.active,
    debtor: copy.groups.debtors,
    departed: copy.groups.departed,
    paused: copy.groups.paused,
  };
  const previewStatus: TeacherLearnerStatus =
    nextStatus === "PAUSED" ? "paused" : learner.status === "debtor" ? "debtor" : "active";

  const handleStatusSave = async () => {
    if (pending || nextStatus === currentParticipationStatus || learner.status === "departed")
      return;
    if (!connected) {
      setError(copy.groups.unsavedMessage);
      return;
    }

    setError("");
    setPending(true);
    try {
      const result = await setConnectedTeacherStudentParticipationStatus({
        membershipId: learner.membershipId,
        reason: `Teacher changed participation status to ${nextStatus} from student details.`,
        status: nextStatus,
      });
      if (!result.ok) {
        setError(copy.groups.statusUpdateError);
        return;
      }
      const updatedStatus = mapRosterStatus(result.membership.rosterStatus);
      onStatusChanged(updatedStatus);
      notifications.success({
        title: copy.groups.studentDetails,
        message: copy.groups.statusUpdateSuccess,
      });
    } catch {
      setError(copy.groups.statusUpdateError);
    } finally {
      setPending(false);
    }
  };

  return (
    <Drawer
      anchor="right"
      onClose={pending ? undefined : onClose}
      open
      slotProps={{
        backdrop: { className: "teacherGroups__studentDetailsBackdrop" },
        paper: { className: "teacherGroups__studentDetailsPaper" },
        transition: {
          onEnter: (node) => {
            node.style.opacity = "0";
          },
          onEntering: (node) => {
            configureDrawerTransition(node, 300);
            node.style.opacity = "1";
          },
          onExit: (node) => {
            node.style.opacity = "1";
          },
          onExiting: (node) => {
            configureDrawerTransition(node, 220);
            node.style.opacity = "0";
          },
        },
      }}
      transitionDuration={{ enter: 300, exit: 220 }}
    >
      <div className="teacherGroups__studentDetails">
        <header className="teacherGroups__studentDetailsHeader">
          <div className="teacherGroups__studentDetailsIdentity">
            <TeacherLearnerAvatar
              avatarUrl={learner.avatarUrl}
              className="teacherGroups__studentDetailsAvatar"
              initials={learner.initials}
            />
            <div>
              <span>{copy.groups.studentDetails}</span>
              <h2>{learner.name}</h2>
              <p>
                {copy.groups.groupLabel}: {groupName}
              </p>
            </div>
          </div>
          <IconButton disabled={pending} label={copy.common.close} onClick={onClose}>
            <CloseRounded aria-hidden="true" />
          </IconButton>
        </header>

        <div className="teacherGroups__studentDetailsBody">
          <section aria-labelledby="teacher-student-personal-title">
            <h3 id="teacher-student-personal-title">{copy.groups.personalInformation}</h3>
            <dl className="teacherGroups__studentDetailsFacts">
              <div>
                <dt>
                  <PhoneOutlined aria-hidden="true" /> {copy.groups.phone}
                </dt>
                <dd>{formatPhoneNumber(learner.phone) || learner.phone}</dd>
              </div>
              <div>
                <dt>
                  <EmailOutlined aria-hidden="true" /> {copy.groups.email}
                </dt>
                <dd title={learner.email ?? undefined}>{learner.email ?? "—"}</dd>
              </div>
              <div>
                <dt>
                  <CalendarMonthOutlined aria-hidden="true" /> {copy.groups.joinedAt}
                </dt>
                <dd>{formatDate(locale, learner.startedAt)}</dd>
              </div>
              <div>
                <dt>
                  <GroupsOutlined aria-hidden="true" /> {copy.groups.groupLabel}
                </dt>
                <dd>{groupName}</dd>
              </div>
            </dl>
          </section>

          <section aria-labelledby="teacher-student-status-title">
            <div className="teacherGroups__studentDetailsSectionTitle">
              <h3 id="teacher-student-status-title">{copy.groups.membershipStatus}</h3>
              <span className="teacherGroups__statusBadge" data-status={previewStatus}>
                {statusLabels[previewStatus]}
              </span>
            </div>
            <div className="teacherGroups__studentDetailsStatusControls">
              <div className="teacherGroups__studentDetailsStatusOptions">
                <button
                  aria-pressed={nextStatus === "ACTIVE"}
                  data-selected={nextStatus === "ACTIVE"}
                  disabled={learner.status === "departed" || pending}
                  onClick={() => {
                    setNextStatus("ACTIVE");
                    setError("");
                  }}
                  type="button"
                >
                  {copy.groups.active}
                </button>
                <button
                  aria-pressed={nextStatus === "PAUSED"}
                  data-selected={nextStatus === "PAUSED"}
                  disabled={learner.status === "departed" || pending}
                  onClick={() => {
                    setNextStatus("PAUSED");
                    setError("");
                  }}
                  type="button"
                >
                  {copy.groups.paused}
                </button>
                <Button
                  className="teacherGroups__studentDetailsStatusSave"
                  disabled={
                    pending ||
                    learner.status === "departed" ||
                    nextStatus === currentParticipationStatus
                  }
                  onClick={() => void handleStatusSave()}
                  shape="soft"
                  size="small"
                  type="button"
                >
                  {copy.common.save}
                </Button>
              </div>
              {error ? <p role="alert">{error}</p> : null}
            </div>
          </section>

          <section aria-labelledby="teacher-student-payment-title">
            <div className="teacherGroups__studentDetailsSectionTitle">
              <h3 id="teacher-student-payment-title">{copy.groups.paymentSummary}</h3>
              <span
                className="teacherGroups__statusBadge"
                data-status={paymentIsPaid ? "paid" : "unpaid"}
              >
                {paymentIsPaid ? copy.groups.paid : copy.groups.unpaid}
              </span>
            </div>
            <div className="teacherGroups__studentDetailsPaymentGrid">
              <article data-tone="price">
                <div className="teacherGroups__studentDetailsPaymentLabel">
                  <LocalOfferOutlined aria-hidden="true" />
                  <span>{copy.groups.coursePrice}</span>
                </div>
                <strong>{formatMoney(locale, coursePriceUzs)}</strong>
              </article>
              <article data-tone="paid">
                <div className="teacherGroups__studentDetailsPaymentLabel">
                  <PriceCheckOutlined aria-hidden="true" />
                  <span>{copy.groups.paidAmount}</span>
                </div>
                <strong>{formatMoney(locale, learner.paidAmountUzs)}</strong>
              </article>
              <article data-tone={learner.balance > 0 ? "outstanding" : "settled"}>
                <div className="teacherGroups__studentDetailsPaymentLabel">
                  <AccountBalanceWalletOutlined aria-hidden="true" />
                  <span>{copy.groups.outstandingAmount}</span>
                </div>
                <strong>{formatMoney(locale, learner.balance)}</strong>
              </article>
            </div>
          </section>

          <section aria-labelledby="teacher-student-payment-history-title">
            <h3 id="teacher-student-payment-history-title">{copy.groups.paymentHistory}</h3>
            {learner.paymentHistory.length > 0 ? (
              <div
                aria-label={copy.groups.paymentHistory}
                className="teacherGroups__studentDetailsPaymentHistory"
                role="list"
              >
                {learner.paymentHistory.map((payment) => (
                  <article key={payment.id} role="listitem">
                    <span>
                      <CalendarMonthOutlined aria-hidden="true" />
                      <time dateTime={payment.paidAt}>{formatDate(locale, payment.paidAt)}</time>
                    </span>
                    <strong>{formatMoney(locale, payment.amountUzs)}</strong>
                  </article>
                ))}
              </div>
            ) : (
              <div className="teacherGroups__studentDetailsEmpty">
                <PaymentsOutlined aria-hidden="true" />
                <p>{copy.groups.paymentHistoryUnavailable}</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </Drawer>
  );
}
