import assert from "node:assert/strict";
import test from "node:test";
import type { AdminScheduleLesson } from "../src/types/admin/AdminSchedule";

const {
  adminScheduleDate,
  adminScheduleDays,
  adminScheduleSegments,
  adminScheduleState,
  adminScheduleInRange,
} = (await import(
  new URL("../src/lib/admin/AdminSchedule.ts", import.meta.url).href
)) as typeof import("../src/lib/admin/AdminSchedule");

function lesson(id: string, start: string, end: string): AdminScheduleLesson {
  return {
    id,
    groupId: "reserved-group",
    groupName: "Reserved group",
    teacherId: "reserved-teacher",
    teacherName: "Reserved teacher",
    room: "101",
    startsAt: start,
    endsAt: end,
    status: "SCHEDULED",
    studentCount: 0,
    hasConflict: false,
    updatedAt: start,
    translations: [],
  };
}

test("schedule uses Tashkent dates and Monday weeks across year boundaries", () => {
  assert.equal(adminScheduleDate("2026-12-31T20:00:00Z"), "2027-01-01");
  assert.deepEqual(adminScheduleDays("2027-01-03", "week"), [
    "2026-12-28",
    "2026-12-29",
    "2026-12-30",
    "2026-12-31",
    "2027-01-01",
    "2027-01-02",
    "2027-01-03",
  ]);
  assert.deepEqual(adminScheduleDays("2027-01-03", "day"), ["2027-01-03"]);
});

test("overlapping lessons get separate lanes while adjacent lessons reuse the full width", () => {
  const rows = [
    lesson("a", "2026-10-13T09:00:00+05:00", "2026-10-13T10:30:00+05:00"),
    lesson("b", "2026-10-13T10:00:00+05:00", "2026-10-13T11:00:00+05:00"),
    lesson("c", "2026-10-13T11:00:00+05:00", "2026-10-13T12:00:00+05:00"),
  ];
  const segments = adminScheduleSegments(rows, "2026-10-13");
  assert.deepEqual(
    segments.map(({ column, columns }) => [column, columns]),
    [
      [0, 2],
      [1, 2],
      [0, 1],
    ],
  );
});

test("overnight lessons are clipped at midnight with exclusive end boundaries", () => {
  const row = lesson("overnight", "2026-10-12T23:30:00+05:00", "2026-10-13T00:30:00+05:00");
  assert.equal(adminScheduleInRange(row, "2026-10-13", "2026-10-13"), true);
  assert.deepEqual(
    adminScheduleSegments([row], "2026-10-13").map(({ start, end }) => [start, end]),
    [[0, 30]],
  );
  assert.equal(
    adminScheduleInRange(
      { ...row, endsAt: "2026-10-13T00:00:00+05:00" },
      "2026-10-13",
      "2026-10-13",
    ),
    false,
  );
});

test("live time never overrides cancelled or completed server statuses", () => {
  const row = lesson("a", "2026-10-13T09:00:00+05:00", "2026-10-13T10:00:00+05:00");
  const now = Date.parse("2026-10-13T09:30:00+05:00");
  assert.equal(adminScheduleState(row, now), "live");
  assert.equal(adminScheduleState({ ...row, status: "CANCELLED" }, now), "CANCELLED");
  assert.equal(adminScheduleState({ ...row, status: "COMPLETED" }, now), "COMPLETED");
  assert.equal(adminScheduleState(row, Date.parse(row.endsAt)), "elapsed");
});
