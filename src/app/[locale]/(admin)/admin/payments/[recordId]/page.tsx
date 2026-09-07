import { AdminWorkspaceDetailRoute } from "@/features/admin/workspace/AdminWorkspaceDetailRoute";
type PageProps = { params: Promise<{ locale: string; recordId: string }> };
export default async function AdminPaymentDetailPage({ params }: PageProps) {
  const { locale, recordId } = await params;
  return (
    <AdminWorkspaceDetailRoute
      backHref="/admin/payments"
      id={recordId}
      locale={locale}
      sectionKey="payments"
    />
  );
}
