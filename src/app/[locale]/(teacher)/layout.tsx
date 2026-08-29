import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { isLocale } from "@/config/Locales";
import { teacherPreviewData } from "@/data/teacher/TeacherPreviewData";
import { getTeacherCopy } from "@/dictionaries/teacher/Teacher";
import { TeacherWorkspaceShell } from "@/features/teacher/layout/TeacherWorkspaceShell";

export const metadata: Metadata = {
  robots: { follow: false, index: false },
};

type TeacherLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function TeacherLayout({ children, params }: TeacherLayoutProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <TeacherWorkspaceShell
      copy={getTeacherCopy(locale)}
      locale={locale}
      notifications={teacherPreviewData.notifications}
      profile={teacherPreviewData.profile}
    >
      {children}
    </TeacherWorkspaceShell>
  );
}
