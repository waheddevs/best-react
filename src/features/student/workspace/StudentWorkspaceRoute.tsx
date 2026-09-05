import { notFound } from "next/navigation";

import { isLocale } from "@/config/Locales";
import { getStudentWorkspaceCopy } from "@/dictionaries/student/StudentWorkspace";
import type { StudentWorkspaceSectionKey } from "@/types/student/StudentWorkspace";

import { StudentSectionPage } from "./StudentSectionPage";

type StudentWorkspaceRouteProps = { locale: string; sectionKey: StudentWorkspaceSectionKey };

export function StudentWorkspaceRoute({ locale, sectionKey }: StudentWorkspaceRouteProps) {
  if (!isLocale(locale)) notFound();
  const copy = getStudentWorkspaceCopy(locale);
  return (
    <StudentSectionPage common={copy.common} locale={locale} section={copy.sections[sectionKey]} />
  );
}
