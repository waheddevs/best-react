import { AdminWorkspaceDetailRoute } from "@/features/admin/workspace/AdminWorkspaceDetailRoute";
type PageProps = { params: Promise<{ locale: string; studentId: string }> };
export default async function AdminStudentDetailPage({ params }: PageProps) {
  const { locale, studentId } = await params;
  return (
    <AdminWorkspaceDetailRoute
      backHref="/admin/students"
      id={studentId}
      locale={locale}
      sectionKey="students"
    />
  );
}
