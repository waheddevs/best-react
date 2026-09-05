import { StudentWorkspaceDetailRoute } from "@/features/student/workspace/StudentWorkspaceDetailRoute";
type PageProps = { params: Promise<{ attemptId: string; locale: string }> };
export default async function StudentResultDetailPage({ params }: PageProps) {
  const { attemptId, locale } = await params;
  return (
    <StudentWorkspaceDetailRoute
      backHref="/student/results"
      id={attemptId}
      locale={locale}
      sectionKey="results"
    />
  );
}
