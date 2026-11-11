"use client";

import { CombinedGraphQLErrors } from "@apollo/client";
import { useApolloClient, useQuery } from "@apollo/client/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/config/Locales";
import {
  ArchiveTeacherAiConversationDocument,
  CancelTeacherAiChatRunDocument,
  CreateTeacherAiConversationDocument,
  RenameTeacherAiConversationDocument,
  RetryTeacherAiChatRunDocument,
  SendTeacherAiMessageDocument,
  TeacherAiAvailabilityDocument,
  TeacherAiChatRunDocument,
  TeacherAiConversationDocument,
  TeacherAiConversationsDocument,
  type TeacherAiChatRunQuery,
  type TeacherAiConversationQuery,
  type TeacherAiConversationsQuery,
} from "@/gql/graphql";
import { teacherAiRouteConversation } from "@/features/teacher/ai/TeacherAiMarkdownModel";

type Run = TeacherAiChatRunQuery["teacherAiChatRun"];
type Conversation = TeacherAiConversationQuery["teacherAiConversation"];
const options = { context: { authenticated: true }, fetchPolicy: "no-cache" as const };
export function teacherAiErrorCode(error: unknown): string {
  return CombinedGraphQLErrors.is(error)
    ? String(error.errors[0]?.extensions?.code ?? "SERVICE_UNAVAILABLE")
    : "NETWORK";
}
export function isActiveAiRun(run: Run | null | undefined): boolean {
  return run?.status === "QUEUED" || run?.status === "RUNNING";
}

