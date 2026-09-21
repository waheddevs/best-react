import assert from "node:assert/strict";
import test from "node:test";

const { nextTeacherFixtureName } = (await import(
  new URL("../scripts/TeacherFixtureNames.ts", import.meta.url).href
)) as typeof import("../scripts/TeacherFixtureNames");

test("teacher fixture names vary by group and use matching surname forms", () => {
  const usedNames = new Set<string>();
  const sequence = { value: 0 };
  const names = Array.from({ length: 220 }, () => nextTeacherFixtureName(usedNames, sequence));

  assert.equal(new Set(names).size, names.length);
  for (const [index, name] of names.entries()) {
    assert.match(name, index % 2 === 0 ? /(?:ova|yeva|eva)$/ : /(?:ov|yev|ev)$/);
  }
  for (let start = 0; start < names.length; start += 15) {
    const surnames = names.slice(start, start + 15).map((name) => name.split(" ")[1]);
    assert.equal(new Set(surnames).size, surnames.length);
  }
});

test("teacher fixture generator skips names already used by another student", () => {
  const usedNames = new Set(["adiba abdullayeva"]);
  const sequence = { value: 0 };

  assert.notEqual(nextTeacherFixtureName(usedNames, sequence), "Adiba Abdullayeva");
  assert.equal(sequence.value, 2);
});
