import "server-only";

import { notFound } from "next/navigation";

import { teacherPracticePreviewItems } from "@/data/teacher/TeacherPracticePreview";
import { loadConnectedTeacherPractice } from "@/lib/teacher/TeacherGroupData";

import { getGroupWorkspaceContext } from "../../../groups/[slug]/GroupWorkspaceRoute";

export type TeacherPracticeParams = Promise<{
  groupSlug: string;
  locale: string;
  practiceNumber: string;
}>;

export function parsePracticeNumber(value: string) {
  if (!/^\d+$/.test(value)) return null;
  const number = Number(value);
  return Number.isSafeInteger(number) && number > 0 ? number : null;
}

export async function getTeacherPracticeContext(params: TeacherPracticeParams) {
  const { groupSlug, locale: localeParam, practiceNumber: practiceNumberParam } = await params;
  const practiceNumber = parsePracticeNumber(practiceNumberParam);
  if (practiceNumber === null) notFound();

  const context = await getGroupWorkspaceContext(
    Promise.resolve({ locale: localeParam, slug: groupSlug }),
  );
  const connectedPaper = context.connected
    ? await loadConnectedTeacherPractice(context.locale, context.group.id, practiceNumber)
    : null;
  const previewPractice = context.connected
    ? null
    : teacherPracticePreviewItems.find((item) => item.practiceNumber === practiceNumber);
  if (context.connected ? connectedPaper === null : previewPractice === undefined) notFound();

  return {
    ...context,
    connectedPaper,
    practiceHref: `/${context.locale}/teacher/practices/${groupSlug}/${String(practiceNumber)}`,
    practiceNumber,
  };
}
