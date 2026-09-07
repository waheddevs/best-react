import { AdminWorkspaceRoute } from "@/features/admin/workspace/AdminWorkspaceRoute";
type PageProps = { params: Promise<{ locale: string }> };
export default async function AdminSchedulePage({ params }: PageProps) {
  const { locale } = await params;
  return <AdminWorkspaceRoute locale={locale} sectionKey="schedule" />;
}
