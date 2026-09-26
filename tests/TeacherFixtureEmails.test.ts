import assert from "node:assert/strict";
import test from "node:test";

const { nextTeacherFixtureEmail } = (await import(
  new URL("../scripts/TeacherFixtureEmails.ts", import.meta.url).href
)) as typeof import("../scripts/TeacherFixtureEmails");

test("builds a fictional email from the student's name", () => {
  assert.equal(nextTeacherFixtureEmail("Hilola Karimova", new Set()), "hilolakarimova@example.com");
});

test("keeps fictional emails unique when names repeat", () => {
  const used = new Set(["hilolakarimova@example.com"]);
  assert.equal(nextTeacherFixtureEmail("Hilola Karimova", used), "hilolakarimova2@example.com");
  assert.equal(nextTeacherFixtureEmail("Hilola Karimova", used), "hilolakarimova3@example.com");
});

test("removes punctuation and accents from email names", () => {
  assert.equal(nextTeacherFixtureEmail("O‘g‘il  Rahimóva", new Set()), "ogilrahimova@example.com");
});
