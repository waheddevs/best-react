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
  initialLearners: TeacherLearner[];
  initialSummary?: TeacherGroupRosterSummary;
  locale: Locale;
};

export function GroupStudentList({
  connected,
  copy,
  initialLearners,
  initialSummary,
  locale,
}: GroupStudentListProps) {
  const rosterVersion = initialLearners
    .map((learner) => `${learner.membershipId}:${learner.status}:${learner.balance}`)
    .join("|");

  return (
    <TeacherGroupRoster
      connected={connected}
      copy={copy}
      initialLearners={initialLearners}
      initialSummary={initialSummary}
      key={rosterVersion}
      locale={locale}
    />
  );
}
