import Link from "next/link";
import EventOutlined from "@mui/icons-material/EventOutlined";
import { AdminDetailsHeader } from "@/features/admin/workspace/AdminDetailsHeader";
import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import ExpandMoreRounded from "@mui/icons-material/ExpandMoreRounded";
import type { Locale } from "@/config/Locales";
import { getAdminContentText } from "@/dictionaries/admin/AdminContent";
import type { AdminEventEntry } from "@/types/admin/AdminContent";

export function AdminEventDetails({
  event,
  registrations,
  locale,
  onClose,
}: {
  event: AdminEventEntry["versions"][number];
  registrations: number;
  locale: Locale;
  onClose: () => void;
}) {
  const t = getAdminContentText(locale);
  const date = (value: string) =>
    new Intl.DateTimeFormat(locale, {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Asia/Tashkent",
    }).format(new Date(value));
  const facts: Array<[string, string | null | undefined]> = [
    [
      "startsAt",
      event.startsAt
        ? date(event.startsAt)
        : [event.dateLabel, event.timeLabel].filter(Boolean).join(" · "),
    ],
    ["endsAt", event.endsAt ? date(event.endsAt) : ""],
    ["durationLabel", event.durationLabel],
    ["formatLabel", event.formatLabel],
    ["location", event.location || event.locationLabel],
    ["capacity", event.capacity == null ? "" : String(event.capacity)],
    ["registrations", String(registrations)],
  ];
  const lists = (["overview", "audience", "takeaways", "practicalInfo"] as const).filter(
    (key) => event[key].length > 0,
  );
  return (
    <>
      <AdminDetailsHeader
        titleId="admin-content-detail"
        title={event.title}
        eyebrow={t("details")}
        icon={<EventOutlined />}
        closeLabel={t("close")}
        onClose={onClose}
      />
      <div className="adminContentDetails__body">
        <div className="adminContentDetails__badges">
          <span
            className={`adminRegistry__status adminRegistry__status_${event.status === "PUBLISHED" ? "success" : "neutral"}`}
          >
            {t(event.status)}
          </span>
          <span className="adminRegistry__status adminRegistry__status_neutral">
            {t(event.timelineStatus)}
          </span>
        </div>
        <div className="adminContentDetails__overview">
          <div className="adminContentDetails__intro">
            {event.description && <p>{event.description}</p>}
            {event.topics.length > 0 && (
              <section aria-labelledby="admin-event-topics">
                <h3 id="admin-event-topics">{t("topics")}</h3>
                <ul className="adminContentDetails__topics">
                  {event.topics.map((topic, index) => (
                    <li key={index}>{topic}</li>
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
          {lists.map((key) => (
            <details key={key}>
              <summary>
                {t(key)}
                <ExpandMoreRounded aria-hidden="true" />
              </summary>
              <ul>
                {event[key].map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </details>
          ))}
          {event.programme.length > 0 && (
            <details>
              <summary>
                {t("programme")}
                <ExpandMoreRounded aria-hidden="true" />
              </summary>
              <ol className="adminContentDetails__programme">
                {event.programme.map((item, index) => (
                  <li key={index}>
                    <span>{item.timeLabel}</span>
                    <div>
                      <strong>{item.title}</strong>
                      {item.description && <p>{item.description}</p>}
                    </div>
                  </li>
                ))}
              </ol>
            </details>
          )}
          {event.faq.length > 0 && (
            <details>
              <summary>
                {t("faq")}
                <ExpandMoreRounded aria-hidden="true" />
              </summary>
              <dl className="adminContentDetails__faq">
                {event.faq.map((item, index) => (
                  <div key={index}>
                    <dt>{item.question}</dt>
                    <dd>{item.answer}</dd>
                  </div>
                ))}
              </dl>
            </details>
          )}
        </div>
      </div>
      <footer className="adminContentDetails__footer">
        <Link href={`/${locale}/admin/events/${event.slug}`}>{t("details")}</Link>
        {event.status === "PUBLISHED" && (
          <Link className="adminContentDetails__public" href={`/${locale}/events/${event.slug}`}>
            {t("viewPublic")}
            <ArrowForwardRounded aria-hidden="true" />
          </Link>
        )}
      </footer>
    </>
  );
}
