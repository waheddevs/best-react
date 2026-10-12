import { notFound, redirect } from "next/navigation";
import { auth } from "@/Auth";
import { isLocale } from "@/config/Locales";
import type { AdminContentSection } from "@/types/admin/AdminContent";
import { AdminContentCatalog } from "./AdminContentCatalog";
import { AdminRequests } from "./AdminRequests";
import { AdminNotices } from "./AdminNotices";
import { AdminOverview } from "./AdminOverview";
export async function AdminContentRoute({
  locale,
  section,
  kind,
  subject,
}: {
  locale: string;
  section: AdminContentSection | "requests" | "notifications" | "overview";
  kind?: string;
  subject?: string;
}) {
  if (!isLocale(locale)) notFound();
  const session = await auth();
  if (session?.bestApi?.role !== "ADMIN" || !session.bestApi.accessToken)
    redirect(`/${locale}/login?role=admin`);
  if (section === "requests")
    return (
      <AdminRequests
        key={`${kind ?? "all"}-${subject ?? "all"}`}
        locale={locale}
        kind={kind}
        subject={subject}
      />
    );
  if (section === "notifications") return <AdminNotices locale={locale} />;
  if (section === "overview") return <AdminOverview locale={locale} />;
  return <AdminContentCatalog locale={locale} section={section} />;
}
