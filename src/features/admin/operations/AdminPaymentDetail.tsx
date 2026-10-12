import Link from "next/link";
import type { Locale } from "@/config/Locales";
import { getAdminRegistryText } from "@/dictionaries/admin/AdminRegistry";
import type { AdminLedgerDetailQuery } from "@/gql/graphql";
import { adminMoney } from "@/lib/admin/AdminRegistryPresentation";

export function AdminPaymentDetail({
  locale,
  record,
}: {
  locale: Locale;
  record: AdminLedgerDetailQuery["adminPaymentDetail"];
}) {
  const t = getAdminRegistryText(locale);
  const money = (v: string) => adminMoney(v, locale);
  return (
    <article className="adminWorkspace adminRegistry">
      <header className="adminWorkspace__header">
        <div>
          <Link href={`/${locale}/admin/payments`}>{t("payments")}</Link>
          <h1>{record.studentName}</h1>
          <p>
            {record.groupName} · {record.month} · {t(record.status)}
          </p>
        </div>
      </header>
      <section className="adminRegistryMetrics">
        {[
          ["amount", record.amountUzs],
          ["paid", record.paidUzs],
          ["adjustment", record.adjustmentUzs],
          ["balance", record.balanceUzs],
        ].map(([key, value]) => (
          <div className="adminRegistryMetrics__card" key={key}>
            <div className="adminRegistryMetrics__content">
              <span>{t(key)}</span>
              <strong>{money(value)}</strong>
            </div>
          </div>
        ))}
      </section>
      <section className="adminRegistry__creation">
        <header>
          <h2>{t("timeline")}</h2>
        </header>
        <div className="adminRegistry__tableScroll">
          <table className="adminRegistry__table">
            <thead>
              <tr>
                <th>{t("lessonDate")}</th>
                <th>{t("adjustment")}</th>
                <th>{t("amount")}</th>
                <th>{t("note")}</th>
              </tr>
            </thead>
            <tbody>
              {record.events.map((event) => (
                <tr key={event.id}>
                  <td data-label={t("lessonDate")}>
                    {new Intl.DateTimeFormat(locale, {
                      timeZone: "Asia/Tashkent",
                      dateStyle: "medium",
                    }).format(new Date(event.date))}
                  </td>
                  <td data-label={t("adjustment")}>{t(event.kind)}</td>
                  <td data-label={t("amount")}>{money(event.amountUzs)}</td>
                  <td data-label={t("note")}>{event.note ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {record.events.length === 0 ? <p className="adminRegistry__empty">{t("empty")}</p> : null}
        </div>
      </section>
    </article>
  );
}
