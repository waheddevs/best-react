import type {
  AdminContentDraft,
  AdminContentEntry,
  AdminContentSection,
} from "@/types/admin/AdminContent";
import type { Language } from "@/gql/graphql";
export const courseFields = [
  "audience",
  "comparisonTitle",
  "duration",
  "focus",
  "formatLabel",
  "imageAlt",
  "level",
  "posterAlt",
  "posterTitle",
  "prerequisites",
  "schedule",
];
export const eventFields = [
  "imageAlt",
  "formatLabel",
  "dateLabel",
  "timeLabel",
  "durationLabel",
  "locationLabel",
];
export const courseLists = ["overview", "highlights", "outcomes", "curriculum"];
export const eventLists = ["topics", "overview", "audience", "takeaways", "practicalInfo"];
export const nestedFields: Record<string, string[]> = {
  tracks: ["title", "summary", "level", "highlights"],
  programme: ["timeLabel", "title", "description"],
  faq: ["question", "answer"],
};
export function contentDraft(
  section: AdminContentSection,
  row?: AdminContentEntry,
): AdminContentDraft {
  const first = row ? ("versions" in row ? row.versions[0] : row) : undefined;
  const fields: Record<string, string> = {
    slug: "",
    key: "",
    position: "0",
    category: "ENGLISH",
    accent: "BLUE",
    symbol: "A",
    featured: "no",
    timelineStatus: "UPCOMING",
    status: "DRAFT",
    active: "yes",
  };
  if (first)
    for (const [key, value] of Object.entries(first)) {
      if (typeof value === "string" || typeof value === "number") fields[key] = String(value);
      if (typeof value === "boolean") fields[key] = value ? "yes" : "no";
    }
  if (row) {
    fields.id = row.id;
    fields.expectedUpdatedAt = "updatedAt" in row ? row.updatedAt : "";
    fields.revision = "revision" in row ? row.revision : "";
  }
  for (const key of ["startsAt", "endsAt"]) {
    if (fields[key])
      fields[key] = new Date(new Date(fields[key]).getTime() + 5 * 3600000)
        .toISOString()
        .slice(0, 16);
  }
  const versions = row ? ("versions" in row ? row.versions : row.translations) : [];
  return {
    fields,
    translations: (["UZ", "RU", "EN"] as Language[]).map((language) => {
      const source = versions.find((v) => v.language === language);
      const t = {
        language,
        fields: { title: "", description: "" } as Record<string, string>,
        lists: {} as Record<string, string>,
        nested: {} as Record<string, Record<string, string>[]>,
      };
      if (source)
        for (const [key, value] of Object.entries(source)) {
          if (typeof value === "string") t.fields[key] = value;
          if (Array.isArray(value)) {
            if (value.every((v) => typeof v === "string")) t.lists[key] = value.join("\n");
            else
              t.nested[key] = value.map((v) =>
                Object.fromEntries(
                  Object.entries(v)
                    .filter(([k]) => k !== "position")
                    .map(([k, x]) => [k, Array.isArray(x) ? x.join("\n") : String(x ?? "")]),
                ),
              );
          }
        }
      return t;
    }),
  };
}
export function contentLines(text: string | undefined) {
  return (text ?? "")
    .split("\n")
    .map((x) => x.trim())
    .filter(Boolean);
}
