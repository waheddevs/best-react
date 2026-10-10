import assert from "node:assert/strict";
import test from "node:test";

import type { StudentResultsQuery } from "../src/gql/graphql";
import type { StudentTestPaper, StudentTestSkill } from "../src/types/student/StudentTests";

const { buildStudentResultRows } = (await import(
  new URL("../src/lib/student/StudentResultsTable.ts", import.meta.url).href
)) as typeof import("../src/lib/student/StudentResultsTable");

type Result = StudentResultsQuery["studentResults"]["edges"][number]["node"];

function skill(overrides: Partial<StudentTestSkill> = {}): StudentTestSkill {
  return {
    skill: "LISTENING",
    testId: "test-l",
    testVersionId: "version-l",
    title: "Listening",
    attemptId: null,
    attemptStatus: null,
    description: null,
    durationMinutes: 30,
    questionCount: 40,
    ...overrides,
  };
}

function paper(skills: StudentTestSkill[]): StudentTestPaper {
  return {
    id: "paper-1",
    title: "Fictional practice",
    slug: "fictional-practice",
    academicYear: 2026,
    sourceLabel: "Preview",
    skills,
  };
}

function result(overrides: Partial<Result> = {}): Result {
  return {
    attemptId: "attempt-l",
    testId: "test-l",
    title: "Fictional result",
    skill: "LISTENING",
    attemptNumber: 1,
    correctAnswerCount: 32,
    totalQuestionCount: 40,
    percentage: 80,
    practiceBand: null,
    highestPercentage: 80,
    passed: true,
    submittedAt: "2026-10-09T10:00:00Z",
    ...overrides,
  };
}

test("groups skill results by backend test IDs, not matching titles", () => {
  const rows = buildStudentResultRows(
    [
      paper([
        skill({ attemptId: "attempt-l", attemptStatus: "SCORED" }),
        skill({
          skill: "SPEAKING",
          testId: "test-s",
          attemptId: "attempt-s",
          attemptStatus: "SCORED",
        }),
      ]),
    ],
    [
      result(),
      result({ testId: "test-s", skill: "SPEAKING", attemptId: "attempt-s", practiceBand: 6.5 }),
    ],
  );
  assert.equal(rows.length, 1);
  assert.equal(rows[0].cells.LISTENING.result?.correctAnswerCount, 32);
  assert.equal(rows[0].cells.SPEAKING.result?.practiceBand, 6.5);
  assert.equal(rows[0].cells.READING.status, "empty");
});

test("a new pending or active attempt never displays an older released score", () => {
  for (const status of ["IN_PROGRESS", "SUBMITTED", "REVIEW_REQUIRED", "SCORED"] as const) {
    const [row] = buildStudentResultRows(
      [paper([skill({ attemptId: "new-attempt", attemptStatus: status })])],
      [result()],
    );
    assert.equal(row.cells.LISTENING.result, null);
    assert.equal(row.cells.LISTENING.status, status === "IN_PROGRESS" ? "inProgress" : "pending");
  }
});

test("a released result replaces the pending state for the same attempt", () => {
  const [row] = buildStudentResultRows(
    [paper([skill({ attemptId: "attempt-l", attemptStatus: "REVIEW_REQUIRED" })])],
    [result()],
  );
  assert.equal(row.cells.LISTENING.status, "ready");
});

test("without a current attempt the latest result wins, not the highest score", () => {
  const [row] = buildStudentResultRows(
    [paper([skill()])],
    [
      result({ attemptId: "older", percentage: 100, submittedAt: "2026-10-08T10:00:00Z" }),
      result({ attemptId: "latest", percentage: 50 }),
    ],
  );
  assert.equal(row.cells.LISTENING.result?.attemptId, "latest");
});

test("result names use the practice number, not the filtered table row number", () => {
  const source = {
    ...paper([skill()]),
    title: "BEST LC Academic Test 21",
    slug: "academic-test-21",
  };
  const [row] = buildStudentResultRows([source], [result()]);
  assert.equal(row.practiceNumber, 21);
  assert.equal(row.paperId, source.id);
  assert.equal(row.cells.LISTENING.result?.attemptId, "attempt-l");
});

test("archived results also retain the original practice number", () => {
  const [row] = buildStudentResultRows([], [result({ title: "Academic Test 8 — Listening" })]);
  assert.equal(row.practiceNumber, 8);
});

test("unstarted papers do not create empty result rows", () => {
  assert.deepEqual(buildStudentResultRows([paper([skill()])], []), []);
  assert.deepEqual(buildStudentResultRows([], []), []);
});

test("released tests outside the catalog are preserved without title-based grouping", () => {
  const rows = buildStudentResultRows(
    [],
    [result(), result({ testId: "another-test", attemptId: "another-attempt" })],
  );
  assert.equal(rows.length, 2);
  assert.ok(rows.every((row) => row.paperId === null));
  assert.notEqual(rows[0].id, rows[1].id);
});
