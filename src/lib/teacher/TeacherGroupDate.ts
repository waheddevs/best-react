import type { Locale } from "@/config/Locales";

export function formatGroupWorkspaceDate(date: string, locale: Locale, months: string[]) {
  const [, monthValue, dayValue] = date.split("-");
  const monthIndex = Number.parseInt(monthValue ?? "", 10) - 1;
  const day = Number.parseInt(dayValue ?? "", 10);
  const month = months[monthIndex];

  if (!month || !Number.isInteger(day)) return date;
  if (locale === "uz") return `${day}-${month}`;
  if (locale === "ru") return `${day} ${month}`;
  return `${month} ${day}`;
}
