import { AdminRegistryRoute } from "@/features/admin/operations/AdminRegistryRoute";
type PageProps = { params: Promise<{ locale: string }> };
export default async function AdminGroupsPage({ params }: PageProps) {
  const { locale } = await params;
  return <AdminRegistryRoute locale={locale} section="groups" />;
}
