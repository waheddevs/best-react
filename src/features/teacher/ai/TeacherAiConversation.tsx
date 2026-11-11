"use client";

import AutoAwesomeRounded from "@mui/icons-material/AutoAwesomeRounded";
import ArrowOutwardRounded from "@mui/icons-material/ArrowOutwardRounded";
import SendRounded from "@mui/icons-material/SendRounded";
import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { Button } from "@/components/ui/Button";
import { TeacherAiMarkdown } from "@/features/teacher/ai/TeacherAiMarkdown";
import { shouldSendTeacherAiMessage } from "@/features/teacher/ai/TeacherAiMarkdownModel";
import { useTeacherAi } from "@/hooks/teacher/ai/useTeacherAi";
import { isActiveAiRun } from "@/hooks/teacher/ai/useTeacherAiController";
import type { TeacherAiCopy } from "@/dictionaries/teacher/TeacherAiAssistant";

function errorMessage(code: string, copy: TeacherAiCopy) {
  const messages: Record<string, string> = {
    RATE_LIMITED: copy.quota,
    CONFLICT: copy.conflict,
    BAD_USER_INPUT: copy.invalid,
    NOT_FOUND: copy.inaccessible,
    UNAUTHENTICATED: copy.expired,
    FORBIDDEN: copy.expired,
    NETWORK: copy.network,
    AMBIGUOUS: copy.ambiguous,
  };
  return messages[code] ?? copy.unavailable;
}

