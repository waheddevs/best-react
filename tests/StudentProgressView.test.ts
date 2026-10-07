import assert from "node:assert/strict";
import test from "node:test";

import type { StudentResultsQuery } from "../src/gql/graphql";
import type { StudentTestPaper } from "../src/types/student/StudentTests";

const { buildStudentProgress, selectLatestStudentProgressPaper } = (await import(
  new URL("../src/lib/student/StudentProgressView.ts", import.meta.url).href
)) as typeof import("../src/lib/student/StudentProgressView");

type Result = StudentResultsQuery["studentResults"]["edges"][number]["node"];

const paper: StudentTestPaper = {
  academicYear: 2026,
  id: "fictional-paper-1",
  skills: [
    { attemptId: null, attemptStatus: null, description: null, durationMinutes: 30, questionCount: 40, skill: "LISTENING", testId: "listening-1", testVersionId: "version-l", title: "Listening" },
    { attemptId: null, attemptStatus: null, description: null, durationMinutes: 60, questionCount: 40, skill: "READING", testId: "reading-1", testVersionId: "version-r", title: "Reading" },
    { attemptId: "pending-writing", attemptStatus: "REVIEW_REQUIRED", description: null, durationMinutes: 60, questionCount: 2, skill: "WRITING", testId: "writing-1", testVersionId: "version-w", title: "Writing" },
    { attemptId: null, attemptStatus: null, description: null, durationMinutes: 14, questionCount: 3, skill: "SPEAKING", testId: "speaking-1", testVersionId: "version-s", title: "Speaking" },
  ],
  slug: "best-lc-academic-test-1",
  sourceLabel: "Fictional test source",
  title: "BEST LC Academic Test 1",
};

function result(testId: string, skill: Result["skill"], percentage: number, submittedAt: string, attemptId: string): Result {
  return {
    attemptId,
    attemptNumber: 1,
    correctAnswerCount: 0,
    highestPercentage: percentage,
    passed: false,
    percentage,
    practiceBand: null,
    skill,
    submittedAt,
    testId,
    title: "Fictional Test 1 result",
    totalQuestionCount: 40,
  };
}

test("the selected test shapes skill cards while all tests shape monthly growth", () => {
  const progress = buildStudentProgress(
    paper,
    [
      result("listening-1", "LISTENING", 60, "2026-09-10T10:00:00Z", "older"),
      result("reading-1", "READING", 70, "2026-10-01T10:00:00Z", "reading"),
      result("listening-1", "LISTENING", 80, "2026-10-07T10:00:00Z", "latest"),
      result("unrelated-test", "LISTENING", 99, "2026-10-08T10:00:00Z", "other"),
    ],
    new Date("2026-10-08T00:00:00Z"),
  );

  assert.equal(progress.latestPercentage, 80);
  assert.equal(progress.chartChange, 10);
  assert.equal(progress.chartYear, 2026);
  assert.deepEqual(progress.monthPoints, [
    { month: 8, percentage: 60 },
    { month: 9, percentage: 99 },
  ]);
  assert.equal(progress.skills[0]?.percentage, 80);
  assert.equal(progress.skills[0]?.change, 20);
  assert.equal(progress.skills[1]?.percentage, 70);
  assert.equal(progress.skills[2]?.status, "pending");
  assert.equal(progress.skills[2]?.percentage, null);
  assert.equal(progress.skills[3]?.status, "unavailable");
  assert.equal(progress.scoredSkillCount, 2);
});

test("a released teacher-reviewed skill becomes visible without inventing pending scores", () => {
  const reviewedPaper: StudentTestPaper = {
    ...paper,
    skills: paper.skills.map((skill) =>
      skill.skill === "WRITING" ? { ...skill, attemptStatus: "SCORED" } : skill,
    ),
  };
  const progress = buildStudentProgress(
    reviewedPaper,
    [result("writing-1", "WRITING", 72.2, "2026-10-07T12:00:00Z", "reviewed")],
  );

  assert.equal(progress.latestPercentage, 72.2);
  assert.equal(progress.skills[2]?.status, "scored");
  assert.equal(progress.skills[2]?.percentage, 72.2);
  assert.deepEqual(progress.monthPoints, [{ month: 9, percentage: 72.2 }]);
});

test("zero is a valid score and missing results stay empty", () => {
  const zero = buildStudentProgress(
    paper,
    [result("listening-1", "LISTENING", 0, "2026-10-07T10:00:00Z", "zero")],
  );
  assert.equal(zero.latestPercentage, 0);
  assert.equal(zero.skills[0]?.percentage, 0);

  const empty = buildStudentProgress(null, [], new Date("2026-10-07T00:00:00Z"));
  assert.equal(empty.latestPercentage, null);
  assert.deepEqual(empty.monthPoints, []);
  assert.equal(empty.scoredSkillCount, 0);
});

test("Test 2 becomes the progress source after its newer released result", () => {
  const testTwo: StudentTestPaper = {
    ...paper,
    id: "fictional-paper-2",
    slug: "best-lc-academic-test-2",
    title: "BEST LC Academic Test 2",
    skills: paper.skills.map((skill) => ({ ...skill, attemptStatus: "SCORED", testId: `${skill.skill.toLowerCase()}-2` })),
  };
  const results = [
    result("listening-1", "LISTENING", 0, "2026-09-30T10:00:00Z", "test-one"),
    result("reading-1", "READING", 2.5, "2026-09-29T10:00:00Z", "reading-one"),
    result("listening-2", "LISTENING", 75, "2026-10-07T10:00:00Z", "test-two"),
    result("reading-2", "READING", 30, "2026-10-06T10:00:00Z", "reading-two"),
    result("writing-2", "WRITING", 77.78, "2026-10-05T10:00:00Z", "writing-two"),
    result("speaking-2", "SPEAKING", 72.22, "2026-10-04T10:00:00Z", "speaking-two"),
  ];
  const selected = selectLatestStudentProgressPaper([paper, testTwo], results, []);
  assert.equal(selected?.id, testTwo.id);
  const progress = buildStudentProgress(selected, results);
  assert.equal(progress.latestPercentage, 75);
  assert.equal(progress.skills[0]?.percentage, 75);
  assert.equal(progress.skills[0]?.change, 75);
  assert.equal(progress.skills[1]?.change, 27.5);
  assert.equal(progress.skills[2]?.change, null);
  assert.equal(progress.skills[3]?.change, null);
  assert.equal(progress.skills[2]?.status, "scored");
  assert.equal(progress.skills[3]?.status, "scored");
  assert.deepEqual(progress.monthPoints, [
    { month: 8, percentage: 0 },
    { month: 9, percentage: 75 },
  ]);
});

test("submitted Test 2 awaiting teacher review supersedes older Test 1 scores", () => {
  const testTwo: StudentTestPaper = {
    ...paper,
    id: "fictional-paper-2",
    skills: paper.skills.map((skill) => skill.skill === "WRITING"
      ? { ...skill, attemptId: "pending-test-two", attemptStatus: "REVIEW_REQUIRED", testId: "writing-2" }
      : { ...skill, attemptId: null, attemptStatus: null, testId: `${skill.skill.toLowerCase()}-2` }),
  };
  const selected = selectLatestStudentProgressPaper(
    [paper, testTwo],
    [result("listening-1", "LISTENING", 0, "2026-09-30T10:00:00Z", "test-one")],
    [{ attemptId: "pending-test-two", submittedAt: "2026-10-07T10:00:00Z" }],
  );
  assert.equal(selected?.id, testTwo.id);
  assert.equal(buildStudentProgress(selected, []).skills[2]?.status, "pending");
});
