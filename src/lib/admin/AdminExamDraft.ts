import type { AdminContentDraft } from "@/types/admin/AdminContent";

/** Fill missing language versions without overwriting separately authored translations. */
export function examTranslations(
  draft: AdminContentDraft,
  initial: AdminContentDraft,
  language: string,
  creating: boolean,
) {
  const source = draft.translations.find((entry) => entry.language === language)!;
  const previous = initial.translations.find((entry) => entry.language === language)!;
  return draft.translations.map((entry) => {
    if (creating || entry.language === language) return { ...source, language: entry.language };
    const merge = (key: "fields" | "lists") =>
      Object.fromEntries(
        Object.entries(source[key]).map(([field, value]) => [
          field,
          !entry[key][field]?.trim() || entry[key][field] === previous[key][field]
            ? value
            : entry[key][field],
        ]),
      );
    return { ...entry, fields: merge("fields"), lists: merge("lists") };
  });
}
