import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isLocale } from "@/config/Locales";
import { loadConnectedTeacherTestAuthoringVersion } from "@/lib/teacher/TeacherGroupData";

import {
  getTeacherPracticeContext,
  parsePracticeNumber,
  type TeacherPracticeParams,
} from "../../TeacherPracticeRoute";
import { TeacherListeningPartThreeEditor } from "../TeacherListeningPartThreeEditor";

type TeacherListeningPartThreePageProps = { params: TeacherPracticeParams };

export async function generateMetadata({
  params,
}: TeacherListeningPartThreePageProps): Promise<Metadata> {
  const { locale, practiceNumber } = await params;
  const number = parsePracticeNumber(practiceNumber);
  if (number === null || !isLocale(locale)) return {};
  return {
    title: `Listening Part 3 · Practice test ${String(number)}`,
    robots: { follow: false, index: false },
  };
}

export default async function TeacherListeningPartThreePage({
  params,
}: TeacherListeningPartThreePageProps) {
  const context = await getTeacherPracticeContext(params);
  if (!context.connected) notFound();
  const listening = context.connectedPaper?.skills.find(({ skill }) => skill === "LISTENING");
  if (!listening) notFound();
  const version = await loadConnectedTeacherTestAuthoringVersion(
    context.locale,
    listening.testVersionId,
  );
  if (!version.sections.some(({ position }) => position === 3)) notFound();

  return (
    <TeacherListeningPartThreeEditor
      initialVersion={version}
      locale={context.locale}
      practiceHref={context.practiceHref}
      practiceNumber={context.practiceNumber}
    />
  );
}
