import type { AdminContentDraft, AdminTranslationDraft } from "@/types/admin/AdminContent";

/** Keep authored translations; update only blank or previously shared fallback text. */
export function courseTranslations(
  draft: AdminContentDraft,
  initial: AdminContentDraft,
  language: string,
  creating: boolean,
): AdminTranslationDraft[] {
  const source = draft.translations.find((item) => item.language === language)!;
  const previous = initial.translations.find((item) => item.language === language)!;
  return draft.translations.map((translation) => {
    if (creating || translation.language === language)
      return { ...source, language: translation.language };
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
      ...translation,
      fields: merge(translation.fields, source.fields, previous.fields),
      lists: merge(translation.lists, source.lists, previous.lists),
      nested: {
        ...translation.nested,
        tracks: (source.nested.tracks ?? []).map((track, index) =>
          merge(
            translation.nested.tracks?.[index] ?? {},
            track,
            previous.nested.tracks?.[index] ?? {},
          ),
        ),
      },
    };
  });
}

export function courseSlug(title: string, suffix: string) {
  const cyrillic: Record<string, string> = {
    а: "a",
    б: "b",
    в: "v",
    г: "g",
    д: "d",
    е: "e",
    ё: "yo",
    ж: "zh",
    з: "z",
    и: "i",
    й: "y",
    к: "k",
    л: "l",
    м: "m",
    н: "n",
    о: "o",
    п: "p",
    р: "r",
    с: "s",
    т: "t",
    у: "u",
    ф: "f",
    х: "kh",
    ц: "ts",
    ч: "ch",
    ш: "sh",
    щ: "shch",
    ъ: "",
    ы: "y",
    ь: "",
    э: "e",
    ю: "yu",
    я: "ya",
    ў: "o",
    қ: "q",
    ғ: "g",
    ҳ: "h",
  };
  const slug = Array.from(title.toLowerCase())
    .map((letter) => cyrillic[letter] ?? letter)
    .join("")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f'’‘ʻʼ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 140)
    .replace(/-$/, "");
  return `${slug || "course"}-${suffix}`;
}
