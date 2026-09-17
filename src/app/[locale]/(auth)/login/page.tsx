import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isLocale } from "@/config/Locales";
import { getAuthCopy } from "@/dictionaries/public/Auth";
import { AuthPage } from "@/features/auth/AuthPage";
import { createPageMetadata } from "@/lib/Metadata";
import { isAuthRole } from "@/types/Auth";

type LoginPageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ reason?: string | string[]; role?: string | string[] }>;
};

export async function generateMetadata({ params }: LoginPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const copy = getAuthCopy(locale).login;
  return {
    ...createPageMetadata(locale, copy.metadataTitle, copy.metadataDescription, "/login", null),
    robots: { index: false, follow: false },
  };
}

export default async function LoginPage({ params, searchParams }: LoginPageProps) {
  const [{ locale }, query] = await Promise.all([params, searchParams]);

  if (!isLocale(locale)) {
    notFound();
  }

  const roleValue = Array.isArray(query.role) ? query.role[0] : query.role;
  const role = roleValue && isAuthRole(roleValue) ? roleValue : undefined;
  const reason = Array.isArray(query.reason) ? query.reason[0] : query.reason;

  return (
    <AuthPage
      copy={getAuthCopy(locale)}
      locale={locale}
      role={role}
      sessionExpired={reason === "session-expired"}
    />
  );
}
