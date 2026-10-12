import Inventory2Outlined from "@mui/icons-material/Inventory2Outlined";
import type { Locale } from "@/config/Locales";
import { getAdminContentText } from "@/dictionaries/admin/AdminContent";
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
      {metrics.map((m, i) => (
        <div
          key={m.key}
          className="adminRegistryMetrics__card"
          data-tone={["all", "active", "paused", "debtor", "all"][i % 5]}
        >
          <span className="adminRegistryMetrics__icon">
            <Inventory2Outlined aria-hidden="true" />
          </span>
          <div className="adminRegistryMetrics__content">
            <span>{t(m.key)}</span>
            <strong>{m.value}</strong>
          </div>
          <div className="adminRegistryMetrics__progress">
            <i style={{ width: "100%" }} />
          </div>
        </div>
      ))}
    </section>
  );
}
