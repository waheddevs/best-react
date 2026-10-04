import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isLocale } from "@/config/Locales";
import { loadConnectedTeacherTestAuthoringVersion } from "@/lib/teacher/TeacherGroupData";

import {
  getTeacherPracticeContext,
  parsePracticeNumber,
  type TeacherPracticeParams,
} from "../../TeacherPracticeRoute";
import { TeacherListeningPartTwoEditor } from "../TeacherListeningPartTwoEditor";

type TeacherListeningPartTwoPageProps = { params: TeacherPracticeParams };

export async function generateMetadata({
  params,
}: TeacherListeningPartTwoPageProps): Promise<Metadata> {
  const { locale, practiceNumber } = await params;
  const number = parsePracticeNumber(practiceNumber);
  if (number === null || !isLocale(locale)) return {};
  return {
    title: `Listening Part 2 · Practice test ${String(number)}`,
    robots: { follow: false, index: false },
  };
}

export default async function TeacherListeningPartTwoPage({
  params,
}: TeacherListeningPartTwoPageProps) {
  const context = await getTeacherPracticeContext(params);
  if (!context.connected) notFound();
  const listening = context.connectedPaper?.skills.find(({ skill }) => skill === "LISTENING");
  if (!listening) notFound();
  const version = await loadConnectedTeacherTestAuthoringVersion(
    context.locale,
    listening.testVersionId,
  );
  if (!version.sections.some(({ position }) => position === 2)) notFound();

  return (
    <TeacherListeningPartTwoEditor
      initialVersion={version}
      locale={context.locale}
      practiceHref={context.practiceHref}
      practiceNumber={context.practiceNumber}
    />
  );
}
