import type { Metadata } from "next";

import type { Locale } from "@/config/Locales";
import { getStudentWorkspaceCopy } from "@/dictionaries/student/StudentWorkspace";
import type { StudentWorkspaceSectionKey } from "@/types/student/StudentWorkspace";

export function createStudentMetadata(locale: Locale, key: StudentWorkspaceSectionKey): Metadata {
  const section = getStudentWorkspaceCopy(locale).sections[key];
  return {
    description: section.description,
    robots: { follow: false, index: false },
    title: section.title,
  };
}
