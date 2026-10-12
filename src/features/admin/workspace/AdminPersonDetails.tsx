"use client";

import type { Locale } from "@/config/Locales";
import { getAdminRegistryText } from "@/dictionaries/admin/AdminRegistry";
import { getAdminPersonDetailsCopy } from "@/dictionaries/admin/AdminPersonDetails";
import { adminMoney } from "@/lib/admin/AdminRegistryPresentation";
import type { AdminWorkspaceRecord } from "@/types/admin/AdminWorkspace";
import { AdminDirectoryDetails } from "./AdminDirectoryDetails";
import { AdminRecordAvatar } from "./AdminRecordAvatar";

export function AdminPersonDetails({
  record,
  locale,
  onClose,
}: {
  record: AdminWorkspaceRecord;
  locale: Locale;
  onClose: () => void;
}) {
  const t = getAdminRegistryText(locale);
  const copy = getAdminPersonDetailsCopy(locale);
  const fields = (record.fields ?? []).filter((field) => field.key !== "payment");
  const membership = record.studentDirectory;
  const facts = fields.map(({ label, value }) => ({ label, value }));
  if (membership)
    facts.push(
      { label: t("group"), value: membership.activeGroupName ?? "—" },
      { label: t("teacher"), value: membership.activeTeacherName ?? "—" },
    );
  const financials = record.studentFinancials;
  return (
    <AdminDirectoryDetails
      locale={locale}
      title={record.title}
      status={record.detail}
      tone={record.status}
      fields={facts}
      onClose={onClose}
      icon={<AdminRecordAvatar avatarUrl={record.avatarUrl ?? null} displayName={record.title} />}
    >
      {record.teacherGroups && record.teacherGroups.length > 0 && (
        <section className="adminDirectoryDetails__groups" aria-label={copy.activeGroups}>
          <h3>{copy.activeGroups}</h3>
          <ul>
            {record.teacherGroups.map((group) => (
              <li key={group.id}>{group.name}</li>
            ))}
          </ul>
        </section>
      )}
      {financials && (
        <section className="adminDirectoryDetails__finance" aria-label={copy.payments}>
          <h3>{copy.payments}</h3>
          {financials.chargeCount ? (
            <>
              <p>{copy.allPeriods}</p>
              <div className="adminDirectoryDetails__totals">
                <div data-tone="paid">
                  <span>{t("paid")}</span>
                  <strong>{adminMoney(financials.paidUzs, locale)}</strong>
                </div>
                <div data-tone="balance">
                  <span>{t("balance")}</span>
                  <strong>{adminMoney(financials.balanceUzs, locale)}</strong>
                </div>
              </div>
            </>
          ) : (
            <p>{copy.noCharges}</p>
          )}
        </section>
      )}
    </AdminDirectoryDetails>
  );
}
