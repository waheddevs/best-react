import { notFound, redirect } from "next/navigation";

import { isLocale } from "@/config/Locales";

type TasksPageProps = { params: Promise<{ locale: string }> };

export default async function TasksPage({ params }: TasksPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  redirect(`/${locale}/teacher/notifications`);
}
