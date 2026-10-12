import assert from "node:assert/strict";
import test from "node:test";
const { contentDraft } = (await import(
  new URL("../src/lib/admin/AdminContentDraft.ts", import.meta.url).href
)) as typeof import("../src/lib/admin/AdminContentDraft");
const { courseTranslations, courseSlug } = (await import(
  new URL("../src/lib/admin/AdminCourseDraft.ts", import.meta.url).href
)) as typeof import("../src/lib/admin/AdminCourseDraft");

test("one-language course creation fills all required versions including nested content", () => {
  const initial = contentDraft("courses");
  const draft = structuredClone(initial);
  draft.translations[2].fields = { title: "English", description: "Course description" };
  draft.translations[2].lists.highlights = "Practice";
  draft.translations[2].nested.tracks = [
    { title: "Beginner", summary: "Start here", level: "A1", highlights: "Practice" },
  ];
  const result = courseTranslations(draft, initial, "EN", true);
  assert.deepEqual(
    result.map((x) => x.language),
    ["UZ", "RU", "EN"],
  );
  for (const entry of result) {
    assert.equal(entry.fields.title, "English");
    assert.equal(entry.lists.highlights, "Practice");
    assert.equal(entry.nested.tracks[0].title, "Beginner");
  }
  assert.equal(initial.translations[2].fields.title, "");
});

test("editing preserves authored translations and updates shared fallback values", () => {
  const initial = contentDraft("courses");
  initial.translations[0].fields = { title: "O‘zbekcha", description: "Original" };
  initial.translations[1].fields = { title: "Русский", description: "Перевод" };
  initial.translations[2].fields = { title: "O‘zbekcha", description: "Original" };
  const draft = structuredClone(initial);
  draft.translations[0].fields = { title: "Yangi", description: "Updated" };
  const result = courseTranslations(draft, initial, "UZ", false);
  assert.deepEqual(result[1].fields, initial.translations[1].fields);
  assert.deepEqual(result[2].fields, draft.translations[0].fields);
});

test("course links are valid for Cyrillic and Uzbek titles and retain a unique suffix", () => {
  assert.equal(courseSlug("Русский язык", "12345678"), "russkiy-yazyk-12345678");
  assert.equal(courseSlug("O‘zbek tili", "12345678"), "ozbek-tili-12345678");
  assert.equal(courseSlug("中文", "12345678"), "course-12345678");
  assert.ok(courseSlug("a".repeat(300), "12345678").length <= 160);
});
