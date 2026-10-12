import { notFound, redirect } from "next/navigation";
import { auth } from "@/Auth";
import { isLocale } from "@/config/Locales";
import { adminScheduleDate } from "@/lib/admin/AdminSchedule";
import { AdminSchedule } from "./AdminSchedule";
type PageProps = { params: Promise<{ locale: string }> };
export default async function AdminSchedulePage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const session = await auth();
  if (session?.bestApi?.role !== "ADMIN" || !session.bestApi.accessToken)
    redirect(`/${locale}/login?role=admin`);
  return <AdminSchedule locale={locale} initialDate={adminScheduleDate(new Date())} />;
}
