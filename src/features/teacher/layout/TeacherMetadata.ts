import type { Metadata } from "next";

import type { Locale } from "@/config/Locales";
import type { TeacherNavigationKey } from "@/types/teacher/Teacher";
import { getTeacherCopy } from "@/dictionaries/teacher/Teacher";

export function createTeacherMetadata(locale: Locale, key: TeacherNavigationKey): Metadata {
  const metadata = getTeacherCopy(locale).metadata[key];

  return {
    title: metadata.title,
    description: metadata.description,
    robots: { follow: false, index: false },
  };
}
