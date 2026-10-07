import EventRounded from "@mui/icons-material/EventRounded";
import GroupsRounded from "@mui/icons-material/GroupsRounded";
import MeetingRoomRounded from "@mui/icons-material/MeetingRoomRounded";
import WatchLaterRounded from "@mui/icons-material/WatchLaterRounded";
import type { Locale } from "@/config/Locales";
import type { StudentGroupCopy } from "@/dictionaries/student/StudentGroup";
import type { StudentGroupView } from "@/types/student/StudentGroup";

type StudentGroupInformationProps = {
  copy: StudentGroupCopy;
  group: StudentGroupView | null;
  locale: Locale;
};

export function StudentGroupInformation({ copy, group, locale }: StudentGroupInformationProps) {
  const capacity = 15;
  const days = group ? formatDays(group.days, locale) : [];
  const fill = group ? Math.min(100, Math.max(0, (group.memberCount / capacity) * 100)) : 0;

  return (
    <section aria-labelledby="student-group-information-title" className="studentGroup__card">
      <div className="studentGroup__heading">
        <h2 id="student-group-information-title">{copy.informationTitle}</h2>
      </div>
      {group ? (
        <div className="studentGroup__overview">
          <div className="studentGroup__identity">
            <span className="studentGroup__fieldLabel">{copy.groupName}</span>
            <strong className="studentGroup__name">{group.name}</strong>
            <div className="studentGroup__category">
              <span>{copy.category}</span>
              <strong>{formatCategory(group.category)}</strong>
            </div>
          </div>
          <div className="studentGroup__schedule">
            <div className="studentGroup__scheduleCell">
              <span className="studentGroup__fieldLabel">
                <EventRounded aria-hidden="true" />
                {copy.days}
              </span>
              <div className="studentGroup__dayChips">
                {days.length > 0 ? (
                  days.map((day, index) => <span key={`${day}-${index}`}>{day}</span>)
                ) : (
                  <span>{copy.unavailable}</span>
                )}
              </div>
            </div>
            <div className="studentGroup__scheduleCell">
              <span className="studentGroup__fieldLabel">
                <WatchLaterRounded aria-hidden="true" />
                {copy.time}
              </span>
              <strong className="studentGroup__scheduleValue">
                {formatTime(group.startMinutes, group.endMinutes)}
              </strong>
            </div>
            <div className="studentGroup__scheduleCell">
              <span className="studentGroup__fieldLabel">
                <MeetingRoomRounded aria-hidden="true" />
                {copy.room}
              </span>
              <strong className="studentGroup__scheduleValue">
                {group.room || copy.unavailable}
              </strong>
            </div>
            <div className="studentGroup__scheduleCell">
              <span className="studentGroup__fieldLabel">
                <GroupsRounded aria-hidden="true" />
                {copy.members}
              </span>
              <strong className="studentGroup__scheduleValue">
                {group.memberCount}/{capacity}
              </strong>
              <div
                aria-label={copy.members}
                aria-valuemax={capacity}
                aria-valuemin={0}
                aria-valuenow={Math.min(capacity, group.memberCount)}
                className="studentGroup__capacityTrack"
                role="progressbar"
              >
                <span style={{ width: `${fill}%` }} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="studentGroup__empty">{copy.emptyGroup}</p>
      )}
    </section>
  );
}

function formatCategory(category: string | null) {
  return category === "GENERAL_ENGLISH" ? "General English" : (category ?? "—");
}

function formatDays(days: number[], locale: Locale) {
  const formatter = new Intl.DateTimeFormat(locale, { timeZone: "UTC", weekday: "short" });
  const monday = Date.UTC(2024, 0, 1);
  return days
    .filter((day) => day >= 1 && day <= 7)
    .map((day) => formatter.format(new Date(monday + (day - 1) * 86_400_000)));
}

function formatTime(start: number | null, end: number | null) {
  if (start === null || end === null) return "—";
  const clock = (minutes: number) =>
    `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
  return `${clock(start)}–${clock(end)}`;
}
