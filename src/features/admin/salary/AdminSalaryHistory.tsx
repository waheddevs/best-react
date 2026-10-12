"use client";
import { useQuery } from "@apollo/client/react";
import AccountBalanceWalletOutlined from "@mui/icons-material/AccountBalanceWalletOutlined";
import { AdminDetailsHeader } from "@/features/admin/workspace/AdminDetailsHeader";
import Dialog from "@mui/material/Dialog";
import { useState } from "react";
import type { Locale } from "@/config/Locales";
import { AdminSalaryHistoryDocument } from "@/gql/graphql";
import { getAdminRegistryText } from "@/dictionaries/admin/AdminRegistry";
import { getAdminSalaryCopy } from "@/dictionaries/admin/AdminSalary";
import { adminPaymentAmount, adminPaymentDate, adminPaymentMonth } from "@/lib/admin/AdminPayments";
import type { AdminSalaryRecord } from "@/types/admin/AdminSalary";
import { AdminContentPagination } from "../content/AdminContentPagination";

export function AdminSalaryHistory({
  locale,
  record,
  groupId,
  onClose,
}: {
  locale: Locale;
  record: AdminSalaryRecord;
  groupId?: string;
  onClose: () => void;
}) {
  const t = getAdminRegistryText(locale);
  const copy = getAdminSalaryCopy(locale);
  const [page, setPage] = useState(1);
  const query = useQuery(AdminSalaryHistoryDocument, {
    variables: {
      input: { teacherId: record.teacherId, month: record.month, groupId, page, pageSize: 10 },
    },
    context: { authenticated: true },
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
  });
  const history = query.data?.adminSalaryHistory;
  const money = (value: string) => adminPaymentAmount(value, locale);
  const headers = [copy.received, copy.center, copy.teacher];
  return (
    <Dialog
      open
      onClose={onClose}
      maxWidth={false}
      aria-labelledby="admin-salary-history-title"
      slotProps={{
        paper: { className: "adminRegistry__dialog adminPaymentHistory adminSalaryHistory" },
        backdrop: { className: "publicShared__notificationDialogBackdrop" },
      }}
    >
      <AdminDetailsHeader
        titleId="admin-salary-history-title"
        title={record.teacherName}
        eyebrow={copy.history}
        description={adminPaymentMonth(record.month, locale)}
        icon={<AccountBalanceWalletOutlined />}
        closeLabel={t("close")}
        onClose={onClose}
      />
      <div className="adminPaymentHistory__body" aria-busy={query.loading}>
        {query.loading ? (
          <p className="adminPayments__empty" role="status">
            {t("loading")}
          </p>
        ) : query.error ? (
          <div className="adminPayments__empty" role="alert">
            <p>{t("error")}</p>
            <button type="button" onClick={() => void query.refetch().catch(() => undefined)}>
              {t("retry")}
            </button>
          </div>
        ) : history?.nodes.length ? (
          <>
            <section aria-label={copy.groups}>
              <h3>{copy.groups}</h3>
              <div className="adminPayments__scroll">
                <table className="adminPayments__table">
                  <thead>
                    <tr>
                      <th scope="col">{t("group")}</th>
                      {headers.map((label) => (
                        <th key={label} scope="col" className="adminPayments__money">
                          {label}
                          <small>UZS</small>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {history.groups.map((group) => (
                      <tr key={group.id}>
                        <td>{group.name}</td>
                        {[group.receivedUzs, group.centerUzs, group.teacherUzs].map(
                          (value, index) => (
                            <td key={index} className="adminPayments__money">
                              {money(value)}
                            </td>
                          ),
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
            <section aria-label={copy.payments}>
              <h3>{copy.payments}</h3>
              <div className="adminPayments__scroll">
                <table className="adminPayments__table">
                  <thead>
                    <tr>
                      <th scope="col">{t("student")}</th>
                      <th scope="col">{t("group")}</th>
                      <th scope="col">{t("lessonDate")}</th>
                      {headers.map((label) => (
                        <th key={label} scope="col" className="adminPayments__money">
                          {label}
                          <small>UZS</small>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {history.nodes.map((payment) => (
                      <tr key={payment.id}>
                        <td>
                          {payment.studentName}
                          {payment.note && (
                            <small className="adminSalaryHistory__note">{payment.note}</small>
                          )}
                        </td>
                        <td>{payment.groupName}</td>
                        <td className="adminPayments__nowrap">
                          {adminPaymentDate(payment.paidAt, locale)}
                        </td>
                        {[payment.receivedUzs, payment.centerUzs, payment.teacherUzs].map(
                          (value, index) => (
                            <td key={index} className="adminPayments__money">
                              {money(value)}
                            </td>
                          ),
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
            <AdminContentPagination
              locale={locale}
              section="payments"
              page={page}
              pageCount={history.pageCount}
              totalCount={history.totalCount}
              busy={query.loading}
              onChange={setPage}
            />
          </>
        ) : (
          <p className="adminPayments__empty">{copy.empty}</p>
        )}
        <p className="adminSalary__disclosure">{copy.rounding}</p>
      </div>
    </Dialog>
  );
}
