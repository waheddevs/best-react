import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { teacherPracticePreviewItems } from "@/data/teacher/TeacherPracticePreview";
import { loadConnectedTeacherGroupTestPapers } from "@/lib/teacher/TeacherGroupData";

import {
  createGroupWorkspaceMetadata,
  getGroupWorkspaceContext,
  type GroupWorkspaceParams,
} from "../GroupWorkspaceRoute";
import { TeacherPracticeCatalog } from "./TeacherPracticeCatalog";

const practicesPerPage = 16;

type GroupTestsPageProps = {
  params: GroupWorkspaceParams;
  searchParams: Promise<{ page?: string | string[] }>;
};

function requestedPage(value: string | string[] | undefined) {
  const parsed = Number(Array.isArray(value) ? value[0] : value);
  return Number.isSafeInteger(parsed) && parsed > 0 ? parsed : 1;
}

export function generateMetadata({ params }: GroupTestsPageProps): Promise<Metadata> {
  return createGroupWorkspaceMetadata(params, "tests");
}

export default async function GroupTestsPage({ params, searchParams }: GroupTestsPageProps) {
  const [{ connected, copy, group, locale, slug }, query] = await Promise.all([
    getGroupWorkspaceContext(params),
    searchParams,
  ]);
  const page = requestedPage(query.page);
  const connectedPapers = connected
    ? await loadConnectedTeacherGroupTestPapers(locale, group.id, page)
    : null;
  const previewPractices = group.category === "ielts" ? teacherPracticePreviewItems : [];

  const totalPages = connectedPapers
    ? Math.max(1, connectedPapers.pageInfo.totalPages)
    : Math.max(1, Math.ceil(previewPractices.length / practicesPerPage));

  if (page > totalPages) {
    redirect(`/${locale}/teacher/groups/${slug}/tests?page=${totalPages}`);
  }

  const currentPage = connectedPapers
    ? Math.min(Math.max(1, connectedPapers.pageInfo.currentPage), totalPages)
    : page;
  const start = (currentPage - 1) * practicesPerPage;
  const practices = connectedPapers
    ? connectedPapers.items.map(
        ({ completedStudentCount, createdAt, id, practiceNumber, skills }) => ({
          completedStudentCount,
          createdAt,
          id,
          practiceNumber,
          readySkillCount: skills.filter(({ status }) => status === "PUBLISHED").length,
        }),
      )
    : previewPractices.slice(start, start + practicesPerPage);
  const totalItems = connectedPapers
    ? connectedPapers.pageInfo.totalItems
    : previewPractices.length;

  return (
    <TeacherPracticeCatalog
      copy={copy}
      connected={connected}
      currentPage={currentPage}
      groupId={group.id}
      items={practices}
      locale={locale}
      pathname={`/${locale}/teacher/groups/${slug}/tests`}
      practicePathname={`/${locale}/teacher/practices/${slug}`}
      totalStudentCount={group.learnerCount}
      totalItems={totalItems}
      totalPages={totalPages}
    />
  );
}
