import { AdminGroupDetailRoute } from "@/features/admin/groups/AdminGroupDetailRoute";

type PageProps = { params: Promise<{ locale: string; slug: string }> };
export default async function AdminGroupDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  return <AdminGroupDetailRoute locale={locale} slug={slug} />;
}
