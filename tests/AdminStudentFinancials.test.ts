import assert from "node:assert/strict";
import test from "node:test";

const { getAdminStudentFinancials } = (await import(
  new URL("../src/lib/admin/AdminStudentFinancials.ts", import.meta.url).href
)) as typeof import("../src/lib/admin/AdminStudentFinancials");

test("student totals use real allocations and outstanding balances across charges", () => {
  assert.deepEqual(
    getAdminStudentFinancials([
      { allocatedAmountUzs: "125000", outstandingAmountUzs: "175000" },
      { allocatedAmountUzs: "300000", outstandingAmountUzs: "0" },
      // A waived charge has no payment allocation, even when no balance remains.
      { allocatedAmountUzs: "0", outstandingAmountUzs: "0" },
    ]),
    { chargeCount: 3, paidUzs: "425000", balanceUzs: "175000" },
  );
});

test("empty tuition history stays distinct and large UZS integers retain precision", () => {
  assert.deepEqual(getAdminStudentFinancials([]), {
    chargeCount: 0,
    paidUzs: "0",
    balanceUzs: "0",
  });
  assert.equal(
    getAdminStudentFinancials([
      { allocatedAmountUzs: "9007199254740993", outstandingAmountUzs: "0" },
      { allocatedAmountUzs: "2", outstandingAmountUzs: "0" },
    ]).paidUzs,
    "9007199254740995",
  );
});
