import type { Locale } from "@/config/Locales";
import { TeacherGroupRoster } from "@/features/teacher/groups/TeacherGroupRoster";
import type {
  TeacherCopy,
  TeacherGroupRosterSummary,
  TeacherLearner,
} from "@/types/teacher/Teacher";

type GroupStudentListProps = {
  connected: boolean;
  copy: TeacherCopy;
  coursePriceUzs: number | null;
  groupId: string;
  groupName: string;
  initialLearners: TeacherLearner[];
  initialSummary?: TeacherGroupRosterSummary;
  locale: Locale;
};

export function GroupStudentList({
  connected,
  copy,
  coursePriceUzs,
  groupId,
  groupName,
  initialLearners,
  initialSummary,
  locale,
}: GroupStudentListProps) {
  return (
    <TeacherGroupRoster
      connected={connected}
      copy={copy}
      coursePriceUzs={coursePriceUzs}
      groupId={groupId}
      groupName={groupName}
      initialLearners={initialLearners}
      initialSummary={initialSummary}
      locale={locale}
    />
  );
}
