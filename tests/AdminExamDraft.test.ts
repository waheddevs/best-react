import assert from "node:assert/strict";
import test from "node:test";
const { contentDraft } = (await import(
  new URL("../src/lib/admin/AdminContentDraft.ts", import.meta.url).href
)) as typeof import("../src/lib/admin/AdminContentDraft");
const { examTranslations } = (await import(
  new URL("../src/lib/admin/AdminExamDraft.ts", import.meta.url).href
)) as typeof import("../src/lib/admin/AdminExamDraft");

test("exam creation fills language versions from the active form", () => {
  const initial = contentDraft("exams");
  const draft = structuredClone(initial);
  draft.translations[2].fields = {
    title: "Practice exam",
    description: "Reserved description",
    formatLabel: "Paper",
    duration: "60 minutes",
    level: "B1",
  };
  draft.translations[2].lists.highlights = "Practice\nFeedback";
  const translated = examTranslations(draft, initial, "EN", true);
  for (const entry of translated) {
    assert.deepEqual(entry.fields, draft.translations[2].fields);
    assert.equal(entry.lists.highlights, "Practice\nFeedback");
  }
  assert.equal(initial.translations[0].fields.title, "");
});

test("exam edits preserve authored translations and update previous fallbacks", () => {
  const initial = contentDraft("exams");
  initial.translations[0].fields = { title: "Original", description: "Shared" };
  initial.translations[1].fields = { title: "Authored title", description: "Authored description" };
  initial.translations[2].fields = { title: "Original", description: "Shared" };
  initial.translations[2].lists.highlights = "Authored highlights";
  const draft = structuredClone(initial);
  draft.translations[0].fields = { title: "Updated", description: "Updated description" };
  draft.translations[0].lists.highlights = "New highlights";
  const translated = examTranslations(draft, initial, "UZ", false);
  assert.deepEqual(translated[1].fields, initial.translations[1].fields);
  assert.deepEqual(translated[2].fields, draft.translations[0].fields);
  assert.equal(translated[2].lists.highlights, "Authored highlights");
  assert.equal(translated[1].lists.highlights, "New highlights");
});
