import assert from "node:assert/strict";
import test from "node:test";
import type { AdminScheduleLesson } from "../src/types/admin/AdminSchedule";

const { adminOverviewLessons } = (await import(
  new URL("../src/lib/admin/AdminOverview.ts", import.meta.url).href
)) as typeof import("../src/lib/admin/AdminOverview");

function lesson(
  id: string,
  startsAt: string,
  endsAt: string,
  status: AdminScheduleLesson["status"] = "SCHEDULED",
): AdminScheduleLesson {
  return {
    id,
    startsAt,
    endsAt,
    status,
    groupId: "reserved-group",
    groupName: "Preview group",
    teacherId: "reserved-teacher",
    teacherName: "Preview teacher",
    room: null,
    studentCount: 0,
    hasConflict: false,
    updatedAt: startsAt,
    translations: [],
  };
}
test("overview puts live lessons first and excludes drafts and cancelled lessons", () => {
  const rows = [
    lesson("ended", "2026-10-13T08:00:00+05:00", "2026-10-13T09:00:00+05:00"),
    lesson("upcoming", "2026-10-13T14:00:00+05:00", "2026-10-13T15:00:00+05:00"),
    lesson("live", "2026-10-13T10:00:00+05:00", "2026-10-13T11:00:00+05:00"),
    lesson("cancelled", "2026-10-13T10:00:00+05:00", "2026-10-13T11:00:00+05:00", "CANCELLED"),
    lesson("draft", "2026-10-13T10:00:00+05:00", "2026-10-13T11:00:00+05:00", "DRAFT"),
  ];
  assert.deepEqual(
    adminOverviewLessons(
      rows,
      "2026-10-13",
      Date.parse("2026-10-13T10:30:00+05:00"),
    ).todayLessons.map((row) => row.id),
    ["live", "upcoming", "ended"],
  );
  assert.equal(rows[0].id, "ended");
});
test("overview handles midnight boundaries and picks the earliest scheduled next lesson", () => {
  const rows = [
    lesson("overnight", "2026-10-12T23:30:00+05:00", "2026-10-13T00:30:00+05:00"),
    lesson("boundary", "2026-10-12T23:00:00+05:00", "2026-10-13T00:00:00+05:00"),
    lesson("later", "2026-10-15T10:00:00+05:00", "2026-10-15T11:00:00+05:00"),
    lesson("next", "2026-10-14T10:00:00+05:00", "2026-10-14T11:00:00+05:00"),
  ];
  const result = adminOverviewLessons(rows, "2026-10-13", Date.parse("2026-10-13T00:10:00+05:00"));
  assert.deepEqual(
    result.todayLessons.map((row) => row.id),
    ["overnight"],
  );
  assert.equal(result.nextLesson?.id, "next");
  assert.deepEqual(adminOverviewLessons([], "2026-10-13", 0), {
    todayLessons: [],
    nextLesson: undefined,
  });
});
