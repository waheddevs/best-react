// Date-only values use UTC arithmetic so DST and browser time zones cannot shift a day.
export function adminCalendarDate(value: string): Date {
  return new Date(`${value}T12:00:00Z`);
}

export function adminCalendarValue(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function shiftAdminCalendarDate(value: string, days: number): string {
  const date = adminCalendarDate(value);
  date.setUTCDate(date.getUTCDate() + days);
  return adminCalendarValue(date);
}

export function shiftAdminCalendarMonth(value: string, months: number): string {
  const date = adminCalendarDate(value);
  const day = date.getUTCDate();
  date.setUTCDate(1);
  date.setUTCMonth(date.getUTCMonth() + months);
  const lastDay = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0)).getUTCDate();
  date.setUTCDate(Math.min(day, lastDay));
  return adminCalendarValue(date);
}

export function adminCalendarDays(value: string): string[] {
  const first = `${value.slice(0, 7)}-01`;
  const start = shiftAdminCalendarDate(first, -adminCalendarDate(first).getUTCDay());
  return Array.from({ length: 42 }, (_, index) => shiftAdminCalendarDate(start, index));
}
