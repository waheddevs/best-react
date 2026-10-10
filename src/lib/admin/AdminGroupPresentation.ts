import type { Locale } from "@/config/Locales";
import type { AdminGroupRecordDetails } from "@/types/admin/AdminWorkspace";

export function formatAdminMinutes(value: number): string {
  return `${String(Math.floor(value / 60)).padStart(2, "0")}:${String(value % 60).padStart(2, "0")}`;
}

export function formatAdminGroupSchedule(
  group: Pick<AdminGroupRecordDetails, "endsAtMinutes" | "scheduleDays" | "startsAtMinutes">,
  locale: Locale,
): string {
  if (
    !group.scheduleDays.length ||
    group.startsAtMinutes === null ||
    group.endsAtMinutes === null
  ) {
    return "—";
  }
  const localeName = locale === "uz" ? "uz-UZ" : locale === "ru" ? "ru-RU" : "en-GB";
  const formatter = new Intl.DateTimeFormat(localeName, { timeZone: "UTC", weekday: "short" });
  const dayLabels = group.scheduleDays
    .map((day) => formatter.format(new Date(Date.UTC(2024, 0, Math.min(Math.max(day, 1), 7)))))
    .join(", ");
  return `${dayLabels} · ${formatAdminMinutes(group.startsAtMinutes)}–${formatAdminMinutes(group.endsAtMinutes)}`;
}
