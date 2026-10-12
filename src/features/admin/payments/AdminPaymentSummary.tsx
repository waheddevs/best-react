import { AdminMetricCard } from "@/features/admin/workspace/AdminMetricCard";
import ReceiptLongOutlined from "@mui/icons-material/ReceiptLongOutlined";
import PaymentsOutlined from "@mui/icons-material/PaymentsOutlined";
import AccountBalanceWalletOutlined from "@mui/icons-material/AccountBalanceWalletOutlined";
import type { Locale } from "@/config/Locales";
import { getAdminRegistryText } from "@/dictionaries/admin/AdminRegistry";
import { adminPaymentAmount } from "@/lib/admin/AdminPayments";
import { adminMetricShare } from "@/lib/admin/AdminMetricShare";
import { getAdminMetricDetails } from "@/dictionaries/admin/AdminMetricDetails";

export function AdminPaymentSummary({
  locale,
  items,
}: {
  locale: Locale;
  items: Array<{ key: string; value?: string }>;
}) {
  const t = getAdminRegistryText(locale);
  const details = getAdminMetricDetails(locale);
  const billed = items.find((item) => item.key === "billed")?.value;
  const icons = [ReceiptLongOutlined, PaymentsOutlined, AccountBalanceWalletOutlined];
  return (
    <section className="adminPaymentSummary" aria-label={t("payments")}>
      {items.map(({ key, value }, index) => {
        const Icon = icons[index % icons.length];
        const share = adminMetricShare(value, billed);
        return (
          <AdminMetricCard
            key={key}
            label={t(key)}
            value={value === undefined ? "\u2014" : adminPaymentAmount(value, locale)}
            unit="UZS"
            icon={<Icon />}
            tone={key === "outstanding" ? "red" : index === 1 ? "green" : "blue"}
            badge={share ? { label: share } : undefined}
            hint={key === "billed" ? details.billed : details.billedShare}
          />
        );
      })}
    </section>
  );
}
