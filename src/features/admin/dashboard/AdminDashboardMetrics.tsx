import styles from "@/css/admin/workspace.module.css";
import type { AdminWorkspaceCopy, AdminWorkspaceRecord } from "@/types/admin/AdminWorkspace";

type AdminDashboardMetricsProps = {
  common: AdminWorkspaceCopy["common"];
  records: AdminWorkspaceRecord[];
  title: string;
};

export function AdminDashboardMetrics({ common, records, title }: AdminDashboardMetricsProps) {
  const attentionCount = records.filter(
    (record) => record.status === "warning" || record.status === "danger",
  ).length;

  return (
    <section aria-label={title} className={styles.adminWorkspace__metrics}>
      <div>
        <span>{common.all}</span>
        <strong>{records.length}</strong>
      </div>
      <div>
        <span>{common.openQueueLabel}</span>
        <strong>{Math.max(1, attentionCount)}</strong>
      </div>
      <div>
        <span>{common.serviceLevelLabel}</span>
        <strong>98.4%</strong>
      </div>
      <div>
        <span>{common.lastSyncLabel}</span>
        <strong>10:28</strong>
      </div>
    </section>
  );
}
