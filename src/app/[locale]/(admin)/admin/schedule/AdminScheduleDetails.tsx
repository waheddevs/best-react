import CloseRounded from "@mui/icons-material/CloseRounded";
import CalendarMonthOutlined from "@mui/icons-material/CalendarMonthOutlined";
import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import Dialog from "@mui/material/Dialog";
import Link from "next/link";
import type { Locale } from "@/config/Locales";
import { getAdminRegistryText } from "@/dictionaries/admin/AdminRegistry";
import { getAdminScheduleCopy } from "@/dictionaries/admin/AdminSchedule";
import { adminScheduleState, adminScheduleTime } from "@/lib/admin/AdminSchedule";
import type { AdminScheduleLesson } from "@/types/admin/AdminSchedule";

export function AdminScheduleDetails({
  locale,
  lesson,
  now,
  onClose,
}: {
  locale: Locale;
  lesson: AdminScheduleLesson | null;
  now: number | null;
  onClose: () => void;
}) {
  const t = getAdminRegistryText(locale);
  const copy = getAdminScheduleCopy(locale);
  const text =
    lesson?.translations.find((entry) => entry.language === locale.toUpperCase()) ??
    lesson?.translations[0];
  const state = lesson ? adminScheduleState(lesson, now ?? 0) : "";
  return (
    <Dialog
      open={Boolean(lesson)}
      onClose={onClose}
      aria-labelledby="admin-schedule-detail"
      maxWidth={false}
      slotProps={{
        paper: { className: "adminRegistry__dialog adminExamDetails adminScheduleDetails" },
        backdrop: { className: "adminExamDetails__backdrop" },
      }}
    >
      {lesson && (
        <>
          <header className="adminExamDetails__header">
            <span className="adminExamDetails__icon">
              <CalendarMonthOutlined />
            </span>
            <div className="adminExamDetails__identity">
              <p>{t("details")}</p>
              <h2 id="admin-schedule-detail">{lesson.groupName}</h2>
            </div>
            <button
              type="button"
              className="adminExamDetails__close"
              aria-label={t("close")}
              onClick={onClose}
            >
              <CloseRounded />
            </button>
          </header>
          <div className="adminExamDetails__body">
            <span className="adminSchedule__status" data-state={state}>
              {state === "live" ? copy.live : state === "elapsed" ? copy.elapsed : t(state)}
            </span>
            {text?.title && <h3>{text.title}</h3>}
            {text?.summary && <p className="adminScheduleDetails__summary">{text.summary}</p>}
            <dl className="adminExamDetails__facts">
              {[
                [t("teacher"), lesson.teacherName],
                [
                  t("lessonDate"),
                  new Intl.DateTimeFormat(locale, {
                    dateStyle: "long",
                    timeZone: "Asia/Tashkent",
                  }).format(new Date(lesson.startsAt)),
                ],
                [
                  t("time"),
                  `${adminScheduleTime(lesson.startsAt)}–${adminScheduleTime(lesson.endsAt)} · UTC+05:00`,
                ],
                [t("room"), lesson.room || "—"],
                [t("students"), String(lesson.studentCount)],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
            {lesson.hasConflict && <p className="adminSchedule__conflict">{copy.conflict}</p>}
          </div>
          <footer className="adminExamDetails__footer">
            <Link href={`/${locale}/admin/groups/${lesson.groupId}`}>
              {copy.openGroup}
              <ArrowForwardRounded />
            </Link>
          </footer>
        </>
      )}
    </Dialog>
  );
}
