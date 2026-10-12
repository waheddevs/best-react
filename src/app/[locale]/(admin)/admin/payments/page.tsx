import { notFound, redirect } from "next/navigation";
import { auth } from "@/Auth";
import { isLocale } from "@/config/Locales";
import { AdminPayments } from "./AdminPayments";
type PageProps = { params: Promise<{ locale: string }> };
export default async function AdminPaymentsPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const session = await auth();
  if (session?.bestApi?.role !== "ADMIN" || !session.bestApi.accessToken)
    redirect(`/${locale}/login?role=admin`);
  return <AdminPayments locale={locale} />;
}
