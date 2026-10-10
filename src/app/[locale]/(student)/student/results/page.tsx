import { notFound } from "next/navigation";

import { isLocale } from "@/config/Locales";
import { getStudentResults, getStudentTestPapers } from "@/lib/student/StudentTestData";
import { buildStudentResultRows } from "@/lib/student/StudentResultsTable";

import { StudentResultsList } from "./StudentResultsList";

type PageProps = { params: Promise<{ locale: string }> };

export default async function StudentResultsPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const [results, papers] = await Promise.all([
    getStudentResults(locale),
    getStudentTestPapers(locale),
  ]);
  return <StudentResultsList locale={locale} rows={buildStudentResultRows(papers, results)} />;
}
