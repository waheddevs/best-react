"use client";

import { useMutation } from "@apollo/client/react";
import { useCallback, useEffect, useRef, useState } from "react";

import type { Locale } from "@/config/Locales";
import { getStudentListeningTestNavbarCopy } from "@/dictionaries/student/StudentListeningTestNavbar";
import { studentTestExitErrors } from "@/dictionaries/student/StudentTestExit";
import { DiscardStudentTestAttemptDocument } from "@/gql/graphql";
import { useConfirmDialog } from "@/hooks/notifications/useConfirmDialog";
import { useNotifications } from "@/hooks/notifications/useNotifications";

export function useStudentTestExit({
  attemptId,
  locale,
  returnHref,
  active,
  reading = false,
  writing = false,
  speaking = false,
  canExit,
}: {
  attemptId: string;
  locale: Locale;
  returnHref: string;
  active: boolean;
  reading?: boolean;
  writing?: boolean;
  speaking?: boolean;
  canExit: () => boolean;
}) {
  const confirm = useConfirmDialog();
  const notifications = useNotifications();
  const [discard] = useMutation(DiscardStudentTestAttemptDocument, {
    context: { authenticated: true },
    fetchPolicy: "no-cache",
  });
  const pendingWrites = useRef(new Set<Promise<unknown>>());
  const confirmingRef = useRef(false);
  const exitingRef = useRef(false);
  const [exiting, setExiting] = useState(false);
  const canExitRef = useRef(canExit);
  useEffect(() => {
    canExitRef.current = canExit;
  }, [canExit]);

  const trackWrite = useCallback(<T>(request: Promise<T>): Promise<T> => {
    const tracked = request.finally(() => pendingWrites.current.delete(tracked));
    pendingWrites.current.add(tracked);
    return tracked;
  }, []);

  const exit = async () => {
    if (confirmingRef.current || exitingRef.current || !canExitRef.current()) return;
    if (!active) {
      window.location.replace(returnHref);
      return;
    }
    confirmingRef.current = true;
    const copy = getStudentListeningTestNavbarCopy(locale);
    try {
      const confirmed = await confirm({
        brand: reading
          ? "student-reading"
          : writing
            ? "student-writing"
            : speaking
              ? "student-speaking"
              : "student",
        cancelLabel: copy.cancelExitLabel,
        confirmLabel: copy.confirmExitLabel,
        icon: "tone",
        message: copy.exitMessage,
        title: copy.exitTitle,
        tone: "warning",
      });
      if (!confirmed || !canExitRef.current()) return;
      exitingRef.current = true;
      setExiting(true);
      // Finish already-started writes before discarding, never save new edits on Exit.
      while (pendingWrites.current.size) {
        await Promise.allSettled([...pendingWrites.current]);
      }
      const result = await discard({ variables: { attemptId } });
      if (result.data?.discardTestAttempt !== true) throw new Error("Exit was not accepted");
      // A fresh document drops simulator state and cached links to the discarded attempt.
      window.location.replace(returnHref);
    } catch {
      exitingRef.current = false;
      setExiting(false);
      notifications.error({ title: copy.exitTitle, message: studentTestExitErrors[locale] });
    } finally {
      confirmingRef.current = false;
    }
  };

  return { exit, exiting, exitingRef, trackWrite };
}
