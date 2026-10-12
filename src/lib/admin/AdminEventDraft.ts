import type { AdminContentDraft, AdminTranslationDraft } from "@/types/admin/AdminContent";

export function eventTranslations(
  draft: AdminContentDraft,
  initial: AdminContentDraft,
  language: string,
  creating: boolean,
): AdminTranslationDraft[] {
  const source = draft.translations.find((entry) => entry.language === language)!;
  const previous = initial.translations.find((entry) => entry.language === language)!;
  return draft.translations.map((entry) => {
    if (creating || entry.language === language) return { ...source, language: entry.language };
    const merge = (
      current: Record<string, string>,
      values: Record<string, string>,
      old: Record<string, string>,
    ) =>
      Object.fromEntries(
        Object.entries(values).map(([key, value]) => [
          key,
          !current[key]?.trim() || current[key] === old[key] ? value : current[key],
        ]),
      );
    return {
      ...entry,
      fields: merge(entry.fields, source.fields, previous.fields),
      lists: merge(entry.lists, source.lists, previous.lists),
      nested: Object.fromEntries(
        ["programme", "faq"].map((key) => [
          key,
          (source.nested[key] ?? []).map((item, index) => ({
            ...merge(entry.nested[key]?.[index] ?? {}, item, previous.nested[key]?.[index] ?? {}),
            ...(key === "programme" ? { timeLabel: item.timeLabel } : {}),
          })),
        ]),
      ),
    };
  });
}
