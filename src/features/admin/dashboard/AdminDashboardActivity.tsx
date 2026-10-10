import ArrowOutwardRounded from "@mui/icons-material/ArrowOutwardRounded";
import Link from "next/link";

import type { Locale } from "@/config/Locales";
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
    <div aria-label={title} className="adminDashboard__queueList">
      {records.map((record) => (
        <div className="adminDashboard__queueRow" key={record.id}>
          <div>
            <small>{record.id}</small>
            <strong>{record.title}</strong>
          </div>
          <p>{record.meta}</p>
          <span className={`adminWorkspace__status adminWorkspace__status_${record.status}`}>
            {record.detail}
          </span>
          <div>
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
      {records.length === 0 ? <p className="adminWorkspace__empty">{common.emptyLabel}</p> : null}
    </div>
  );
}
