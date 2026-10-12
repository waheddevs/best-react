import type { Metadata } from "next";
import { isLocale } from "@/config/Locales";
import { createAdminMetadata } from "@/features/admin/layout/AdminMetadata";
import { AdminContentRoute } from "@/features/admin/content/AdminContentRoute";
type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ kind?: string | string[]; subject?: string | string[] }>;
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? createAdminMetadata(locale, "requests") : {};
}
export default async function Page({ params, searchParams }: Props) {
  const { locale } = await params;
  const { kind, subject } = await searchParams;
  return (
    <AdminContentRoute
      locale={locale}
      section="requests"
      kind={typeof kind === "string" ? kind : undefined}
      subject={
        typeof subject === "string" &&
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(subject)
          ? subject
          : undefined
      }
    />
  );
}
