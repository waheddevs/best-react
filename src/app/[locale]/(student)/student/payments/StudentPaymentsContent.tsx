import CancelRounded from "@mui/icons-material/CancelRounded";
import CheckCircleRounded from "@mui/icons-material/CheckCircleRounded";

import type { Locale } from "@/config/Locales";
import type { StudentPaymentsCopy } from "@/dictionaries/student/StudentPayments";
import { StudentSectionHero } from "@/features/student/workspace/StudentSectionHero";

import { StudentPaymentProcess } from "./StudentPaymentProcess";

type StudentPaymentsContentProps = {
  copy: StudentPaymentsCopy;
  locale: Locale;
};

// Fictional UI-only entries; no payment or ledger API is called on this page.
const previewHistory = [
  { id: "preview-1", amountUzs: 1_200_000, date: "2026-09-02", status: "paid" },
  { id: "preview-2", amountUzs: 1_200_000, date: "2026-08-03", status: "paid" },
  { id: "preview-3", amountUzs: 1_200_000, date: "2026-07-02", status: "failed" },
  { id: "preview-4", amountUzs: 1_200_000, date: "2026-06-03", status: "paid" },
  { id: "preview-5", amountUzs: 1_200_000, date: "2026-05-02", status: "paid" },
] as const;

export function StudentPaymentsContent({ copy, locale }: StudentPaymentsContentProps) {
  const amountFormatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "UZS",
    maximumFractionDigits: 0,
  });
  const dateFormatter = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

  return (
    <article className="studentPayments">
      <StudentSectionHero
        description={copy.heroDescription}
        eyebrow={copy.heroEyebrow}
        kind="payments"
        label={copy.heroLabel}
        locale={locale}
        title={copy.heroTitle}
      />

      <div className="studentPayments__grid">
        <StudentPaymentProcess copy={copy} />

        <section
          aria-labelledby="student-payment-history"
          className="studentPayments__card studentPayments__historyCard"
        >
          <div className="studentPayments__heading">
            <h2 id="student-payment-history">{copy.history}</h2>
          </div>

          <ul className="studentPayments__history">
            {previewHistory.map((payment) => (
              <li key={payment.id}>
                <div className="studentPayments__historyCopy">
                  <strong>{amountFormatter.format(payment.amountUzs)}</strong>
                  <time dateTime={payment.date}>
                    {dateFormatter.format(new Date(`${payment.date}T12:00:00Z`))}
                  </time>
                </div>
                <span
                  className={`studentPayments__status studentPayments__status--${payment.status}`}
                >
                  {payment.status === "paid" ? (
                    <CheckCircleRounded aria-hidden="true" />
                  ) : (
                    <CancelRounded aria-hidden="true" />
                  )}
                  {payment.status === "paid" ? copy.paid : copy.failed}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </article>
  );
}
