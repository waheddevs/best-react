import { AdminWorkspaceDetailRoute } from "@/features/admin/workspace/AdminWorkspaceDetailRoute";
type PageProps = { params: Promise<{ locale: string; slug: string }> };
export default async function AdminGroupDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  return (
    <AdminWorkspaceDetailRoute
      backHref="/admin/groups"
      id={slug}
      locale={locale}
      sectionKey="groups"
    />
  );
}
