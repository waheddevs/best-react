import { notFound } from "next/navigation";

import { isLocale } from "@/config/Locales";
import { getStudentHeroCopy } from "@/dictionaries/student/StudentHero";
import { getStudentWorkspaceCopy } from "@/dictionaries/student/StudentWorkspace";
import { getStudentNextClass } from "@/lib/student/StudentNextClass";
import type { StudentWorkspaceSectionKey } from "@/types/student/StudentWorkspace";

import { StudentSectionPage } from "./StudentSectionPage";

type StudentWorkspaceRouteProps = { locale: string; sectionKey: StudentWorkspaceSectionKey };

export function StudentWorkspaceRoute({ locale, sectionKey }: StudentWorkspaceRouteProps) {
  if (!isLocale(locale)) notFound();
  const copy = getStudentWorkspaceCopy(locale);
  const section = copy.sections[sectionKey];
  const nextClass = sectionKey === "schedule" ? getStudentNextClass(section.records, locale) : null;
  return (
    <StudentSectionPage
      common={copy.common}
      heroKind={sectionKey}
      heroLabel={
        nextClass ? `${getStudentHeroCopy(locale).labels.schedule} · ${nextClass.day}` : undefined
      }
      heroValue={sectionKey === "schedule" ? (nextClass?.time ?? "—") : undefined}
      locale={locale}
      section={section}
    />
  );
}
