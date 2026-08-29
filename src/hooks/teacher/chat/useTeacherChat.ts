"use client";

import { useMemo, useRef, useState, type ChangeEvent } from "react";

import type { Locale } from "@/config/Locales";
import type { TeacherMessage, TeacherProfileData } from "@/types/teacher/Teacher";

type UseTeacherChatOptions = {
  initialMessages: TeacherMessage[];
  locale: Locale;
  profile: TeacherProfileData;
};

export function useTeacherChat({ initialMessages, locale, profile }: UseTeacherChatOptions) {
  /* HOOKS */
  const previewSequence = useRef(0);
  const [messages, setMessages] = useState(initialMessages);
  const [draft, setDraft] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMembersOpen, setIsMembersOpen] = useState(false);
  const [attachmentName, setAttachmentName] = useState<string | null>(null);
  const visibleMessages = useMemo(() => {
    const query = searchQuery.trim().toLocaleLowerCase();
    if (!query) return messages;
    return messages.filter(
      (message) =>
        message.sender.toLocaleLowerCase().includes(query) ||
        message.text[locale].toLocaleLowerCase().includes(query),
    );
  }, [locale, messages, searchQuery]);

  /* HANDLERS */
  const handleDraftChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDraft(event.target.value);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchToggle = () => {
    setIsSearchOpen((currentValue) => !currentValue);
    setSearchQuery("");
  };

  const handleMembersOpen = () => {
    setIsMembersOpen(true);
  };

  const handleMembersClose = () => {
    setIsMembersOpen(false);
  };

  const handleAttachmentChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const acceptedTypes = new Set(["image/png", "image/jpeg", "image/webp", "application/pdf"]);
    const isAccepted = Boolean(
      file && file.size <= 5 * 1024 * 1024 && acceptedTypes.has(file.type),
    );
    setAttachmentName(file && isAccepted ? file.name : null);
    event.target.value = "";
    return isAccepted;
  };

  const handleAttachmentClear = () => {
    setAttachmentName(null);
  };

  const handleSend = () => {
    const text = draft.trim();
    if (!text) return false;
    const time = new Intl.DateTimeFormat(locale, {
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date());
    const ownMessage: TeacherMessage = {
      dateLabel: { uz: "Bugun", ru: "Сегодня", en: "Today" },
      id: `preview-message-${++previewSequence.current}`,
      initials: profile.initials,
      isOwn: true,
      role: "teacher",
      sender: profile.displayName,
      text: { uz: text, ru: text, en: text },
      time,
    };
    setMessages((currentMessages) => [...currentMessages, ownMessage]);
    setDraft("");
    setAttachmentName(null);
    return true;
  };

  return {
    attachmentName,
    draft,
    handleAttachmentChange,
    handleAttachmentClear,
    handleDraftChange,
    handleMembersClose,
    handleMembersOpen,
    handleSearchChange,
    handleSearchToggle,
    handleSend,
    isMembersOpen,
    isSearchOpen,
    searchQuery,
    visibleMessages,
  };
}
