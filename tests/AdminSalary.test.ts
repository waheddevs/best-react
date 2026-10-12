import assert from "node:assert/strict";
import test from "node:test";
const { salaryRevenueChange } = (await import(
  new URL("../src/lib/admin/AdminSalary.ts", import.meta.url).href
)) as typeof import("../src/lib/admin/AdminSalary");

test("revenue comparison preserves big integer precision and handles zero baseline", () => {
  assert.equal(salaryRevenueChange("300000", "200000"), "+50.0%");
  assert.equal(salaryRevenueChange("100000", "200000"), "−50.0%");
  assert.equal(salaryRevenueChange("0", "0"), null);
  assert.equal(salaryRevenueChange("0", "10"), "−100.0%");
  assert.equal(salaryRevenueChange("18014398509481986", "9007199254740993"), "+100.0%");
});
