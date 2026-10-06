import assert from "node:assert/strict";
import test from "node:test";

import type { StudentWorkspaceRecord } from "../src/types/student/StudentWorkspace";

const { getStudentNextClass } = (await import(
  new URL("../src/lib/student/StudentNextClass.ts", import.meta.url).href
)) as typeof import("../src/lib/student/StudentNextClass");

function classRecord(day: number, startsAt: string): StudentWorkspaceRecord {
  return {
    detail: "Preview class",
    id: `${day}-${startsAt}`,
    meta: "",
    status: "info",
    title: "Class",
    weeklySlot: { day, startsAt },
  };
}

const classes = [classRecord(1, "16:00"), classRecord(3, "17:40"), classRecord(5, "16:00")];

test("next class follows the weekly schedule in Tashkent time", () => {
  assert.deepEqual(getStudentNextClass(classes, "en", new Date("2026-10-06T07:00:00Z")), {
    day: "Wed",
    time: "17:40",
  });
});

test("a class starting now is no longer counted as upcoming", () => {
  assert.deepEqual(getStudentNextClass(classes, "en", new Date("2026-10-09T11:00:00Z")), {
    day: "Mon",
    time: "16:00",
  });
});

test("no schedule does not invent an upcoming class", () => {
  assert.equal(getStudentNextClass([], "en", new Date("2026-10-06T07:00:00Z")), null);
});
