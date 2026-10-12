"use client";

import ReceiptLongOutlined from "@mui/icons-material/ReceiptLongOutlined";
import { AdminDetailsHeader } from "@/features/admin/workspace/AdminDetailsHeader";
import Dialog from "@mui/material/Dialog";
import type { Locale } from "@/config/Locales";
import { getAdminRegistryText } from "@/dictionaries/admin/AdminRegistry";
import { getAdminPaymentsCopy } from "@/dictionaries/admin/AdminPayments";
import { adminPaymentAmount, adminPaymentDate, adminPaymentMonth } from "@/lib/admin/AdminPayments";
import type { AdminPaymentRecord } from "@/types/admin/AdminPayments";

export function AdminPaymentHistory({
  locale,
  record,
  onClose,
}: {
  locale: Locale;
  record: AdminPaymentRecord | null;
  onClose: () => void;
}) {
  const t = getAdminRegistryText(locale);
  const copy = getAdminPaymentsCopy(locale);
  return (
    <Dialog
      open={Boolean(record)}
      onClose={onClose}
      aria-labelledby="admin-payment-history-title"
      maxWidth={false}
      slotProps={{
        paper: { className: "adminRegistry__dialog adminPaymentHistory" },
        backdrop: { className: "publicShared__notificationDialogBackdrop" },
      }}
    >
      {record && (
        <>
          <AdminDetailsHeader
            titleId="admin-payment-history-title"
            title={record.studentName}
            eyebrow={copy.history}
            description={`${record.groupName} · ${adminPaymentMonth(record.month, locale)}`}
            icon={<ReceiptLongOutlined />}
            closeLabel={t("close")}
            onClose={onClose}
          />
          <div className="adminPaymentHistory__body">
            {record.events.length ? (
              <div className="adminPayments__scroll">
                <table className="adminPayments__table" aria-label={copy.history}>
                  <thead>
                    <tr>
                      <th scope="col">{t("lessonDate")}</th>
                      <th scope="col">{copy.type}</th>
                      <th scope="col" className="adminPayments__money">
                        {t("amount")} <small>UZS</small>
                      </th>
                      <th scope="col">{t("note")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {record.events.map((event) => (
                      <tr key={event.id}>
                        <td className="adminPayments__nowrap">
                          {adminPaymentDate(event.date, locale)}
                        </td>
                        <td>{t(event.kind)}</td>
                        <td className="adminPayments__money">
                          {adminPaymentAmount(event.amountUzs, locale)}
                        </td>
                        <td className="adminPaymentHistory__note">{event.note || "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="adminPayments__empty">{copy.historyEmpty}</p>
            )}
            {BigInt(record.adjustmentUzs) !== BigInt(0) && (
              <p className="adminPaymentHistory__adjustment">
                {t("adjustment")}{" "}
                <strong>{adminPaymentAmount(record.adjustmentUzs, locale)} UZS</strong>
              </p>
            )}
          </div>
        </>
      )}
    </Dialog>
  );
}
