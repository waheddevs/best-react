import { notFound } from "next/navigation";

import { isLocale } from "@/config/Locales";
import { getStudentWorkspaceCopy } from "@/dictionaries/student/StudentWorkspace";
import type { StudentWorkspaceSectionKey } from "@/types/student/StudentWorkspace";

import { StudentDetailPage } from "./StudentDetailPage";

type StudentWorkspaceDetailRouteProps = {
  backHref: string;
  id: string;
  locale: string;
  sectionKey: StudentWorkspaceSectionKey;
};

export function StudentWorkspaceDetailRoute({
  backHref,
  id,
  locale,
  sectionKey,
}: StudentWorkspaceDetailRouteProps) {
  if (!isLocale(locale)) notFound();
  const copy = getStudentWorkspaceCopy(locale);
  const record = copy.sections[sectionKey].records.find((item) => item.id === id);
  if (!record) notFound();
  return (
    <StudentDetailPage backHref={backHref} common={copy.common} locale={locale} record={record} />
  );
}
