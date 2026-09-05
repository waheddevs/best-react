import { AdminWorkspaceRoute } from "@/features/admin/workspace/AdminWorkspaceRoute";
type PageProps = { params: Promise<{ locale: string }> };
export default async function AdminTeachersPage({ params }: PageProps) {
  const { locale } = await params;
  return <AdminWorkspaceRoute locale={locale} sectionKey="teachers" />;
}
