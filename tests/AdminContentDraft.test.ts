import assert from "node:assert/strict";
import test from "node:test";
import type { AdminEventEntry } from "../src/types/admin/AdminContent";
const { contentDraft, contentLines } = (await import(
  new URL("../src/lib/admin/AdminContentDraft.ts", import.meta.url).href
)) as typeof import("../src/lib/admin/AdminContentDraft");

test("event editing preserves translations and nested content without mutating query data", () => {
  const row: AdminEventEntry = {
    id: "reserved-id",
    updatedAt: "2026-10-11T00:00:00Z",
    registrations: 2,
    versions: (["UZ", "RU", "EN"] as const).map((language) => ({
      id: "reserved-id",
      slug: "reserved-event",
      language,
      status: "PUBLISHED",
      timelineStatus: "UPCOMING",
      position: 0,
      imagePath: "/images/event.webp",
      coverMediaId: null,
      startsAt: "2026-10-12T21:30:00Z",
      endsAt: null,
      location: "Reserved hall",
      capacity: 10,
      title: `Title ${language}`,
      description: "Description",
      imageAlt: "Image",
      formatLabel: "Workshop",
      dateLabel: null,
      timeLabel: null,
      durationLabel: null,
      locationLabel: null,
      topics: ["One", "Two"],
      overview: [],
      audience: [],
      takeaways: [],
      practicalInfo: [],
      programme: [{ timeLabel: "10:00", title: `Programme ${language}`, description: "Welcome" }],
      faq: [{ question: "Who?", answer: "Adults" }],
    })),
  };
  const draft = contentDraft("events", row);
  assert.equal(draft.fields.startsAt, "2026-10-13T02:30");
  assert.equal(draft.fields.expectedUpdatedAt, row.updatedAt);
  assert.equal(draft.translations[1].fields.title, "Title RU");
  assert.equal(draft.translations[1].nested.programme[0].title, "Programme RU");
  assert.deepEqual(contentLines(draft.translations[0].lists.topics), ["One", "Two"]);
  draft.translations[1].nested.programme[0].title = "Changed";
  assert.equal(row.versions[1].programme[0].title, "Programme RU");
});

test("new content forms initialize three translations and remove blank list lines", () => {
  const draft = contentDraft("exams");
  assert.deepEqual(
    draft.translations.map((x) => x.language),
    ["UZ", "RU", "EN"],
  );
  assert.equal(draft.fields.status, "DRAFT");
  assert.deepEqual(contentLines(" One\n\n Two \n"), ["One", "Two"]);
});
