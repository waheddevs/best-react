import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/config/Locales";
import { teacherPreviewData } from "@/data/teacher/TeacherPreviewData";
import { getTeacherCopy } from "@/dictionaries/teacher/Teacher";
import { createTeacherMetadata } from "@/features/teacher/layout/TeacherMetadata";
import { ReceptionSchedule } from "./ReceptionSchedule";
type ReceptionPageProps = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: ReceptionPageProps): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? createTeacherMetadata(locale, "reception") : {};
}
export default async function ReceptionPage({ params }: ReceptionPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <ReceptionSchedule copy={getTeacherCopy(locale)} schedule={teacherPreviewData.schedule} />;
}
