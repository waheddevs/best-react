import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isLocale } from "@/config/Locales";
import { getAuthCopy } from "@/dictionaries/public/Auth";
import { AuthPage } from "@/features/auth/AuthPage";
import { createPageMetadata } from "@/lib/Metadata";
import { isAuthRole } from "@/types/Auth";

type LoginPageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ error?: string | string[]; role?: string | string[] }>;
};

export async function generateMetadata({ params }: LoginPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const copy = getAuthCopy(locale).modes.login;
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

  const error = Array.isArray(query.error) ? query.error[0] : query.error;
  const roleValue = Array.isArray(query.role) ? query.role[0] : query.role;
  const role = roleValue && isAuthRole(roleValue) ? roleValue : undefined;

  return (
    <AuthPage copy={getAuthCopy(locale)} error={error} locale={locale} mode="login" role={role} />
  );
}
