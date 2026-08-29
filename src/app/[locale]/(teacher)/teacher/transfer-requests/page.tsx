import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/config/Locales";
import { teacherPreviewData } from "@/data/teacher/TeacherPreviewData";
import { getTeacherCopy } from "@/dictionaries/teacher/Teacher";
import { createTeacherMetadata } from "@/features/teacher/layout/TeacherMetadata";
import { TransferRequestList } from "./TransferRequestList";
type TransferRequestsPageProps = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: TransferRequestsPageProps): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? createTeacherMetadata(locale, "transferRequests") : {};
}
export default async function TransferRequestsPage({ params }: TransferRequestsPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <TransferRequestList
      copy={getTeacherCopy(locale)}
      requests={teacherPreviewData.transferRequests}
    />
  );
}
