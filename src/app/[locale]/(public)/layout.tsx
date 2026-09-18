import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { SiteChrome } from "@/components/layout/SiteChrome";
import { isLocale } from "@/config/Locales";

import "@/scss/public/main.scss";

type PublicLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function PublicLayout({ children, params }: PublicLayoutProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return <SiteChrome locale={locale}>{children}</SiteChrome>;
}
