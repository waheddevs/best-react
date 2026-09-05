import { AdminWorkspaceRoute } from "@/features/admin/workspace/AdminWorkspaceRoute";
type PageProps = { params: Promise<{ locale: string }> };
export default async function AdminCoursesPage({ params }: PageProps) {
  const { locale } = await params;
  return <AdminWorkspaceRoute locale={locale} sectionKey="courses" />;
}
