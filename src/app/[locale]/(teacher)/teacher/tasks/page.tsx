import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isLocale } from "@/config/Locales";
import { teacherPreviewData } from "@/data/teacher/TeacherPreviewData";
import { getTeacherCopy } from "@/dictionaries/teacher/Teacher";
import { createTeacherMetadata } from "@/features/teacher/layout/TeacherMetadata";
import { isDashboardPreviewEnabled } from "@/lib/DashboardAccess";
import { loadConnectedTeacherTasks } from "@/lib/teacher/TeacherWorkspaceData";

import { TeacherConnectedTasks } from "./TeacherConnectedTasks";
import { TeacherTaskList } from "./TeacherTaskList";

type TasksPageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: TasksPageProps): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? createTeacherMetadata(locale, "tasks") : {};
}

export default async function TasksPage({ params }: TasksPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  if (!isDashboardPreviewEnabled()) {
    const tasks = await loadConnectedTeacherTasks().catch(() => null);
    return <TeacherConnectedTasks copy={getTeacherCopy(locale)} locale={locale} tasks={tasks} />;
  }
  return (
    <TeacherTaskList
      copy={getTeacherCopy(locale)}
      locale={locale}
      tasks={teacherPreviewData.tasks}
    />
  );
}
