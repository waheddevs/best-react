import assert from "node:assert/strict";
import test from "node:test";
const { adminMetricShare } = (await import(
  new URL("../src/lib/admin/AdminMetricShare.ts", import.meta.url).href
)) as typeof import("../src/lib/admin/AdminMetricShare");

test("metric shares handle exact large UZS amounts and round to one decimal", () => {
  assert.equal(adminMetricShare("30000000000000000000", "40000000000000000000"), "75%");
  assert.equal(adminMetricShare("2", "3"), "66.7%");
  assert.equal(adminMetricShare("0", "100"), "0%");
  assert.equal(adminMetricShare("120", "100"), "120%");
});

test("metric shares do not invent a percentage for missing or zero totals", () => {
  for (const total of [undefined, "0", "invalid", "-1"]) {
    assert.equal(adminMetricShare("12", total), null);
  }
  assert.equal(adminMetricShare(undefined, "100"), null);
});
