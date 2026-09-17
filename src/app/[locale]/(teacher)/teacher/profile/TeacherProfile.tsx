import type { Locale } from "@/config/Locales";
import type { TeacherCopy } from "@/types/teacher/Teacher";
import type { TeacherProfileRecord } from "@/types/teacher/TeacherProfile";

import { TeacherSettings } from "./TeacherSettings";

type TeacherProfileProps = {
  connected: boolean;
  copy: TeacherCopy;
  locale: Locale;
  profile: TeacherProfileRecord;
};

export function TeacherProfile(props: TeacherProfileProps) {
  return <TeacherSettings {...props} />;
}
