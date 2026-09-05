import { StudentWorkspaceDetailRoute } from "@/features/student/workspace/StudentWorkspaceDetailRoute";
type PageProps = { params: Promise<{ locale: string; slug: string }> };
export default async function StudentCourseDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  return (
    <StudentWorkspaceDetailRoute
      backHref="/student/courses"
      id={slug}
      locale={locale}
      sectionKey="courses"
    />
  );
}
