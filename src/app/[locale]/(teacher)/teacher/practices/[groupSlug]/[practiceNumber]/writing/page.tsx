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
import { TeacherWritingEditor } from "./TeacherWritingEditor";

type TeacherWritingPageProps = { params: TeacherPracticeParams };

export async function generateMetadata({ params }: TeacherWritingPageProps): Promise<Metadata> {
  const { locale, practiceNumber } = await params;
  const number = parsePracticeNumber(practiceNumber);
  if (number === null || !isLocale(locale)) return {};
  return {
    title: `Writing · Practice test ${String(number)}`,
    robots: { follow: false, index: false },
  };
}

export default async function TeacherWritingPage({ params }: TeacherWritingPageProps) {
  const context = await getTeacherPracticeContext(params);
  if (context.connected) {
    const writing = context.connectedPaper?.skills.find(({ skill }) => skill === "WRITING");
    if (!writing) notFound();
    const version = await loadConnectedTeacherTestAuthoringVersion(
      context.locale,
      writing.testVersionId,
    );
    if (version.sections.length !== 2) notFound();
    return (
      <TeacherWritingEditor
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
      skill="writing"
    />
  );
}
