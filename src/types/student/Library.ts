import type { Locale } from "@/config/Locales";
import type { LocalizedText } from "@/types/PublicContent";

export type LibraryResourceType = "guide" | "checklist" | "article";

export type LibraryResource = {
  slug: string;
  type: LibraryResourceType;
  title: LocalizedText;
  summary: LocalizedText;
  typeLabel: LocalizedText;
  readingTime: LocalizedText;
  sections: Record<Locale, Array<{ heading: string; body: string }>>;
};
