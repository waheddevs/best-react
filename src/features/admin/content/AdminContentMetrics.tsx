import { AdminMetricCard } from "@/features/admin/workspace/AdminMetricCard";
import type { Locale } from "@/config/Locales";
import { getAdminContentText } from "@/dictionaries/admin/AdminContent";
import { adminMetricDetail } from "@/dictionaries/admin/AdminMetricDetails";
export function AdminContentMetrics({
  metrics,
  locale,
}: {
  metrics: ReadonlyArray<{ key: string; value: string }>;
  locale: Locale;
}) {
  const t = getAdminContentText(locale);
  return (
    <section className="adminRegistryMetrics" aria-label={t("overview")}>
      {metrics.map((metric) => (
        <AdminMetricCard
          key={metric.key}
          metricKey={metric.key}
          label={t(metric.key)}
          value={metric.value}
          badge={/^\d+$/.test(metric.value) ? { label: metric.value } : undefined}
          hint={adminMetricDetail(locale, metric.key)}
        />
      ))}
    </section>
  );
}
