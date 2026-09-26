import assert from "node:assert/strict";
import test from "node:test";

const { formatPhoneNumber, normalizePhoneNumber } = (await import(
  new URL("../src/lib/PhoneNumber.ts", import.meta.url).href
)) as typeof import("../src/lib/PhoneNumber");

test("formats a valid Uzbekistan number by country metadata", () => {
  assert.equal(formatPhoneNumber("+998901234567"), "+998 90 123 45 67");
});

test("formats a reserved fictional Uzbekistan number without changing storage", () => {
  const stored = "+998000123456";
  assert.equal(formatPhoneNumber(stored), "+998 00 012 34 56");
  assert.equal(normalizePhoneNumber(formatPhoneNumber(stored)), stored);
});

test("formats another international country number", () => {
  assert.equal(formatPhoneNumber("+12025550123"), "+1 202 555 0123");
});
