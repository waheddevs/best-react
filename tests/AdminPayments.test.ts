import assert from "node:assert/strict";
import test from "node:test";

const { adminPaymentAmount, adminPaymentMonth, adminPaymentDate } = (await import(
  new URL("../src/lib/admin/AdminPayments.ts", import.meta.url).href
)) as typeof import("../src/lib/admin/AdminPayments");

test("payment display preserves exact ledger integers beyond Number precision", () => {
  assert.equal(adminPaymentAmount("9007199254740993", "en"), "9,007,199,254,740,993");
  assert.equal(adminPaymentAmount("-125000", "en"), "-125,000");
  for (const locale of ["uz", "ru", "en"] as const) {
    assert.equal(adminPaymentAmount("59000000", locale).replace(/\D/g, ""), "59000000");
    assert.equal(adminPaymentAmount("0", locale), "0");
  }
});

test("billing months stay fixed and transaction dates follow Tashkent", () => {
  assert.equal(adminPaymentMonth("2026-01", "en"), "Jan 2026");
  assert.equal(adminPaymentMonth("2026-12", "en"), "Dec 2026");
  assert.equal(adminPaymentDate("2026-09-30T20:00:00Z", "en"), "Oct 1, 2026");
});
