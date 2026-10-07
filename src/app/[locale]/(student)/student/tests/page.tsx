import { notFound } from "next/navigation";

import { isLocale } from "@/config/Locales";
import { getStudentTestsCopy } from "@/dictionaries/student/StudentTests";
import { getStudentTestPapers } from "@/lib/student/StudentTestData";

import { StudentTestCatalog } from "./StudentTestCatalog";

type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string | string[] }>;
};

export default async function StudentTestsPage({ params, searchParams }: PageProps) {
  const [{ locale }, { page }] = await Promise.all([params, searchParams]);
  if (!isLocale(locale)) notFound();
  const requestedPage =
    typeof page === "string" && /^[1-9]\d*$/.test(page) && Number.isSafeInteger(Number(page))
      ? Number(page)
      : 1;

  return (
    <StudentTestCatalog
      copy={getStudentTestsCopy(locale)}
      locale={locale}
      papers={await getStudentTestPapers(locale)}
      requestedPage={requestedPage}
    />
  );
}
