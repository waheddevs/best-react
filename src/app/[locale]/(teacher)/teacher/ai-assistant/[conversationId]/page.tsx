import { notFound } from "next/navigation";
import { isLocale } from "@/config/Locales";
import { TeacherAiWorkspace } from "@/features/teacher/ai/TeacherAiWorkspace";
import { createTeacherMetadata } from "@/features/teacher/layout/TeacherMetadata";

type Props = { params: Promise<{ locale: string; conversationId: string }> };
export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return createTeacherMetadata(locale, "aiAssistant");
}
export default async function TeacherAiConversationPage({ params }: Props) {
  const { locale, conversationId } = await params;
  if (
    !isLocale(locale) ||
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      conversationId,
    )
  )
    notFound();
  return <TeacherAiWorkspace />;
}
