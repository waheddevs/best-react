import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isLocale } from "@/config/Locales";
import { loadConnectedTeacherTestAuthoringVersion } from "@/lib/teacher/TeacherGroupData";

import {
  getTeacherPracticeContext,
  parsePracticeNumber,
  type TeacherPracticeParams,
} from "../TeacherPracticeRoute";
import { TeacherPracticeSkillPage } from "../TeacherPracticeSkillPage";
import { TeacherListeningPartOneEditor } from "./TeacherListeningPartOneEditor";

type TeacherListeningPageProps = { params: TeacherPracticeParams };

export async function generateMetadata({ params }: TeacherListeningPageProps): Promise<Metadata> {
  const { locale, practiceNumber } = await params;
  const number = parsePracticeNumber(practiceNumber);
  if (number === null || !isLocale(locale)) return {};
  return {
    title: `Listening · Practice test ${String(number)}`,
    robots: { follow: false, index: false },
  };
}

export default async function TeacherListeningPage({ params }: TeacherListeningPageProps) {
  const context = await getTeacherPracticeContext(params);
  if (context.connected && context.practiceNumber === 1) {
    const listening = context.connectedPaper?.skills.find(
      ({ skill }) => skill === "LISTENING",
    );
    if (!listening) notFound();
    const version = await loadConnectedTeacherTestAuthoringVersion(
      context.locale,
      listening.testVersionId,
    );
    return (
      <TeacherListeningPartOneEditor
        initialVersion={version}
        locale={context.locale}
        practiceHref={context.practiceHref}
        practiceNumber={context.practiceNumber}
      />
    );
  }
  return (
    <TeacherPracticeSkillPage
      locale={context.locale}
      practiceHref={context.practiceHref}
      practiceNumber={context.practiceNumber}
      skill="listening"
    />
  );
}
