import "server-only";

import Apple from "next-auth/providers/apple";
import Facebook from "next-auth/providers/facebook";
import Google from "next-auth/providers/google";
import NextAuth from "next-auth";

const developmentSecret =
  process.env.NODE_ENV === "development" ? "best-lc-development-session-secret-only" : undefined;

export const { auth, handlers, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET ?? developmentSecret,
  providers: [Google, Facebook, Apple],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
});
