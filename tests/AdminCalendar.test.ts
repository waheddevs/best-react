import assert from "node:assert/strict";
import test from "node:test";

const { adminCalendarDays, shiftAdminCalendarDate, shiftAdminCalendarMonth } = (await import(
  new URL("../src/lib/admin/AdminCalendar.ts", import.meta.url).href
)) as typeof import("../src/lib/admin/AdminCalendar");

test("calendar navigation clamps month ends and crosses year and leap-day boundaries", () => {
  assert.equal(shiftAdminCalendarMonth("2024-01-31", 1), "2024-02-29");
  assert.equal(shiftAdminCalendarMonth("2024-02-29", 12), "2025-02-28");
  assert.equal(shiftAdminCalendarMonth("2026-01-31", -1), "2025-12-31");
  assert.equal(shiftAdminCalendarDate("2026-12-31", 1), "2027-01-01");
  assert.equal(shiftAdminCalendarDate("2026-03-08", 1), "2026-03-09");
});

test("calendar grid includes every date of the month with Sunday-aligned adjacent days", () => {
  const days = adminCalendarDays("2026-10-11");
  assert.equal(days.length, 42);
  assert.equal(new Set(days).size, 42);
  assert.equal(days[0], "2026-09-27");
  assert.equal(days.at(-1), "2026-11-07");
  assert.equal(days.filter((date) => date.startsWith("2026-10")).length, 31);
  assert.ok(adminCalendarDays("2024-02-01").includes("2024-02-29"));
});
