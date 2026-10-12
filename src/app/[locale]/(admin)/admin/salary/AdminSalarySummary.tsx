import { AdminMetricCard } from "@/features/admin/workspace/AdminMetricCard";
import ReceiptLongOutlined from "@mui/icons-material/ReceiptLongOutlined";
import AccountBalanceOutlined from "@mui/icons-material/AccountBalanceOutlined";
import AccountBalanceWalletOutlined from "@mui/icons-material/AccountBalanceWalletOutlined";
import type { Locale } from "@/config/Locales";
import type { AdminSalaryReportQuery } from "@/gql/graphql";
import { getAdminSalaryCopy } from "@/dictionaries/admin/AdminSalary";
import { getAdminMetricDetails } from "@/dictionaries/admin/AdminMetricDetails";
import { adminPaymentAmount, adminPaymentMonth } from "@/lib/admin/AdminPayments";
import { salaryRevenueChange } from "@/lib/admin/AdminSalary";

export function AdminSalarySummary({
  locale,
  report,
  currentMonth,
}: {
  locale: Locale;
  report?: AdminSalaryReportQuery["adminSalaryReport"];
  currentMonth: boolean;
}) {
  const copy = getAdminSalaryCopy(locale);
  const details = getAdminMetricDetails(locale);
  const cards = [
    { key: "receivedUzs", label: copy.received, Icon: ReceiptLongOutlined },
    { key: "centerUzs", label: copy.center, Icon: AccountBalanceOutlined },
    { key: "teacherUzs", label: copy.teacher, Icon: AccountBalanceWalletOutlined },
  ] as const;
  const change =
    report?.previousMonth && report.previousReceivedUzs != null
      ? salaryRevenueChange(report.receivedUzs, report.previousReceivedUzs)
      : null;
  const direction = change?.startsWith("+")
    ? "up"
    : change?.startsWith("\u2212")
      ? "down"
      : undefined;
  const receivedHint = report?.previousMonth
    ? change
      ? `${copy.comparison} · ${adminPaymentMonth(report.previousMonth, locale)}`
      : copy.noPrevious
    : details.allocated;
  return (
    <>
      <section className="adminPaymentSummary" aria-label={copy.title}>
        {cards.map(({ key, label, Icon }, index) => (
          <AdminMetricCard
            key={key}
            label={label}
            value={report ? adminPaymentAmount(report[key], locale) : "\u2014"}
            unit="UZS"
            icon={<Icon />}
            tone={index === 1 ? "green" : index === 2 ? "violet" : "blue"}
            badge={
              index > 0
                ? { label: index === 1 ? "30%" : "70%" }
                : change
                  ? {
                      label: change,
                      trend: direction,
                      tone: direction === "up" ? "green" : direction === "down" ? "red" : "neutral",
                    }
                  : undefined
            }
            hint={index > 0 ? details.revenueShare : receivedHint}
          />
        ))}
      </section>
      <div className="adminPayments__overview adminSalary__overview">
        <span>{copy.rule}</span>
        {currentMonth && <span>{copy.current}</span>}
      </div>
    </>
  );
}
