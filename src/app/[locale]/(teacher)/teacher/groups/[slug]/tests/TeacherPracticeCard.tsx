"use client";

import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import CheckRounded from "@mui/icons-material/CheckRounded";
import DeleteOutlineRounded from "@mui/icons-material/DeleteOutlineRounded";
import { useMutation } from "@apollo/client/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import type { Locale } from "@/config/Locales";
import { getTeacherPracticesCopy } from "@/dictionaries/teacher/TeacherPractices";
import { TeacherDeletePracticeTestDocument } from "@/gql/graphql";
import { useConfirmDialog } from "@/hooks/notifications/useConfirmDialog";
import { useNotifications } from "@/hooks/notifications/useNotifications";
import type { TeacherPracticeSummary } from "@/types/teacher/TeacherPractice";

type TeacherPracticeCardProps = {
  connected: boolean;
  detailHref: string;
  locale: Locale;
  practice: TeacherPracticeSummary;
  totalStudentCount: number;
};

function formatPracticeDate(locale: Locale, value: string) {
  return new Intl.DateTimeFormat(locale === "uz" ? "uz-UZ" : locale === "ru" ? "ru-RU" : "en-GB", {
    day: "2-digit",
    month: "short",
    timeZone: "Asia/Tashkent",
    year: "numeric",
  }).format(new Date(value));
}

export function TeacherPracticeCard({
  connected,
  detailHref,
  locale,
  practice,
  totalStudentCount,
}: TeacherPracticeCardProps) {
  const [removed, setRemoved] = useState(false);
  const confirm = useConfirmDialog();
  const labels = getTeacherPracticesCopy(locale);
  const notifications = useNotifications();
  const router = useRouter();
  const [deletePractice, { loading }] = useMutation(TeacherDeletePracticeTestDocument, {
    context: { authenticated: true },
  });
  const titleId = `teacher-practice-${practice.id}`;
  const contentReady = practice.readySkillCount === 4;
  const studentProgress =
    totalStudentCount > 0
      ? Math.min(100, (practice.completedStudentCount / totalStudentCount) * 100)
      : 0;

  const handleDelete = async () => {
    if (loading) return;
    const accepted = await confirm({
      cancelLabel: labels.cancel,
      confirmLabel: labels.deletePractice,
      message: labels.deletePracticeMessage,
      title: labels.deletePracticeTitle,
      tone: "danger",
    });
    if (!accepted) return;
    if (!connected) {
      notifications.error({
        icon: "delete",
        message: labels.deletePracticeUnavailable,
        title: labels.deletePracticeTitle,
      });
      return;
    }

    try {
      const result = await deletePractice({ variables: { testPaperId: practice.id } });
      const deletion = result.data?.deleteTeacherPracticeTest;
      if (deletion?.status !== "DELETED") throw new Error("Practice test was not deleted");

      setRemoved(true);
      notifications.success({
        icon: "delete",
        message: labels.deletePracticeSuccess,
        title: labels.deletePracticeTitle,
      });
      router.refresh();
    } catch {
      notifications.error({
        icon: "delete",
        message: labels.deletePracticeError,
        title: labels.deletePracticeTitle,
      });
    }
  };

  if (removed) return null;

  return (
    <article aria-labelledby={titleId} className="teacherGroups__practiceCard">
      <Link
        aria-hidden="true"
        className="teacherGroups__practiceCardLink"
        href={detailHref}
        tabIndex={-1}
      />
      <div className="teacherGroups__practiceIdentity">
        <h3 id={titleId}>{labels.practiceTitle}</h3>
        <strong>{practice.practiceNumber}</strong>
      </div>

      <dl className="teacherGroups__practiceMeta">
        <div>
          <dt>{labels.dateLabel}</dt>
          <dd>{formatPracticeDate(locale, practice.createdAt)}</dd>
        </div>
        <div>
          <dt>{labels.contentReadyLabel}</dt>
          <dd className="teacherGroups__practiceMetaStatus">
            <span
              aria-hidden="true"
              className="teacherGroups__practiceReadyIndicator"
              data-complete={contentReady}
            >
              {contentReady ? <CheckRounded /> : null}
            </span>
            <span>{practice.readySkillCount} / 4</span>
          </dd>
        </div>
        <div>
          <dt>{labels.studentsDoneLabel}</dt>
          <dd className="teacherGroups__practiceMetaStatus">
            <span aria-hidden="true" className="teacherGroups__practiceStudentProgress">
              <span style={{ width: `${studentProgress}%` }} />
            </span>
            <span>
              {practice.completedStudentCount} / {totalStudentCount}
            </span>
          </dd>
        </div>
      </dl>

      <div className="teacherGroups__practiceFooter teacherGroups__cardActions">
        <button
          aria-label={`${labels.deletePractice}: ${labels.practiceTitle} ${String(practice.practiceNumber)}`}
          className="teacherGroups__deleteButton"
          disabled={loading}
          onClick={() => void handleDelete()}
          type="button"
        >
          <DeleteOutlineRounded aria-hidden="true" />
          <span>{loading ? labels.deletingPractice : labels.deletePractice}</span>
        </button>
        <Link
          aria-label={`${labels.apply}: ${labels.practiceTitle} ${String(practice.practiceNumber)}`}
          className="teacherGroups__catalogLink"
          href={detailHref}
        >
          <span>{labels.apply}</span>
          <ArrowForwardRounded aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
