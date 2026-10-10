import assert from "node:assert/strict";
import test from "node:test";
import type { StudentProgressTestPoint } from "../src/types/student/StudentProgress";

const { buildStudentProgressChartView } = (await import(
  new URL("../src/lib/student/StudentProgressChartView.ts", import.meta.url).href
)) as typeof import("../src/lib/student/StudentProgressChartView");

function point(index: number, submittedAt = "2026-10-09T10:00:00Z"): StudentProgressTestPoint {
  return {
    month: 9,
    paperId: `paper-${index}`,
    practiceNumber: index,
    title: `Practice test ${index}`,
    submittedAt,
    percentage: index === 1 ? 0 : 53,
    scoredSkillCount: 4,
  };
}

test("nearby dates and identical timestamps are spaced by test order", () => {
  const view = buildStudentProgressChartView([point(1), point(2), point(3)]);
  assert.ok(
    Math.abs(view.points[1].x - view.points[0].x - (view.points[2].x - view.points[1].x)) < 1e-9,
  );
  assert.deepEqual(
    view.points.map((item) => item.percentage),
    [0, 53, 53],
  );
  assert.deepEqual(view.groups, [{ key: "2026-9", month: 9, year: 2026, count: 3 }]);
});

test("show the latest ten and keep the oldest window accessible", () => {
  const history = Array.from({ length: 25 }, (_, index) => point(index + 1));
  const recent = buildStudentProgressChartView(history);
  assert.deepEqual([recent.start, recent.end, recent.points.length], [15, 25, 10]);
  assert.equal(recent.points[0].practiceNumber, 16);
  const oldest = buildStudentProgressChartView(history, 100);
  assert.deepEqual([oldest.start, oldest.end, oldest.offset], [0, 10, 15]);
  assert.equal(oldest.points[0].practiceNumber, 1);
  assert.equal(buildStudentProgressChartView(history, -10).offset, 0);
});

test("one or zero results never create a synthetic line or filled area", () => {
  const empty = buildStudentProgressChartView([]);
  assert.equal(empty.linePath, "");
  assert.equal(empty.areaPath, "");
  assert.deepEqual(empty.groups, []);
  const single = buildStudentProgressChartView([point(1)]);
  assert.equal(single.points[0].x, 500);
  assert.equal(single.areaPath, "");
  assert.ok(!single.linePath.includes("C"));
});

test("month labels retain their year when viewing older history", () => {
  const view = buildStudentProgressChartView([point(1, "2025-10-01T10:00:00Z"), point(2)]);
  assert.deepEqual(
    view.groups.map(({ key }) => key),
    ["2025-9", "2026-9"],
  );
});
