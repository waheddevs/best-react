import { notFound } from "next/navigation";

import { isLocale } from "@/config/Locales";
import { getStudentPaymentsCopy } from "@/dictionaries/student/StudentPayments";

import { StudentPaymentsContent } from "./StudentPaymentsContent";

type PageProps = { params: Promise<{ locale: string }> };
export default async function StudentPaymentsPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return <StudentPaymentsContent copy={getStudentPaymentsCopy(locale)} locale={locale} />;
}
