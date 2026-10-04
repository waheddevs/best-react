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
import { TeacherSpeakingEditor } from "./TeacherSpeakingEditor";

type TeacherSpeakingPageProps = { params: TeacherPracticeParams };

export async function generateMetadata({ params }: TeacherSpeakingPageProps): Promise<Metadata> {
  const { locale, practiceNumber } = await params;
  const number = parsePracticeNumber(practiceNumber);
  if (number === null || !isLocale(locale)) return {};
  return {
    title: `Speaking · Practice test ${String(number)}`,
    robots: { follow: false, index: false },
  };
}

export default async function TeacherSpeakingPage({ params }: TeacherSpeakingPageProps) {
  const context = await getTeacherPracticeContext(params);
  if (!context.connected) {
    return (
      <TeacherPracticeSkillPage
        locale={context.locale}
        practiceHref={context.practiceHref}
        practiceNumber={context.practiceNumber}
        skill="speaking"
      />
    );
  }
  const speaking = context.connectedPaper?.skills.find(({ skill }) => skill === "SPEAKING");
  if (!speaking) notFound();
  const version = await loadConnectedTeacherTestAuthoringVersion(
    context.locale,
    speaking.testVersionId,
  );
  if (version.sections.length !== 3) notFound();
  return (
    <TeacherSpeakingEditor
      initialVersion={version}
      locale={context.locale}
      practiceHref={context.practiceHref}
      practiceNumber={context.practiceNumber}
    />
  );
}
