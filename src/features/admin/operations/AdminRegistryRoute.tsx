import { notFound, redirect } from "next/navigation";
import { auth } from "@/Auth";
import { isLocale } from "@/config/Locales";
import type { AdminRegistrySection } from "@/types/admin/AdminRegistry";
import { AdminRegistry } from "./AdminRegistry";

export async function AdminRegistryRoute({
  locale,
  section,
}: {
  locale: string;
  section: AdminRegistrySection;
}) {
  if (!isLocale(locale)) notFound();
  const session = await auth();
  if (session?.bestApi?.role !== "ADMIN" || !session.bestApi.accessToken)
    redirect(`/${locale}/login?role=admin`);
  return <AdminRegistry locale={locale} section={section} />;
}
