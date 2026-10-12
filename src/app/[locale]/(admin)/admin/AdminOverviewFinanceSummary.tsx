import AccountBalanceWalletOutlined from "@mui/icons-material/AccountBalanceWalletOutlined";
import ArrowOutwardRounded from "@mui/icons-material/ArrowOutwardRounded";
import Link from "next/link";
import type { Locale } from "@/config/Locales";
import type { AdminOverviewFinanceQuery } from "@/gql/graphql";
import { getAdminOverviewCopy } from "@/dictionaries/admin/AdminOverview";
import { adminPaymentAmount } from "@/lib/admin/AdminPayments";

export function AdminOverviewFinanceSummary({
  locale,
  report,
  outstanding,
}: {
  locale: Locale;
  report: AdminOverviewFinanceQuery["adminSalaryReport"];
  outstanding: string;
}) {
  const copy = getAdminOverviewCopy(locale);
  const amount = (value: string) => adminPaymentAmount(value, locale);
  return (
    <div className="adminOverviewFinance__content">
      <Link className="adminOverviewFinance__received" href={`/${locale}/admin/salary`}>
        <span className="adminOverviewFinance__icon">
          <AccountBalanceWalletOutlined />
        </span>
        <div>
          <span className="adminOverviewFinance__label">{copy.received}</span>
          <strong className="adminOverviewFinance__amount">
            {amount(report.receivedUzs)} <small>UZS</small>
          </strong>
          <span className="adminOverviewFinance__hint">{copy.allocatedPayments}</span>
        </div>
      </Link>
      <div className="adminOverviewFinance__split">
        <div className="adminOverviewFinance__splitLabels">
          <span>
            {copy.centerShare}
            <b>30%</b>
          </span>
          <span>
            {copy.teacherShare}
            <b>70%</b>
          </span>
        </div>
        <div className="adminOverviewFinance__bar" aria-hidden="true">
          <span />
          <span />
        </div>
        <div className="adminOverviewFinance__splitAmounts">
          <strong>
            {amount(report.centerUzs)} <small>UZS</small>
          </strong>
          <strong>
            {amount(report.teacherUzs)} <small>UZS</small>
          </strong>
        </div>
      </div>
      <Link className="adminOverviewFinance__outstanding" href={`/${locale}/admin/payments`}>
        <span className="adminOverviewFinance__label">
          {copy.outstanding}
          <ArrowOutwardRounded />
        </span>
        <strong className="adminOverviewFinance__amount">
          {amount(outstanding)} <small>UZS</small>
        </strong>
        <span className="adminOverviewFinance__hint">{copy.allInvoices}</span>
      </Link>
    </div>
  );
}
