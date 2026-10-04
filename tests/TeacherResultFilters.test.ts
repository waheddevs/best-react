import assert from "node:assert/strict";
import test from "node:test";

const { readTeacherResultFilterValue, readTeacherResultIdFilter } = (await import(
  new URL("../src/lib/teacher/TeacherResultFilters.ts", import.meta.url).href
)) as typeof import("../src/lib/teacher/TeacherResultFilters");

test("ignores the empty All groups filter instead of sending an invalid ID", () => {
  assert.equal(readTeacherResultIdFilter({ groupId: "" }, "groupId"), undefined);
  assert.equal(readTeacherResultIdFilter({ groupId: "   " }, "groupId"), undefined);
});

test("ignores malformed IDs while preserving a valid selected group", () => {
  assert.equal(readTeacherResultIdFilter({ groupId: "all" }, "groupId"), undefined);
  assert.equal(readTeacherResultIdFilter({ groupId: "example-group" }, "groupId"), undefined);
  assert.equal(
    readTeacherResultIdFilter({ groupId: " 00000000-0000-4000-8000-000000000001 " }, "groupId"),
    "00000000-0000-4000-8000-000000000001",
  );
});

test("trims optional filters and ignores duplicate query parameters", () => {
  assert.equal(readTeacherResultFilterValue({ search: "  learner  " }, "search"), "learner");
  assert.equal(readTeacherResultFilterValue({ search: ["first", "second"] }, "search"), undefined);
});
