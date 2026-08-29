import type { Locale } from "@/config/Locales";
import type { TeacherCopy, TeacherProfileData } from "@/types/teacher/Teacher";

import { TeacherSettings } from "./TeacherSettings";

type TeacherProfileProps = { copy: TeacherCopy; locale: Locale; profile: TeacherProfileData };

export function TeacherProfile(props: TeacherProfileProps) {
  return <TeacherSettings {...props} />;
}
