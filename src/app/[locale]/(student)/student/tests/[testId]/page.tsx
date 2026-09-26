import { notFound } from "next/navigation";

import { isLocale } from "@/config/Locales";
import { getStudentTestsCopy } from "@/dictionaries/student/StudentTests";
import { getStudentTestPaper } from "@/lib/student/StudentTestData";

import { StudentTestOverview } from "./StudentTestOverview";

type PageProps = { params: Promise<{ locale: string; testId: string }> };
export default async function StudentTestDetailPage({ params }: PageProps) {
  const { locale, testId } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <StudentTestOverview
      copy={getStudentTestsCopy(locale)}
      locale={locale}
      paper={await getStudentTestPaper(locale, testId)}
    />
  );
}
