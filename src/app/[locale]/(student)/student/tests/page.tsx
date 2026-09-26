import { notFound } from "next/navigation";

import { isLocale } from "@/config/Locales";
import { getStudentTestsCopy } from "@/dictionaries/student/StudentTests";
import { getStudentTestPapers } from "@/lib/student/StudentTestData";

import { StudentTestCatalog } from "./StudentTestCatalog";

type PageProps = { params: Promise<{ locale: string }> };

export default async function StudentTestsPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <StudentTestCatalog
      copy={getStudentTestsCopy(locale)}
      locale={locale}
      papers={await getStudentTestPapers(locale)}
    />
  );
}
