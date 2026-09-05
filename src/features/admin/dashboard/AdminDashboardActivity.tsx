import ArrowOutwardRounded from "@mui/icons-material/ArrowOutwardRounded";
import Link from "next/link";

import type { Locale } from "@/config/Locales";
import styles from "@/css/admin/workspace.module.css";
import type { AdminWorkspaceCopy, AdminWorkspaceRecord } from "@/types/admin/AdminWorkspace";

type AdminDashboardActivityProps = {
  common: AdminWorkspaceCopy["common"];
  locale: Locale;
  records: AdminWorkspaceRecord[];
  title: string;
};

export function AdminDashboardActivity({
  common,
  locale,
  records,
  title,
}: AdminDashboardActivityProps) {
  return (
    <section aria-label={title} className={styles.adminWorkspace__table} role="table">
      <div className={styles.adminWorkspace__tableHead} role="row">
        <span role="columnheader">{common.idRecordLabel}</span>
        <span role="columnheader">{common.contextLabel}</span>
        <span role="columnheader">{common.statusLabel}</span>
        <span role="columnheader" />
      </div>
      {records.map((record) => (
        <div className={styles.adminWorkspace__row} key={record.id} role="row">
          <div role="cell">
            <small>{record.id}</small>
            <strong>{record.title}</strong>
          </div>
          <p role="cell">{record.meta}</p>
          <span
            className={`${styles.adminWorkspace__status} ${styles[`adminWorkspace__status_${record.status}`]}`}
            role="cell"
          >
            {record.detail}
          </span>
          <div role="cell">
            {record.href ? (
              <Link
                aria-label={`${common.detailLabel}: ${record.title}`}
                href={`/${locale}${record.href}`}
              >
                <ArrowOutwardRounded />
              </Link>
            ) : (
              <span>—</span>
            )}
          </div>
        </div>
      ))}
      {records.length === 0 ? (
        <p className={styles.adminWorkspace__empty}>{common.emptyLabel}</p>
      ) : null}
    </section>
  );
}
