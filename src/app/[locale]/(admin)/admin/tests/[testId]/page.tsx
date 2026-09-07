import { AdminWorkspaceDetailRoute } from "@/features/admin/workspace/AdminWorkspaceDetailRoute";
type PageProps = { params: Promise<{ locale: string; testId: string }> };
export default async function AdminTestDetailPage({ params }: PageProps) {
  const { locale, testId } = await params;
  return (
    <AdminWorkspaceDetailRoute
      backHref="/admin/tests"
      id={testId}
      locale={locale}
      sectionKey="tests"
    />
  );
}
