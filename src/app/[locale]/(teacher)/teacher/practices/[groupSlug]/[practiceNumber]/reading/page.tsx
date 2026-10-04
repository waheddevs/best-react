import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isLocale } from "@/config/Locales";
import { loadConnectedTeacherTestAuthoringVersion } from "@/lib/teacher/TeacherGroupData";

import {
  getTeacherPracticeContext,
  parsePracticeNumber,
  type TeacherPracticeParams,
} from "../TeacherPracticeRoute";
import { TeacherReadingEditor } from "./TeacherReadingEditor";

type TeacherReadingPageProps = { params: TeacherPracticeParams };

export async function generateMetadata({ params }: TeacherReadingPageProps): Promise<Metadata> {
  const { locale, practiceNumber } = await params;
  const number = parsePracticeNumber(practiceNumber);
  if (number === null || !isLocale(locale)) return {};
  return {
    title: `Reading · Practice test ${String(number)}`,
    robots: { follow: false, index: false },
  };
}

export default async function TeacherReadingPage({ params }: TeacherReadingPageProps) {
  const context = await getTeacherPracticeContext(params);
  if (!context.connected) notFound();
  const reading = context.connectedPaper?.skills.find(({ skill }) => skill === "READING");
  if (!reading) notFound();
  const version = await loadConnectedTeacherTestAuthoringVersion(
    context.locale,
    reading.testVersionId,
  );
  if (version.sections.length !== 3) notFound();
  return (
    <TeacherReadingEditor
      initialVersion={version}
      locale={context.locale}
      practiceHref={context.practiceHref}
      practiceNumber={context.practiceNumber}
    />
  );
}
