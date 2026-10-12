import HistoryRounded from "@mui/icons-material/HistoryRounded";
import UnfoldMoreRounded from "@mui/icons-material/UnfoldMoreRounded";
import type { Locale } from "@/config/Locales";
import { getAdminRegistryText } from "@/dictionaries/admin/AdminRegistry";
import { getAdminSalaryCopy } from "@/dictionaries/admin/AdminSalary";
import { adminPaymentAmount, adminPaymentMonth } from "@/lib/admin/AdminPayments";
import type { AdminSalaryRecord } from "@/types/admin/AdminSalary";

export function AdminSalaryTable({
  locale,
  records,
  descending,
  onSort,
  onOpen,
}: {
  locale: Locale;
  records: AdminSalaryRecord[];
  descending: boolean;
  onSort: () => void;
  onOpen: (record: AdminSalaryRecord) => void;
}) {
  const t = getAdminRegistryText(locale);
  const copy = getAdminSalaryCopy(locale);
  return (
    <div className="adminPayments__scroll">
      <table className="adminPayments__table adminSalary__table">
        <thead>
          <tr>
            <th scope="col" aria-sort={descending ? "descending" : "ascending"}>
              <button type="button" onClick={onSort}>
                {t("teacher")}
                <UnfoldMoreRounded aria-hidden="true" />
              </button>
            </th>
            <th scope="col">{t("month")}</th>
            <th scope="col">{t("groups")}</th>
            <th scope="col">{t("students")}</th>
            {[copy.received, copy.center, copy.teacher].map((label) => (
              <th key={label} scope="col" className="adminPayments__money">
                {label}
                <small>UZS</small>
              </th>
            ))}
            <th scope="col">{t("actions")}</th>
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
                  {record.teacherName}
                </button>
              </td>
              <td className="adminPayments__nowrap">{adminPaymentMonth(record.month, locale)}</td>
              <td>{record.groupCount}</td>
              <td>{record.studentCount}</td>
              {[record.receivedUzs, record.centerUzs, record.teacherUzs].map((value, index) => (
                <td key={index} className="adminPayments__money">
                  {adminPaymentAmount(value, locale)}
                </td>
              ))}
              <td className="adminPayments__actions">
                <button
                  type="button"
                  className="adminRegistry__action"
                  title={copy.history}
                  aria-label={`${copy.history}: ${record.teacherName}`}
                  onClick={() => onOpen(record)}
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
