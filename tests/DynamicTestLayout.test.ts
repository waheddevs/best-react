import assert from "node:assert/strict";
import test from "node:test";

const { resolveDynamicTestLayout } = (await import(
  new URL("../src/lib/tests/DynamicTestLayout.ts", import.meta.url).href
)) as typeof import("../src/lib/tests/DynamicTestLayout");

test("groups variable question counts by ordered section without hard-coded IELTS totals", () => {
  const layout = resolveDynamicTestLayout(
    "READING",
    [
      { id: "section-b", position: 2 },
      { id: "section-a", position: 1 },
    ],
    [
      { id: "question-3", position: 3, sectionId: "section-b" },
      { id: "question-1", position: 1, sectionId: "section-a" },
      { id: "question-2", position: 2, sectionId: "section-a" },
    ],
  );

  assert.equal(layout.preset, "passageQuestions");
  assert.equal(layout.density, "spacious");
  assert.deepEqual(layout.sectionQuestionIds, {
    "section-a": ["question-1", "question-2"],
    "section-b": ["question-3"],
  });
});

test("keeps questions with a missing or unknown section reachable", () => {
  const layout = resolveDynamicTestLayout(
    "LISTENING",
    [{ id: "section-a", position: 1 }],
    [
      { id: "question-1", position: 1, sectionId: null },
      { id: "question-2", position: 2, sectionId: "missing-section" },
    ],
  );

  assert.equal(layout.preset, "audioQuestions");
  assert.deepEqual(layout.ungroupedQuestionIds, ["question-1", "question-2"]);
});

test("uses compact navigation density for a full forty-question paper", () => {
  const questions = Array.from({ length: 40 }, (_, index) => ({
    id: `question-${String(index + 1)}`,
    position: index + 1,
    sectionId: `section-${String(Math.floor(index / 10) + 1)}`,
  }));
  const sections = Array.from({ length: 4 }, (_, index) => ({
    id: `section-${String(index + 1)}`,
    position: index + 1,
  }));

  assert.equal(resolveDynamicTestLayout("LISTENING", sections, questions).density, "compact");
});
