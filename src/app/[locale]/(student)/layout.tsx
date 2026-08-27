import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { SiteChrome } from "@/components/layout/SiteChrome";
import { isLocale } from "@/config/Locales";

type StudentLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function StudentLayout({ children, params }: StudentLayoutProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return <SiteChrome locale={locale}>{children}</SiteChrome>;
}
