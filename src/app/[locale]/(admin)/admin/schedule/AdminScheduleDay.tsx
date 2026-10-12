import InfoOutlined from "@mui/icons-material/InfoOutlined";
import type { Locale } from "@/config/Locales";
import { getAdminRegistryText } from "@/dictionaries/admin/AdminRegistry";
import { getAdminScheduleCopy } from "@/dictionaries/admin/AdminSchedule";
import { adminScheduleState, adminScheduleTime } from "@/lib/admin/AdminSchedule";
import type { AdminScheduleLesson } from "@/types/admin/AdminSchedule";

export function AdminScheduleDay({
  locale,
  lessons,
  now,
  onOpen,
}: {
  locale: Locale;
  lessons: AdminScheduleLesson[];
  now: number | null;
  onOpen: (lesson: AdminScheduleLesson) => void;
}) {
  const t = getAdminRegistryText(locale);
  const copy = getAdminScheduleCopy(locale);
  return (
    <div className="adminScheduleDay">
      <table>
        <thead>
          <tr>
            {["time", "group", "teacher", "room", "students", "status", "details"].map((key) => (
              <th scope="col" key={key}>
                {t(key)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {lessons.map((lesson) => {
            const state = adminScheduleState(lesson, now ?? 0);
            return (
              <tr key={lesson.id}>
                <td className="adminScheduleDay__time">
                  {adminScheduleTime(lesson.startsAt)}–{adminScheduleTime(lesson.endsAt)}
                </td>
                <td>
                  <button
                    type="button"
                    className="adminScheduleDay__name"
                    onClick={() => onOpen(lesson)}
                  >
                    {lesson.groupName}
                  </button>
                </td>
                <td>{lesson.teacherName}</td>
                <td>{lesson.room || "—"}</td>
                <td>{lesson.studentCount}</td>
                <td>
                  <span className="adminSchedule__status" data-state={state}>
                    {state === "live" ? copy.live : state === "elapsed" ? copy.elapsed : t(state)}
                  </span>
                  {lesson.hasConflict && (
                    <small className="adminSchedule__conflict">{t("conflicts")}</small>
                  )}
                </td>
                <td>
                  <button
                    type="button"
                    className="adminRegistry__action"
                    aria-label={`${t("details")}: ${lesson.groupName}`}
                    onClick={() => onOpen(lesson)}
                  >
                    <InfoOutlined />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
