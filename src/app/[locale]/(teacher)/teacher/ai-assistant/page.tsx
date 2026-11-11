import { notFound } from "next/navigation";
import { isLocale } from "@/config/Locales";
import { TeacherAiWorkspace } from "@/features/teacher/ai/TeacherAiWorkspace";
import { createTeacherMetadata } from "@/features/teacher/layout/TeacherMetadata";

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return createTeacherMetadata(locale, "aiAssistant");
}
export default async function TeacherAiPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <TeacherAiWorkspace />;
}
