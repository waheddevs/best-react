import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  getTeacherGroupAssignments,
  getTeacherGroupLessons,
  getTeacherGroupMaterials,
  getTeacherGroupTests,
  getTeacherLesson,
} from "@/data/teacher/TeacherPreviewData";

import { getGroupWorkspaceContext } from "../../GroupWorkspaceRoute";
import { LessonDetail } from "./LessonDetail";

type GroupLessonParams = Promise<{ lessonId: string; locale: string; slug: string }>;
type GroupLessonPageProps = { params: GroupLessonParams };

export function generateStaticParams({ params }: { params: { slug: string } }) {
  return getTeacherGroupLessons(params.slug).map((lesson) => ({ lessonId: lesson.id }));
}

export async function generateMetadata({ params }: GroupLessonPageProps): Promise<Metadata> {
  const { lessonId } = await params;
  const { copy, locale, slug } = await getGroupWorkspaceContext(params);
  const lesson = getTeacherLesson(slug, lessonId);
  if (!lesson) return {};

  return {
    title: `${lesson.topic[locale]} — ${copy.groupWorkspace.tabs.lessons}`,
    description: lesson.objective[locale],
    robots: { follow: false, index: false },
  };
}

export default async function GroupLessonPage({ params }: GroupLessonPageProps) {
  const { lessonId } = await params;
  const { copy, locale, slug } = await getGroupWorkspaceContext(params);
  const lesson = getTeacherLesson(slug, lessonId);
  if (!lesson) notFound();

  const assignments = getTeacherGroupAssignments(slug);
  const materials = getTeacherGroupMaterials(slug);
  const tests = getTeacherGroupTests(slug);

  return (
    <LessonDetail
      assignments={assignments}
      copy={copy}
      lesson={lesson}
      locale={locale}
      materials={materials}
      slug={slug}
      tests={tests}
    />
  );
}
