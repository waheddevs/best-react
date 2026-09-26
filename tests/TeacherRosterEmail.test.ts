import assert from "node:assert/strict";
import test from "node:test";

const { formatTeacherRosterEmail } = (await import(
  new URL("../src/lib/teacher/TeacherRosterEmail.ts", import.meta.url).href
)) as typeof import("../src/lib/teacher/TeacherRosterEmail");

test("shows an email of at most 30 characters in full", () => {
  assert.equal(
    formatTeacherRosterEmail("abcdefghijklmnopqr@example.com"),
    "abcdefghijklmnopqr@example.com",
  );
});

test("shows 30 characters followed by dots for longer emails", () => {
  assert.equal(
    formatTeacherRosterEmail("abcdefghijklmnopqrstuvwxyz12345@example.com"),
    "abcdefghijklmnopqrstuvwxyz1234...",
  );
});

test("shows a neutral placeholder for an absent email", () => {
  assert.equal(formatTeacherRosterEmail(null), "—");
});
