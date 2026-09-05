import { StudentWorkspaceDetailRoute } from "@/features/student/workspace/StudentWorkspaceDetailRoute";
type PageProps = { params: Promise<{ assignmentId: string; locale: string }> };
export default async function StudentAssignmentDetailPage({ params }: PageProps) {
  const { assignmentId, locale } = await params;
  return (
    <StudentWorkspaceDetailRoute
      backHref="/student/assignments"
      id={assignmentId}
      locale={locale}
      sectionKey="assignments"
    />
  );
}
