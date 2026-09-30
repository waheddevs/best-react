import assert from "node:assert/strict";
import test from "node:test";

import type { IeltsAuthoringDraft } from "../src/types/tests/IeltsAuthoring.ts";

const { validateIeltsAuthoringDraft } = (await import(
  new URL("../src/lib/tests/ValidateIeltsAuthoringDraft.ts", import.meta.url).href
)) as typeof import("../src/lib/tests/ValidateIeltsAuthoringDraft");

function readingDraft(): IeltsAuthoringDraft {
  return {
    id: "draft-reading",
    primaryLanguage: "EN",
    skill: "READING",
    sourceRightsConfirmed: true,
    translations: [{ language: "EN", title: "Academic Reading" }],
    sections: [
      {
        id: "section-1",
        position: 1,
        translations: [
          {
            instructions: "Read the passage and answer the questions.",
            language: "EN",
            title: "Passage 1",
          },
        ],
        blocks: [
          {
            id: "passage-1",
            kind: "RICH_TEXT",
            position: 1,
            translations: [{ language: "EN", text: "A fictional academic passage." }],
          },
          {
            id: "group-1",
            kind: "QUESTION_GROUP",
            position: 2,
            questionIds: ["question-1"],
          },
        ],
      },
    ],
    questions: [
      {
        answerProposal: ["option-b"],
        id: "question-1",
        kind: "SINGLE_CHOICE",
        options: [
          {
            id: "option-a",
            isCorrect: false,
            position: 1,
            translations: [{ language: "EN", text: "First option" }],
          },
          {
            id: "option-b",
            isCorrect: true,
            position: 2,
            translations: [{ language: "EN", text: "Second option" }],
          },
        ],
        position: 1,
        sectionId: "section-1",
        translations: [{ language: "EN", prompt: "Choose the correct answer." }],
      },
    ],
  };
}

test("accepts a structurally valid dynamic Reading draft for publication", () => {
  assert.deepEqual(validateIeltsAuthoringDraft(readingDraft(), { mode: "PUBLISH" }), []);
});

test("reports broken section links, duplicate positions, invalid crops, and answer keys", () => {
  const draft = readingDraft();
  draft.sections[0].blocks.push({
    altTranslations: [{ language: "EN", text: "Chart" }],
    height: 400,
    id: "image-1",
    kind: "IMAGE",
    mediaObjectId: "media-1",
    position: 2,
    sourceRegion: { height: 0.3, page: 1, width: 0.4, x: 0.8, y: 0.8 },
    width: 600,
  });
  draft.questions[0].sectionId = "missing-section";
  draft.questions[0].options[0].isCorrect = true;

  const codes = validateIeltsAuthoringDraft(draft, { mode: "PUBLISH" }).map(({ code }) => code);

  assert.ok(codes.includes("DUPLICATE_POSITION"));
  assert.ok(codes.includes("INVALID_SOURCE_REGION"));
  assert.ok(codes.includes("MISSING_SECTION"));
  assert.ok(codes.includes("INVALID_CORRECT_OPTION_COUNT"));
});

test("keeps source-rights and Listening audio checks at the publication boundary", () => {
  const draft = readingDraft();
  draft.skill = "LISTENING";
  draft.sourceRightsConfirmed = false;

  assert.deepEqual(validateIeltsAuthoringDraft(draft), []);

  const publishCodes = validateIeltsAuthoringDraft(draft, { mode: "PUBLISH" }).map(
    ({ code }) => code,
  );
  assert.ok(publishCodes.includes("SOURCE_RIGHTS_REQUIRED"));
  assert.ok(publishCodes.includes("AUDIO_REQUIRED"));
});

test("accepts data-driven Speaking question counts while requiring one Part 2 cue card", () => {
  const draft = readingDraft();
  draft.skill = "SPEAKING";
  draft.sections = [1, 2, 3].map((position) => ({
    blocks: [],
    id: `part-${String(position)}`,
    position,
    translations: [
      {
        instructions: `Part ${String(position)} instructions`,
        language: "EN" as const,
        title: `Part ${String(position)}`,
      },
    ],
  }));
  draft.questions = [
    ["part-1-question-1", "part-1", 1],
    ["part-1-question-2", "part-1", 2],
    ["part-2-question-1", "part-2", 3],
    ["part-3-question-1", "part-3", 4],
    ["part-3-question-2", "part-3", 5],
    ["part-3-question-3", "part-3", 6],
  ].map(([id, sectionId, position]) => ({
    answerProposal: [],
    id: String(id),
    kind: "AUDIO_RESPONSE" as const,
    options: [],
    position: Number(position),
    sectionId: String(sectionId),
    translations: [{ language: "EN" as const, prompt: `Prompt ${String(position)}` }],
  }));

  assert.deepEqual(validateIeltsAuthoringDraft(draft, { mode: "PUBLISH" }), []);

  draft.questions.push({
    answerProposal: [],
    id: "part-2-question-2",
    kind: "AUDIO_RESPONSE",
    options: [],
    position: 7,
    sectionId: "part-2",
    translations: [{ language: "EN", prompt: "Unexpected second cue card" }],
  });
  assert.ok(
    validateIeltsAuthoringDraft(draft, { mode: "PUBLISH" }).some(
      ({ code }) => code === "SPEAKING_STRUCTURE_INVALID",
    ),
  );
});

test("requires two long-text tasks for a publishable IELTS Writing draft", () => {
  const draft = readingDraft();
  draft.skill = "WRITING";

  assert.ok(
    validateIeltsAuthoringDraft(draft, { mode: "PUBLISH" }).some(
      ({ code }) => code === "WRITING_STRUCTURE_INVALID",
    ),
  );
});
