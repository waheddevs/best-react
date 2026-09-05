import { StudentWorkspaceRoute } from "@/features/student/workspace/StudentWorkspaceRoute";
type PageProps = { params: Promise<{ locale: string }> };
export default async function StudentSchedulePage({ params }: PageProps) {
  const { locale } = await params;
  return <StudentWorkspaceRoute locale={locale} sectionKey="schedule" />;
}
