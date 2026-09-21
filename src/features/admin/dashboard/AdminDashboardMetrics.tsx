import type { AdminSectionCopy } from "@/types/admin/AdminWorkspace";

type AdminDashboardMetricsProps = {
  metrics: AdminSectionCopy["metrics"];
  title: string;
};

export function AdminDashboardMetrics({ metrics, title }: AdminDashboardMetricsProps) {
  return (
    <section aria-label={title} className="adminWorkspace__metrics">
      {metrics.map((metric) => (
        <div key={metric.label}>
          <span>{metric.label}</span>
          <strong>{metric.value}</strong>
        </div>
      ))}
    </section>
  );
}
