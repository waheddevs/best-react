import Link from "next/link";
import AssignmentOutlined from "@mui/icons-material/AssignmentOutlined";
import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import CheckRounded from "@mui/icons-material/CheckRounded";
import CloseRounded from "@mui/icons-material/CloseRounded";
import type { Locale } from "@/config/Locales";
import { getAdminContentText } from "@/dictionaries/admin/AdminContent";
import type { AdminExamEntry } from "@/types/admin/AdminContent";

export function AdminExamDetails({
  exam,
  locale,
  onClose,
}: {
  exam: AdminExamEntry;
  locale: Locale;
  onClose: () => void;
}) {
  const t = getAdminContentText(locale);
  const content =
    exam.translations.find((entry) => entry.language === locale.toUpperCase()) ??
    exam.translations[0];
  return (
    <>
      <header className="adminExamDetails__header">
        <span className="adminExamDetails__icon">
          <AssignmentOutlined aria-hidden="true" />
        </span>
        <div className="adminExamDetails__identity">
          <p>{t("details")}</p>
          <h2 id="admin-content-detail">{content?.title ?? exam.key}</h2>
        </div>
        <button
          className="adminExamDetails__close"
          type="button"
          onClick={onClose}
          aria-label={t("close")}
        >
          <CloseRounded />
        </button>
      </header>
      <div className="adminExamDetails__body">
        <div className="adminExamDetails__summary">
          <span
            className={`adminRegistry__status adminRegistry__status_${exam.status === "PUBLISHED" ? "success" : "neutral"}`}
          >
            {t(exam.status)}
          </span>
          {content?.description && <p>{content.description}</p>}
        </div>
        <dl className="adminExamDetails__facts">
          {(["formatLabel", "duration", "level"] as const).map((key) => (
            <div key={key}>
              <dt>{t(key)}</dt>
              <dd>{content?.[key] || "—"}</dd>
            </div>
          ))}
        </dl>
        {Boolean(content?.highlights.length) && (
          <section className="adminExamDetails__highlights" aria-labelledby="admin-exam-highlights">
            <h3 id="admin-exam-highlights">{t("highlights")}</h3>
            <ul>
              {content?.highlights.map((highlight, index) => (
                <li key={index}>
                  <CheckRounded aria-hidden="true" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
      {exam.status === "PUBLISHED" && (
        <footer className="adminExamDetails__footer">
          <Link href={`/${locale}/exams`}>
            {t("viewPublic")}
            <ArrowForwardRounded aria-hidden="true" />
          </Link>
        </footer>
      )}
    </>
  );
}
