import type { Locale } from "@/config/Locales";
import { TeacherGroupRoster } from "@/features/teacher/groups/TeacherGroupRoster";
import type { TeacherCopy, TeacherLearner } from "@/types/teacher/Teacher";

type GroupStudentListProps = {
  copy: TeacherCopy;
  initialLearners: TeacherLearner[];
  locale: Locale;
};

export function GroupStudentList({ copy, initialLearners, locale }: GroupStudentListProps) {
  return <TeacherGroupRoster copy={copy} initialLearners={initialLearners} locale={locale} />;
}
