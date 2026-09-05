"use server";

import { AuthError } from "next-auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { signIn } from "@/Auth";
import { isLocale, type Locale } from "@/config/Locales";
import { isAuthProviderId, type AuthProviderId } from "@/types/Auth";

function getAuthErrorCode(error: AuthError): string {
  return error.type || "Default";
}

export async function handleProviderSignIn(
  provider: AuthProviderId,
  locale: Locale,
  formData: FormData,
): Promise<void> {
  void formData;

  if (!isAuthProviderId(provider) || !isLocale(locale)) {
    redirect("/en/login?error=Configuration");
  }

  const cookieStore = await cookies();
  cookieStore.set("best-locale", locale, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });

  try {
    await signIn(provider, { redirectTo: `/${locale}/student` });
  } catch (error) {
    if (error instanceof AuthError) {
      redirect(`/${locale}/login?error=${encodeURIComponent(getAuthErrorCode(error))}`);
    }

    throw error;
  }
}
