import { notFound, redirect } from "next/navigation";
import { auth } from "@/Auth";
import { isLocale } from "@/config/Locales";
import { AdminSalary } from "./AdminSalary";
type PageProps = { params: Promise<{ locale: string }> };
export default async function AdminSalaryPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const session = await auth();
  if (session?.bestApi?.role !== "ADMIN" || !session.bestApi.accessToken)
    redirect(`/${locale}/login?role=admin`);
  const currentMonth = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Tashkent",
    year: "numeric",
    month: "2-digit",
  }).format(new Date());
  return <AdminSalary locale={locale} currentMonth={currentMonth} />;
}
