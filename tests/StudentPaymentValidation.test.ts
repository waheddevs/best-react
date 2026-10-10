import assert from "node:assert/strict";
import test from "node:test";

const {
  formatPreviewCardNumber,
  formatPreviewExpiry,
  formatPreviewSecurityCode,
  isValidPreviewCardNumber,
  isValidPreviewExpiry,
} = (await import(
  new URL("../src/lib/student/StudentPaymentValidation.ts", import.meta.url).href
)) as typeof import("../src/lib/student/StudentPaymentValidation");

test("preview card number is formatted and checked with Luhn", () => {
  assert.equal(formatPreviewCardNumber("4242a4242-4242 4242"), "4242 4242 4242 4242");
  assert.equal(isValidPreviewCardNumber("4242 4242 4242 4242"), true);
  assert.equal(isValidPreviewCardNumber("4242 4242 4242 4243"), false);
  assert.equal(isValidPreviewCardNumber("0000 0000 0000 0000"), false);
  assert.equal(isValidPreviewCardNumber("4242"), false);
});

test("preview expiry requires a real, non-expired month", () => {
  const now = new Date("2026-10-07T00:00:00Z");
  assert.equal(formatPreviewExpiry("1027"), "10/27");
  assert.equal(formatPreviewExpiry("arnol"), "");
  assert.equal(isValidPreviewExpiry("10/26", now), true);
  assert.equal(isValidPreviewExpiry("09/26", now), false);
  assert.equal(isValidPreviewExpiry("13/27", now), false);
  assert.equal(isValidPreviewExpiry("1/27", now), false);
});

test("preview security code accepts at most four digits", () => {
  assert.equal(formatPreviewSecurityCode("12a3456"), "1234");
  assert.equal(formatPreviewSecurityCode("arnol"), "");
});