export function TeacherAiConversation() {
  /* HOOKS */
  const ai = useTeacherAi();
  const { copy } = ai;
  const viewport = useRef<HTMLDivElement>(null);
  const nearBottom = useRef(true);
  const [showNewMessages, setShowNewMessages] = useState(false);
  const olderSnapshot = useRef<{ height: number; top: number } | null>(null);
  const lastMessage = ai.messages.at(-1)?.id;
  const [seenMessage, setSeenMessage] = useState<string | undefined>(undefined);
  const composing = useRef(false);
  const active = isActiveAiRun(ai.currentRun);
  const unavailable = !ai.connected || !ai.availability?.available;
  const readonly = Boolean(ai.conversation?.archivedAt);
  const canSend =
    !unavailable &&
    !readonly &&
    !active &&
    !ai.busy &&
    Boolean(ai.draft.trim()) &&
    ai.draft.length <= (ai.availability?.maxInputCharacters ?? 4000) &&
    (Boolean(ai.activeId) || ai.consent);

  useEffect(() => {
    const element = viewport.current;
    if (!element) return;
    if (olderSnapshot.current) {
      element.scrollTop =
        olderSnapshot.current.top + element.scrollHeight - olderSnapshot.current.height;
      olderSnapshot.current = null;
    } else if (nearBottom.current)
      element.scrollTop = ai.messages.length ? element.scrollHeight : 0;
  }, [ai.messages.length, lastMessage]);
  useEffect(() => {
    nearBottom.current = true;
    const element = viewport.current;
    element?.scrollTo({
      top: element.querySelector(".teacherAi__message") ? element.scrollHeight : 0,
    });
  }, [ai.activeId]);

  /* HANDLERS */
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (canSend) void ai.handleSend();
  };
  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (
      shouldSendTeacherAiMessage(
        event.key,
        event.shiftKey,
        composing.current || event.nativeEvent.isComposing || event.keyCode === 229,
      )
    ) {
      event.preventDefault();
      if (canSend) void ai.handleSend();
    }
  };
  const handleScroll = () => {
    const element = viewport.current;
    if (!element) return;
    nearBottom.current = element.scrollHeight - element.scrollTop - element.clientHeight < 100;
    setShowNewMessages(!nearBottom.current);
    if (nearBottom.current) setSeenMessage(lastMessage);
  };
  const handleLatest = () => {
    nearBottom.current = true;
    setShowNewMessages(false);
    viewport.current?.scrollTo({ top: viewport.current.scrollHeight });
    setSeenMessage(lastMessage);
  };
  const handleOlder = async () => {
    if (viewport.current)
      olderSnapshot.current = {
        height: viewport.current.scrollHeight,
        top: viewport.current.scrollTop,
      };
    await ai.handleOlder();
  };
  const runMessage =
    ai.currentRun?.status === "QUEUED"
      ? copy.queued
      : ai.currentRun?.status === "RUNNING"
        ? copy.generating
        : ai.currentRun?.status === "SUCCEEDED"
          ? copy.completed
          : ai.currentRun?.status === "CANCELLED"
            ? copy.cancelled
            : ai.currentRun?.safeErrorCode
              ? errorMessage(ai.currentRun.safeErrorCode, copy)
              : copy.failed;

  return (
    <section className="teacherAi__conversation" aria-label={copy.title}>
      <div
        className="teacherAi__messages"
        ref={viewport}
        onScroll={handleScroll}
        aria-busy={ai.loading}
      >
        {ai.hasOlder && (
          <Button disabled={ai.busy} onClick={handleOlder} size="small" variant="ghost">
            {copy.older}
          </Button>
        )}
        {ai.loading && !ai.messages.length ? (
          <p role="status" className="teacherAi__status">
            {copy.loading}
          </p>
        ) : null}
        {!ai.messages.length && !ai.loading && !ai.error && (
          <div className="teacherAi__welcome">
            <span className="teacherShared__emptyIcon teacherAi__welcomeIcon">
              <AutoAwesomeRounded />
            </span>
            <h2 className="teacherShared__sectionTitle">{copy.welcome}</h2>
            <p className="teacherShared__emptyDescription">{copy.introduction}</p>
            <div className="teacherAi__starters">
              {copy.starters.map((prompt) => (
                <Button
                  key={prompt}
                  variant="secondary"
                  shape="soft"
                  endIcon={<ArrowOutwardRounded />}
                  onClick={() => ai.handleDraft(prompt)}
                >
                  {prompt}
                </Button>
              ))}
            </div>
            <small>{copy.contextNote}</small>
          </div>
        )}
        {ai.messages.map((message) => (
          <article
            className="teacherAi__message"
            data-kind={message.kind.toLowerCase()}
            key={message.id}
          >
            <strong className="teacherAi__messageLabel">
              {message.kind === "USER" ? copy.you : copy.assistant}
            </strong>
            <TeacherAiMarkdown content={message.content} />
          </article>
        ))}
        {ai.currentRun && (
          <div className="teacherAi__run" data-active={active}>
            <p role="status">
              {active && <span className="teacherAi__statusDot" aria-hidden="true" />}
              {runMessage}
            </p>
            {active && (
              <Button disabled={ai.busy} onClick={ai.handleCancel} size="small" variant="ghost">
                {copy.stop}
              </Button>
            )}
            {ai.currentRun.status === "FAILED" && ai.currentRun.retryable && !readonly && (
              <Button
                disabled={ai.busy || unavailable}
                onClick={ai.handleRetry}
                size="small"
                variant="outline"
              >
                {copy.retry}
              </Button>
            )}
          </div>
        )}
        {ai.error && (
          <div className="teacherAi__notice" role="alert">
            <p>{errorMessage(ai.error, copy)}</p>
            {["UNAUTHENTICATED", "FORBIDDEN"].includes(ai.error) ? (
              <Link href={`/${ai.locale}/login?role=teacher`}>{copy.login}</Link>
            ) : (
              <Button disabled={ai.busy} onClick={ai.handleRefresh} size="small" variant="ghost">
                {copy.refresh}
              </Button>
            )}
          </div>
        )}
      </div>
      {showNewMessages && lastMessage !== seenMessage && (
        <Button
          className="teacherAi__newMessages"
          onClick={handleLatest}
          size="small"
          variant="surface"
        >
          {copy.newMessages}
        </Button>
      )}
      <div className="teacherAi__composerArea">
        {readonly ? (
          <p className="teacherAi__notice">{copy.archived}</p>
        ) : (
          <>
            {!ai.activeId && ai.availability?.available && (
              <details className="teacherAi__consent" open={!ai.consent}>
                <summary>{copy.noticeTitle}</summary>
                <p>{copy.notice}</p>
                <p>{copy.retention.replace("{days}", String(ai.availability.retentionDays))}</p>
                <label>
                  <input
                    type="checkbox"
                    checked={ai.consent}
                    onChange={(event) => ai.handleConsent(event.target.checked)}
                  />
                  {copy.consent}
                </label>
              </details>
            )}
            {unavailable && !ai.loading && (
              <p className="teacherAi__notice" role="status">
                {ai.connected ? copy.unavailable : copy.preview}
              </p>
            )}
            <form className="teacherAi__composer" onSubmit={handleSubmit}>
              <textarea
                aria-label={copy.promptLabel}
                placeholder={copy.placeholder}
                value={ai.draft}
                rows={3}
                maxLength={ai.availability?.maxInputCharacters ?? 4000}
                onChange={(event) => ai.handleDraft(event.target.value)}
                onKeyDown={handleKeyDown}
                onCompositionStart={() => {
                  composing.current = true;
                }}
                onCompositionEnd={() => {
                  composing.current = false;
                }}
                disabled={readonly || ai.busy || unavailable}
              />
              <div className="teacherAi__composerBottom">
                <small>
                  {ai.draft.length}/{ai.availability?.maxInputCharacters ?? 4000}
                </small>
                <Button startIcon={<SendRounded />} shape="soft" disabled={!canSend} type="submit">
                  {ai.busy ? copy.sending : copy.send}
                </Button>
              </div>
            </form>
            <small className="teacherAi__hint">{copy.keyboardHint}</small>
          </>
        )}
        <small className="teacherAi__disclaimer">{copy.disclaimer}</small>
      </div>
    </section>
  );
}
