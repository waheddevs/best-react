import type { Metadata } from "next";
import { isLocale } from "@/config/Locales";
import { createStudentMetadata } from "@/features/student/layout/StudentMetadata";
import { StudentWorkspaceRoute } from "@/features/student/workspace/StudentWorkspaceRoute";
type PageProps = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? createStudentMetadata(locale, "courses") : {};
}
export default async function StudentCoursesPage({ params }: PageProps) {
  const { locale } = await params;
  return <StudentWorkspaceRoute locale={locale} sectionKey="courses" />;
}
