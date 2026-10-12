import Link from "next/link";
import SchoolOutlined from "@mui/icons-material/SchoolOutlined";
import { AdminDetailsHeader } from "@/features/admin/workspace/AdminDetailsHeader";
import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import ExpandMoreRounded from "@mui/icons-material/ExpandMoreRounded";
import type { Locale } from "@/config/Locales";
import { getAdminContentText } from "@/dictionaries/admin/AdminContent";
import type { AdminCourseEntry } from "@/types/admin/AdminContent";

export function AdminCourseDetails({
  course,
  registrations,
  locale,
  onClose,
}: {
  course: AdminCourseEntry["versions"][number];
  registrations: number;
  locale: Locale;
  onClose: () => void;
}) {
  const t = getAdminContentText(locale);
  const facts: Array<[string, string | null | undefined]> = [
    ["duration", course.duration],
    ["level", course.level],
    ["formatLabel", course.formatLabel],
    ["schedule", course.schedule],
    ["focus", course.focus],
    ["registrations", String(registrations)],
  ];
  const lists = (["overview", "outcomes", "curriculum"] as const).filter(
    (key) => course[key].length > 0,
  );
  const textSections = (["audience", "prerequisites"] as const).filter((key) =>
    Boolean(course[key]),
  );
  return (
    <>
      <AdminDetailsHeader
        titleId="admin-content-detail"
        title={course.title}
        eyebrow={t("details")}
        icon={<SchoolOutlined />}
        closeLabel={t("close")}
        onClose={onClose}
      />
      <div className="adminContentDetails__body">
        <div className="adminContentDetails__badges">
          <span
            className={`adminRegistry__status adminRegistry__status_${course.status === "PUBLISHED" ? "success" : "neutral"}`}
          >
            {t(course.status)}
          </span>
          <span className="adminRegistry__status adminRegistry__status_neutral">
            {t(course.category)}
          </span>
          {course.featured && (
            <span className="adminRegistry__status adminRegistry__status_neutral">
              {t("featured")}
            </span>
          )}
        </div>
        <div className="adminContentDetails__overview">
          <div className="adminContentDetails__intro">
            {course.description && <p>{course.description}</p>}
            {course.highlights.length > 0 && (
              <section aria-labelledby="admin-course-highlights">
                <h3 id="admin-course-highlights">{t("highlights")}</h3>
                <ul className="adminContentDetails__topics">
                  {course.highlights.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </section>
            )}
          </div>
          <dl className="adminContentDetails__facts">
            {facts
              .filter(([, value]) => Boolean(value))
              .map(([label, value]) => (
                <div key={label}>
                  <dt>{t(label)}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
          </dl>
        </div>
        <div className="adminContentDetails__sections">
          {textSections.map((key) => (
            <details key={key}>
              <summary>
                {t(key)}
                <ExpandMoreRounded aria-hidden="true" />
              </summary>
              <p className="adminContentDetails__text">{course[key]}</p>
            </details>
          ))}
          {lists.map((key) => (
            <details key={key}>
              <summary>
                {t(key)}
                <ExpandMoreRounded aria-hidden="true" />
              </summary>
              <ul>
                {course[key].map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </details>
          ))}
          {course.tracks.length > 0 && (
            <details>
              <summary>
                {t("tracks")}
                <ExpandMoreRounded aria-hidden="true" />
              </summary>
              <ol className="adminContentDetails__tracks">
                {course.tracks.map((track, index) => (
                  <li key={index}>
                    <h3>{track.title}</h3>
                    {track.level && (
                      <p className="adminContentDetails__trackLevel">
                        {t("level")}: {track.level}
                      </p>
                    )}
                    {track.summary && <p>{track.summary}</p>}
                    {track.highlights.length > 0 && (
                      <ul>
                        {track.highlights.map((highlight, position) => (
                          <li key={position}>{highlight}</li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ol>
            </details>
          )}
        </div>
      </div>
      {course.status === "PUBLISHED" && (
        <footer className="adminContentDetails__footer">
          <Link className="adminContentDetails__public" href={`/${locale}/courses/${course.slug}`}>
            {t("viewPublic")}
            <ArrowForwardRounded aria-hidden="true" />
          </Link>
        </footer>
      )}
    </>
  );
}
