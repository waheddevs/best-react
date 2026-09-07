import { AdminWorkspaceDetailRoute } from "@/features/admin/workspace/AdminWorkspaceDetailRoute";
type PageProps = { params: Promise<{ locale: string; resourceId: string }> };
export default async function AdminLibraryDetailPage({ params }: PageProps) {
  const { locale, resourceId } = await params;
  return (
    <AdminWorkspaceDetailRoute
      backHref="/admin/library"
      id={resourceId}
      locale={locale}
      sectionKey="library"
    />
  );
}
