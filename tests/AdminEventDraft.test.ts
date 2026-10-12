import assert from "node:assert/strict";
import test from "node:test";
const { contentDraft } = (await import(
  new URL("../src/lib/admin/AdminContentDraft.ts", import.meta.url).href
)) as typeof import("../src/lib/admin/AdminContentDraft");
const { eventTranslations } = (await import(
  new URL("../src/lib/admin/AdminEventDraft.ts", import.meta.url).href
)) as typeof import("../src/lib/admin/AdminEventDraft");

test("event creation fills all versions including programme and FAQ", () => {
  const initial = contentDraft("events"),
    draft = structuredClone(initial);
  draft.translations[2].fields = { title: "Reserved event", description: "Description" };
  draft.translations[2].nested = {
    programme: [{ timeLabel: "10:00", title: "Welcome", description: "Introduction" }],
    faq: [{ question: "Who?", answer: "Guests" }],
  };
  for (const entry of eventTranslations(draft, initial, "EN", true)) {
    assert.deepEqual(entry.fields, draft.translations[2].fields);
    assert.deepEqual(entry.nested, draft.translations[2].nested);
  }
  assert.equal(initial.translations[0].fields.title, "");
});

test("event edits preserve authored copy while keeping programme times synchronized", () => {
  const initial = contentDraft("events");
  for (const entry of initial.translations) {
    entry.fields = { title: "Shared", description: "Shared description" };
    entry.nested.programme = [{ timeLabel: "10:00", title: "Welcome", description: "Intro" }];
  }
  initial.translations[1].fields.title = "Authored title";
  initial.translations[1].nested.programme[0].title = "Authored programme";
  const draft = structuredClone(initial);
  draft.translations[0].fields.title = "Updated";
  draft.translations[0].nested.programme[0] = {
    timeLabel: "11:00",
    title: "Updated welcome",
    description: "New intro",
  };
  draft.translations[0].nested.faq = [{ question: "New question", answer: "New answer" }];
  const result = eventTranslations(draft, initial, "UZ", false);
  assert.equal(result[1].fields.title, "Authored title");
  assert.equal(result[2].fields.title, "Updated");
  assert.equal(result[1].nested.programme[0].title, "Authored programme");
  assert.equal(result[1].nested.programme[0].timeLabel, "11:00");
  assert.equal(result[2].nested.programme[0].title, "Updated welcome");
  assert.deepEqual(result[1].nested.faq, draft.translations[0].nested.faq);
});
