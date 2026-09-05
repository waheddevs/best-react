import { StudentWorkspaceRoute } from "@/features/student/workspace/StudentWorkspaceRoute";
type PageProps = { params: Promise<{ locale: string }> };
export default async function StudentTestsPage({ params }: PageProps) {
  const { locale } = await params;
  return <StudentWorkspaceRoute locale={locale} sectionKey="tests" />;
}
