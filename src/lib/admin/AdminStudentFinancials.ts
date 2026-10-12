import type { AdminTuitionLedgerQuery } from "@/gql/graphql";

type Entry = Pick<
  AdminTuitionLedgerQuery["adminTuitionLedger"]["edges"][number]["node"],
  "allocatedAmountUzs" | "outstandingAmountUzs"
>;

export function getAdminStudentFinancials(entries: Entry[]) {
  return {
    chargeCount: entries.length,
    paidUzs: entries
      .reduce((sum, entry) => sum + BigInt(entry.allocatedAmountUzs), BigInt(0))
      .toString(),
    balanceUzs: entries
      .reduce((sum, entry) => sum + BigInt(entry.outstandingAmountUzs), BigInt(0))
      .toString(),
  };
}
