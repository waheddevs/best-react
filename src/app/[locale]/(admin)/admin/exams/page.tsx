import type { Metadata } from "next";
import { isLocale } from "@/config/Locales";
import { createAdminMetadata } from "@/features/admin/layout/AdminMetadata";
import { AdminContentRoute } from "@/features/admin/content/AdminContentRoute";
type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? createAdminMetadata(locale, "exams") : {};
}
export default async function Page({ params }: Props) {
  const { locale } = await params;
  return <AdminContentRoute locale={locale} section="exams" />;
}
