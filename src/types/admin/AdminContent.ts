import type { AdminContentCatalogQuery, Language } from "@/gql/graphql";
export type AdminContentSection = "courses" | "events" | "exams";
export type AdminCourseEntry = NonNullable<
  AdminContentCatalogQuery["adminCourseCatalog"]
>["nodes"][number];
export type AdminEventEntry = NonNullable<
  AdminContentCatalogQuery["adminEventCatalog"]
>["nodes"][number];
export type AdminExamEntry = NonNullable<
  AdminContentCatalogQuery["adminExamCatalog"]
>["nodes"][number];
export type AdminContentEntry = AdminCourseEntry | AdminEventEntry | AdminExamEntry;
export type AdminTranslationDraft = {
  language: Language;
  fields: Record<string, string>;
  lists: Record<string, string>;
  nested: Record<string, Record<string, string>[]>;
};
export type AdminContentDraft = {
  fields: Record<string, string>;
  translations: AdminTranslationDraft[];
};
