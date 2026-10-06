import assert from "node:assert/strict";
import test from "node:test";

const { studentShortName } = (await import(
  new URL("../src/lib/student/StudentDisplayName.ts", import.meta.url).href
)) as typeof import("../src/lib/student/StudentDisplayName");

test("student sidebar shows the first name and surname initial", () => {
  assert.equal(studentShortName("Dilnoza Karimova", "en"), "Dilnoza K.");
  assert.equal(studentShortName("Dilnoza To‘xtayeva", "uz"), "Dilnoza T.");
  assert.equal(studentShortName("Dilnoza", "en"), "Dilnoza");
});
