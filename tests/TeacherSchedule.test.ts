import assert from "node:assert/strict";
import test from "node:test";

import type { TeacherGroup } from "../src/types/teacher/Teacher";

const { buildTeacherSchedule, getNextGroupClassDate } = (await import(
  new URL("../src/lib/teacher/TeacherSchedule.ts", import.meta.url).href
)) as typeof import("../src/lib/teacher/TeacherSchedule");

function group(
  id: string,
  scheduleDays: number[],
  startsAtMinutes: number | null,
  endsAtMinutes: number | null,
  learnerCount = 0,
): TeacherGroup {
  return {
    attendance: null,
    category: "ielts",
    endsAtMinutes,
    id,
    learnerCount,
    lessonDays: { en: "", ru: "", uz: "" },
    name: id,
    recordSlug: id,
    room: "101",
    scheduleDays,
    slug: id,
    startsAtMinutes,
    time: "",
  };
}

test("schedule includes every active-day pattern and sorts by start time", () => {
  const groups = [
    group("late", [1], 840, 960),
    group("early", [1], 480, 600),
    group("other-day", [2], 540, 630),
    group("no-time", [1], null, null),
    group("next", [1], 660, 780, 3),
  ];
  const schedule = buildTeacherSchedule(groups, 1, 450);

  assert.deepEqual(
    schedule.map((entry) => entry.id),
    ["early", "other-day", "next", "late"],
  );
  assert.equal(schedule[0]?.startsAt, "08:00");
  assert.equal(schedule[0]?.status, "next");
  assert.equal(schedule[1]?.status, "planned");
  assert.deepEqual(schedule[1]?.lessonDays, [2]);
  assert.equal(schedule[2]?.learnerCount, 3);
  assert.equal(buildTeacherSchedule(groups, 3, 450).length, 4);
});

test("schedule status follows the live time and a newly fetched group appears", () => {
  const groups = [group("morning", [1], 480, 600), group("afternoon", [1], 840, 960)];

  assert.deepEqual(
    buildTeacherSchedule(groups, 1, 540).map((entry) => entry.status),
    ["active", "next"],
  );
  assert.deepEqual(
    buildTeacherSchedule(groups, 1, 1000).map((entry) => entry.status),
    ["completed", "completed"],
  );

  const newlyCreated = group("created", [2], 720, 780);
  assert.deepEqual(
    buildTeacherSchedule([...groups, newlyCreated], 1, 540).map((entry) => entry.id),
    ["morning", "created", "afternoon"],
  );
  assert.equal(buildTeacherSchedule([...groups, newlyCreated], 1, 540)[1]?.status, "planned");
});

test("next class date follows the Asia/Tashkent clock and skips finished days", () => {
  const mondayClass = group("monday", [1], 840, 960);
  assert.equal(
    getNextGroupClassDate(mondayClass, new Date("2026-09-21T08:00:00.000Z")),
    "2026-09-21",
  );
  assert.equal(
    getNextGroupClassDate(mondayClass, new Date("2026-09-21T12:00:00.000Z")),
    "2026-09-28",
  );
  assert.equal(
    getNextGroupClassDate(group("unscheduled", [], null, null), new Date("2026-09-21T08:00:00Z")),
    null,
  );
});
