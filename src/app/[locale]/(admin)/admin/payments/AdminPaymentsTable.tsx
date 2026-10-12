import HistoryRounded from "@mui/icons-material/HistoryRounded";
import UnfoldMoreRounded from "@mui/icons-material/UnfoldMoreRounded";
import type { Locale } from "@/config/Locales";
import { getAdminRegistryText } from "@/dictionaries/admin/AdminRegistry";
import { getAdminPaymentsCopy } from "@/dictionaries/admin/AdminPayments";
import { adminPaymentAmount, adminPaymentDate, adminPaymentMonth } from "@/lib/admin/AdminPayments";
import type { AdminPaymentRecord } from "@/types/admin/AdminPayments";

export function AdminPaymentsTable({
  locale,
  records,
  descending,
  onSort,
  onOpen,
}: {
  locale: Locale;
  records: AdminPaymentRecord[];
  descending: boolean;
  onSort: () => void;
  onOpen: (record: AdminPaymentRecord) => void;
}) {
  const t = getAdminRegistryText(locale);
  return (
    <div className="adminPayments__scroll">
      <table className="adminPayments__table">
        <thead>
          <tr>
            <th scope="col" aria-sort={descending ? "descending" : "ascending"}>
              <button type="button" onClick={onSort}>
                {t("student")}
                <UnfoldMoreRounded aria-hidden="true" />
              </button>
            </th>
            {(
              [
                "group",
                "month",
                "dueDate",
                "amount",
                "paid",
                "balance",
                "status",
                "actions",
              ] as const
            ).map((key) => (
              <th
                scope="col"
                key={key}
                className={
                  ["amount", "paid", "balance"].includes(key) ? "adminPayments__money" : undefined
                }
              >
                {t(key)}
                {["amount", "paid", "balance"].includes(key) && <small>UZS</small>}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td>
                <button
                  type="button"
                  className="adminPayments__student"
                  onClick={() => onOpen(record)}
                >
                  {record.studentName}
                </button>
              </td>
              <td>{record.groupName}</td>
              <td className="adminPayments__nowrap">{adminPaymentMonth(record.month, locale)}</td>
              <td className="adminPayments__nowrap">{adminPaymentDate(record.dueDate, locale)}</td>
              {[record.amountUzs, record.paidUzs, record.balanceUzs].map((value, index) => (
                <td
                  key={index}
                  className="adminPayments__money"
                  data-balance={(index === 2 && BigInt(value) > BigInt(0)) || undefined}
                >
                  {adminPaymentAmount(value, locale)}
                </td>
              ))}
              <td>
                <span
                  className={`adminRegistry__status adminRegistry__status_${record.status === "PAID" ? "success" : "danger"}`}
                >
                  {t(record.status)}
                </span>
              </td>
              <td className="adminPayments__actions">
                <button
                  type="button"
                  className="adminRegistry__action"
                  onClick={() => onOpen(record)}
                  aria-label={`${getAdminPaymentsCopy(locale).history}: ${record.studentName}`}
                  title={getAdminPaymentsCopy(locale).history}
                >
                  <HistoryRounded aria-hidden="true" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
