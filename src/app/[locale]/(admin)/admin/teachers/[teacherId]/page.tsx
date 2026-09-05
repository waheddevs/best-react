import { AdminWorkspaceDetailRoute } from "@/features/admin/workspace/AdminWorkspaceDetailRoute";
type PageProps = { params: Promise<{ locale: string; teacherId: string }> };
export default async function AdminTeacherDetailPage({ params }: PageProps) {
  const { locale, teacherId } = await params;
  return (
    <AdminWorkspaceDetailRoute
      backHref="/admin/teachers"
      id={teacherId}
      locale={locale}
      sectionKey="teachers"
    />
  );
}
