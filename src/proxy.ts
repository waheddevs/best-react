import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { defaultLocale, isLocale, locales } from "@/config/Locales";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const localePreference = request.cookies.get("best-locale")?.value;
  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  if (hasLocale) {
    return NextResponse.next();
  }

  const redirectUrl = request.nextUrl.clone();
  const locale = localePreference && isLocale(localePreference) ? localePreference : defaultLocale;
  redirectUrl.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;

  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
