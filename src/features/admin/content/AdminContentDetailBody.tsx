import type { Locale } from "@/config/Locales";
import { getAdminContentText } from "@/dictionaries/admin/AdminContent";

export function AdminContentDetailBody({
  locale,
  content,
}: {
  locale: Locale;
  content: Record<string, unknown>;
}) {
  const t = getAdminContentText(locale);
  const hidden = new Set([
    "id",
    "slug",
    "key",
    "title",
    "description",
    "language",
    "position",
    "__typename",
    "coverMediaId",
  ]);
  const value = (key: string, v: unknown): string => {
    if (typeof v === "boolean") return t(v ? "yes" : "no");
    if (typeof v !== "string" && typeof v !== "number") return "";
    if (["startsAt", "endsAt"].includes(key))
      return new Intl.DateTimeFormat(locale, {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "Asia/Tashkent",
      }).format(new Date(String(v)));
    return ["status", "category", "accent", "timelineStatus", "heroVariant"].includes(key)
      ? t(String(v))
      : String(v);
  };
  return (
    <div className="adminContent__detailBody">
      <p>{typeof content.description === "string" ? content.description : ""}</p>
      <dl>
        {Object.entries(content)
          .filter(
            ([key, v]) =>
              !hidden.has(key) && v !== null && v !== undefined && v !== "" && !Array.isArray(v),
          )
          .map(([key, v]) => (
            <div key={key}>
              <dt>{t(key)}</dt>
              <dd>{value(key, v)}</dd>
            </div>
          ))}
      </dl>
      {Object.entries(content)
        .filter(([, v]) => Array.isArray(v) && v.length > 0)
        .map(([key, v]) => (
          <section key={key}>
            <h3>{t(key)}</h3>
            <ul>
              {(v as unknown[]).map((item, index) => (
                <li key={index}>
                  {typeof item === "string" ? (
                    item
                  ) : item && typeof item === "object" ? (
                    <dl>
                      {Object.entries(item)
                        .filter(([k]) => k !== "__typename" && k !== "position")
                        .map(([k, x]) => (
                          <div key={k}>
                            <dt>{t(k)}</dt>
                            <dd>{Array.isArray(x) ? x.join(" · ") : value(k, x)}</dd>
                          </div>
                        ))}
                    </dl>
                  ) : null}
                </li>
              ))}
            </ul>
          </section>
        ))}
    </div>
  );
}
