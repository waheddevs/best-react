"use client";

import { useSession } from "next-auth/react";
import type { ReactNode } from "react";
import type { Locale } from "@/config/Locales";
import { getTeacherAiCopy } from "@/dictionaries/teacher/TeacherAiAssistant";
import { TeacherAiContext } from "@/features/teacher/ai/TeacherAiContext";
import { useTeacherAiController } from "@/hooks/teacher/ai/useTeacherAiController";

type Props = { children: ReactNode; locale: Locale; connected: boolean };
export function TeacherAiProvider({ children, locale, connected }: Props) {
  /* HOOKS */
  const session = useSession();
  const authorized =
    connected &&
    session.status === "authenticated" &&
    session.data.bestApi?.role === "TEACHER" &&
    Boolean(session.data.bestApi.userId);
  // Backend-verified session subject keys all private in-memory state. AI operations
  // use no-cache so logout/account changes cannot expose prior conversations.
  const accountKey = connected ? (session.data?.bestApi?.userId ?? "signed-out") : "preview";
  return (
    <TeacherAiState
      key={accountKey}
      connected={authorized}
      locale={locale}
      initializing={session.status === "loading"}
    >
      {children}
    </TeacherAiState>
  );
}
function TeacherAiState({
  children,
  locale,
  connected,
  initializing,
}: Props & { initializing: boolean }) {
  /* HOOKS */
  const controller = useTeacherAiController(locale, connected);
  return (
    <TeacherAiContext.Provider
      value={{ ...controller, copy: getTeacherAiCopy(locale), locale, initializing }}
    >
      {children}
    </TeacherAiContext.Provider>
  );
}
