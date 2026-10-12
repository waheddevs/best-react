import { notFound, redirect } from "next/navigation";
import { auth } from "@/Auth";
import { isLocale } from "@/config/Locales";
import { AdminPublicContentDetail } from "@/features/admin/content/AdminPublicContentDetail";
type Props = { params: Promise<{ locale: string; slug: string }> };
export default async function Page({ params }: Props) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const session = await auth();
  if (session?.bestApi?.role !== "ADMIN" || !session.bestApi.accessToken)
    redirect(`/${locale}/login?role=admin`);
  return <AdminPublicContentDetail locale={locale} slug={slug} section="courses" />;
}
