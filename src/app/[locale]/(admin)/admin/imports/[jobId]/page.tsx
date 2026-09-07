import { AdminWorkspaceDetailRoute } from "@/features/admin/workspace/AdminWorkspaceDetailRoute";
type PageProps = { params: Promise<{ jobId: string; locale: string }> };
export default async function AdminImportDetailPage({ params }: PageProps) {
  const { jobId, locale } = await params;
  return (
    <AdminWorkspaceDetailRoute
      backHref="/admin/imports"
      id={jobId}
      locale={locale}
      sectionKey="imports"
    />
  );
}
