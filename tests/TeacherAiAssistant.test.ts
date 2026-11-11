import assert from "node:assert/strict";
import test from "node:test";

const { parseTeacherAiMarkdown, shouldSendTeacherAiMessage, teacherAiRouteConversation } =
  (await import(
    new URL("../src/features/teacher/ai/TeacherAiMarkdownModel.ts", import.meta.url).href
  )) as typeof import("../src/features/teacher/ai/TeacherAiMarkdownModel");

test("AI text supports headings, lists and unfinished code fences without interpreting HTML or URLs", () => {
  assert.deepEqual(
    parseTeacherAiMarkdown(
      "# Lesson\n\n- First\n<script>alert(1)</script> ![x](https://example.test/x)\n```html\n<img onerror=alert(1)>",
    ),
    [
      { kind: "heading", text: "Lesson" },
      { kind: "list", text: "First" },
      { kind: "paragraph", text: "<script>alert(1)</script> ![x](https://example.test/x)" },
      { kind: "code", text: "<img onerror=alert(1)>" },
    ],
  );
  assert.equal(parseTeacherAiMarkdown("a".repeat(50_000))[0].text.length, 32_000);
});

test("Enter sends only outside IME composition and Shift+Enter preserves the newline", () => {
  assert.equal(shouldSendTeacherAiMessage("Enter", false, false), true);
  assert.equal(shouldSendTeacherAiMessage("Enter", true, false), false);
  assert.equal(shouldSendTeacherAiMessage("Enter", false, true), false);
  assert.equal(shouldSendTeacherAiMessage("a", false, false), false);
});

test("AI route selection distinguishes new chat, a selected thread and ordinary Teacher routes", () => {
  for (const locale of ["uz", "ru", "en"]) {
    assert.equal(teacherAiRouteConversation(`/${locale}/teacher/ai-assistant/`, locale), null);
    assert.equal(
      teacherAiRouteConversation(`/${locale}/teacher/ai-assistant/thread`, locale),
      "thread",
    );
    assert.equal(teacherAiRouteConversation(`/${locale}/teacher/groups`, locale), undefined);
    assert.equal(
      teacherAiRouteConversation(`/${locale}/teacher/ai-assistant-other`, locale),
      undefined,
    );
  }
});