export function useTeacherAiController(locale: Locale, connected: boolean) {
  /* HOOKS */
  const client = useApolloClient();
  const router = useRouter();
  const pathname = usePathname();
  const routeId = teacherAiRouteConversation(pathname, locale);
  const expanded = routeId !== undefined;
  const [panelOpen, setPanelOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  // Remember URL selection when returning from the expanded view to the panel.
  if (expanded && selectedId !== routeId) setSelectedId(routeId);
  const activeId = expanded ? routeId : selectedId;
  const draftKey = activeId ?? "new";
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [consents, setConsents] = useState<Record<string, boolean>>({});
  const [error, setError] = useState<{ key: string; code: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const busyRef = useRef(false);
  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  const pending = useRef<{
    draftKey: string;
    conversationId: string;
    text: string;
    key: string;
  } | null>(null);
  const retryKeys = useRef(new Map<string, string>());
  const [trackedRun, setTrackedRun] = useState<Run | null>(null);
  const [olderPages, setOlderPages] = useState<Record<string, Conversation["messages"]>>({});
  const [olderCursor, setOlderCursor] = useState<
    Record<string, { cursor: string | null; hasOlder: boolean }>
  >({});
  const [archivedHistory, setArchivedHistory] = useState(false);
  const [historyPages, setHistoryPages] = useState<
    TeacherAiConversationsQuery["teacherAiConversations"]["items"]
  >([]);
  const [historyCursor, setHistoryCursor] = useState<string | null>(null);
  const [historyHasMore, setHistoryHasMore] = useState<boolean | null>(null);
  const visible = panelOpen || expanded;
  const availability = useQuery(TeacherAiAvailabilityDocument, {
    ...options,
    skip: !connected || !visible,
  });
  const refetchAvailability = availability.refetch;
  const detail = useQuery(TeacherAiConversationDocument, {
    ...options,
    variables: { id: activeId ?? "", first: 30 },
    skip: !connected || !activeId || !visible,
  });
  const history = useQuery(TeacherAiConversationsDocument, {
    ...options,
    variables: { first: 20, archived: archivedHistory },
    skip: !connected || !expanded,
  });
  const conversation =
    detail.data?.teacherAiConversation.id === activeId ? detail.data.teacherAiConversation : null;
  const trackedForThread = trackedRun?.conversationId === activeId ? trackedRun : null;
  const currentRun =
    trackedForThread &&
    (!conversation?.latestRun || trackedForThread.createdAt >= conversation.latestRun.createdAt)
      ? trackedForThread
      : (conversation?.latestRun ?? null);
  const pollingId = isActiveAiRun(trackedRun)
    ? trackedRun?.id
    : isActiveAiRun(conversation?.latestRun)
      ? conversation?.latestRun?.id
      : null;
  const latest = useRef({ detail, history, activeId });
  useEffect(() => {
    latest.current = { detail, history, activeId };
  });

  useEffect(() => {
    if (!connected || !pollingId) return;
    let stopped = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let failures = 0;
    const poll = async () => {
      try {
        const result = await client.query({
          query: TeacherAiChatRunDocument,
          variables: { id: pollingId },
          ...options,
        });
        if (stopped || !result.data) return;
        const run = result.data.teacherAiChatRun;
        setTrackedRun(run);
        setError(null);
        failures = 0;
        if (!isActiveAiRun(run)) {
          if (latest.current.activeId === run.conversationId) await latest.current.detail.refetch();
          if (latest.current.history.data) await latest.current.history.refetch();
          return;
        }
      } catch (failure) {
        if (stopped) return;
        failures++;
        const code = teacherAiErrorCode(failure);
        setError({ key: latest.current.activeId ?? "new", code });
        if (["UNAUTHENTICATED", "FORBIDDEN", "NOT_FOUND"].includes(code)) return;
      }
      if (!stopped)
        timer = setTimeout(
          () => {
            void poll();
          },
          Math.min(2_000 * 2 ** Math.min(failures, 4), 30_000),
        );
    };
    timer = setTimeout(() => {
      void poll();
    }, 1000);
    return () => {
      stopped = true;
      if (timer) clearTimeout(timer);
    };
  }, [client, connected, pollingId]);

  useEffect(() => {
    if (!connected || !visible) return;
    const handleFocus = () => {
      if (latest.current.activeId) void latest.current.detail.refetch().catch(() => undefined);
      void refetchAvailability().catch(() => undefined);
    };
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [refetchAvailability, connected, visible]);

  const messages = [
    ...(activeId ? (olderPages[activeId] ?? []) : []),
    ...(conversation?.messages ?? []),
  ]
    .filter((message, index, items) => items.findIndex((item) => item.id === message.id) === index)
    .sort((a, b) => a.sequence - b.sequence);
  const allHistory = [
    ...(history.data?.teacherAiConversations.items ?? []),
    ...historyPages,
  ].filter((item, index, items) => items.findIndex((entry) => entry.id === item.id) === index);

  /* HANDLERS */
  const handleSelect = (id: string | null) => {
    setError(null);
    setSelectedId(id);
    if (expanded)
      router.push(`/${locale}/teacher/ai-assistant${id ? `/${encodeURIComponent(id)}` : ""}`, {
        scroll: false,
      });
  };
  const handleDraft = (value: string) =>
    setDrafts((current) => ({ ...current, [draftKey]: value }));
  const handleConsent = (value: boolean) =>
    setConsents((current) => ({ ...current, [draftKey]: value }));
  const handleOpen = () => setPanelOpen(true);
  const handleClose = () => setPanelOpen(false);
  const handleOperation = async (action: () => Promise<void>) => {
    if (busyRef.current) return;
    busyRef.current = true;
    setBusy(true);
    setError(null);
    try {
      await action();
    } catch (failure) {
      if (mounted.current) setError({ key: draftKey, code: teacherAiErrorCode(failure) });
    } finally {
      busyRef.current = false;
      if (mounted.current) setBusy(false);
    }
  };
  const handleSend = async () => {
    const text = (drafts[draftKey] ?? "").trim();
    const policy = availability.data?.teacherAiAvailability;
    if (
      !connected ||
      !text ||
      !policy?.available ||
      text.length > policy.maxInputCharacters ||
      isActiveAiRun(currentRun) ||
      conversation?.archivedAt
    )
      return;
    if (!activeId && (!consents[draftKey] || !policy.noticeVersion)) return;
    await handleOperation(async () => {
      // Keep the same idempotency key after an unknown network outcome.
      if (
        !pending.current ||
        pending.current.draftKey !== draftKey ||
        pending.current.text !== text
      )
        pending.current = {
          draftKey,
          conversationId: activeId ?? crypto.randomUUID(),
          text,
          key: crypto.randomUUID(),
        };
      const request = pending.current;
      if (!activeId)
        await client.mutate({
          mutation: CreateTeacherAiConversationDocument,
          ...options,
          variables: {
            input: {
              id: request.conversationId,
              consent: true,
              noticeVersion: policy.noticeVersion ?? "",
            },
          },
        });
      const result = await client.mutate({
        mutation: SendTeacherAiMessageDocument,
        ...options,
        variables: {
          input: { conversationId: request.conversationId, text, idempotencyKey: request.key },
        },
      });
      if (!mounted.current) return;
      if (!result.data) throw new Error("Missing accepted run");
      setTrackedRun(result.data.sendTeacherAiMessage);
      setDrafts((current) => ({ ...current, [draftKey]: "", [request.conversationId]: "" }));
      setSelectedId(request.conversationId);
      if (expanded)
        router.replace(`/${locale}/teacher/ai-assistant/${request.conversationId}`, {
          scroll: false,
        });
      if (activeId === request.conversationId) await detail.refetch();
      if (expanded) await history.refetch();
      pending.current = null;
    });
  };
  const handleRefresh = () =>
    handleOperation(async () => {
      await availability.refetch();
      if (activeId) await detail.refetch();
      if (expanded) await history.refetch();
    });
  const handleRetry = () =>
    handleOperation(async () => {
      if (!currentRun?.retryable) return;
      const key = retryKeys.current.get(currentRun.id) ?? crypto.randomUUID();
      retryKeys.current.set(currentRun.id, key);
      const result = await client.mutate({
        mutation: RetryTeacherAiChatRunDocument,
        ...options,
        variables: { input: { runId: currentRun.id, idempotencyKey: key } },
      });
      if (result.data) setTrackedRun(result.data.retryTeacherAiChatRun);
      await detail.refetch();
    });
  const handleCancel = () =>
    handleOperation(async () => {
      if (!currentRun) return;
      const result = await client.mutate({
        mutation: CancelTeacherAiChatRunDocument,
        ...options,
        variables: { id: currentRun.id },
      });
      if (result.data) setTrackedRun(result.data.cancelTeacherAiChatRun);
      await detail.refetch();
    });
  const handleRename = async (title: string) => {
    let saved = false;
    await handleOperation(async () => {
      if (!activeId) return;
      await client.mutate({
        mutation: RenameTeacherAiConversationDocument,
        ...options,
        variables: { input: { conversationId: activeId, title } },
      });
      setHistoryPages([]);
      setHistoryCursor(null);
      setHistoryHasMore(null);
      await detail.refetch();
      if (expanded) await history.refetch();
      saved = true;
    });
    return saved;
  };
  const handleArchive = () =>
    handleOperation(async () => {
      if (!activeId) return;
      await client.mutate({
        mutation: ArchiveTeacherAiConversationDocument,
        ...options,
        variables: { id: activeId },
      });
      setHistoryPages([]);
      setHistoryCursor(null);
      setHistoryHasMore(null);
      setDrafts((current) => ({ ...current, [activeId]: "" }));
      await detail.refetch();
      if (expanded) await history.refetch();
    });
  const handleOlder = () =>
    handleOperation(async () => {
      if (!activeId) return;
      const cursor = olderCursor[activeId]?.cursor ?? conversation?.olderCursor;
      if (!cursor) return;
      const result = await client.query({
        query: TeacherAiConversationDocument,
        ...options,
        variables: { id: activeId, first: 30, before: cursor },
      });
      const page = result.data?.teacherAiConversation;
      if (page) {
        setOlderPages((current) => ({
          ...current,
          [activeId]: [...page.messages, ...(current[activeId] ?? [])],
        }));
        setOlderCursor((current) => ({
          ...current,
          [activeId]: { cursor: page.olderCursor, hasOlder: page.hasOlder },
        }));
      }
    });
  const handleHistoryMore = () =>
    handleOperation(async () => {
      const cursor = historyCursor ?? history.data?.teacherAiConversations.cursor;
      if (!cursor) return;
      const result = await client.query({
        query: TeacherAiConversationsDocument,
        ...options,
        variables: { first: 20, after: cursor, archived: archivedHistory },
      });
      const page = result.data?.teacherAiConversations;
      if (page) {
        setHistoryPages((current) => [...current, ...page.items]);
        setHistoryCursor(page.cursor);
        setHistoryHasMore(page.hasMore);
      }
    });
  const handleHistoryFilter = (archived: boolean) => {
    setArchivedHistory(archived);
    setHistoryPages([]);
    setHistoryCursor(null);
    setHistoryHasMore(null);
  };

  return {
    activeId,
    expanded,
    panelOpen,
    connected,
    conversation,
    currentRun,
    messages,
    busy,
    draft: drafts[draftKey] ?? "",
    consent: consents[draftKey] ?? false,
    availability: availability.data?.teacherAiAvailability,
    loading: detail.loading || availability.loading,
    error:
      error?.key === draftKey
        ? error.code
        : detail.error
          ? teacherAiErrorCode(detail.error)
          : availability.error
            ? teacherAiErrorCode(availability.error)
            : null,
    hasOlder: activeId
      ? (olderCursor[activeId]?.hasOlder ?? conversation?.hasOlder ?? false)
      : false,
    history: allHistory,
    historyLoading: history.loading,
    historyError: Boolean(history.error),
    archivedHistory,
    historyHasMore: historyHasMore ?? history.data?.teacherAiConversations.hasMore ?? false,
    handleSelect,
    handleDraft,
    handleConsent,
    handleOpen,
    handleClose,
    handleSend,
    handleRefresh,
    handleRetry,
    handleCancel,
    handleRename,
    handleArchive,
    handleOlder,
    handleHistoryMore,
    handleHistoryFilter,
  };
}
