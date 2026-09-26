import { notFound } from "next/navigation";

import { isLocale } from "@/config/Locales";
import { getStudentResults } from "@/lib/student/StudentTestData";

import { StudentResultsList } from "./StudentResultsList";

type PageProps = { params: Promise<{ locale: string }> };

export default async function StudentResultsPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const results = await getStudentResults(locale);
  return <StudentResultsList locale={locale} results={results} />;
}
