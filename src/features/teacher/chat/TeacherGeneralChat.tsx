"use client";

import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import AttachFileRounded from "@mui/icons-material/AttachFileRounded";
import CloseRounded from "@mui/icons-material/CloseRounded";
import MoreVertRounded from "@mui/icons-material/MoreVertRounded";
import SearchRounded from "@mui/icons-material/SearchRounded";
import SendRounded from "@mui/icons-material/SendRounded";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useRef, useState, type MouseEvent } from "react";

import { ScrollToTopLink } from "@/components/navigation/ScrollToTopLink";
import { IconButton } from "@/components/ui/IconButton";
import type { Locale } from "@/config/Locales";
import styles from "@/css/teacher/chat.module.css";
import { useNotifications } from "@/hooks/notifications/useNotifications";
import { useTeacherChat } from "@/hooks/teacher/chat/useTeacherChat";
import type {
  TeacherCopy,
  TeacherLearner,
  TeacherMessage,
  TeacherProfileData,
} from "@/types/teacher/Teacher";

type TeacherGeneralChatProps = {
  copy: TeacherCopy;
  learners: TeacherLearner[];
  locale: Locale;
  messages: TeacherMessage[];
  profile: TeacherProfileData;
};

export function TeacherGeneralChat({
  copy,
  learners,
  locale,
  messages,
  profile,
}: TeacherGeneralChatProps) {
  /* HOOKS */
  const attachmentInputRef = useRef<HTMLInputElement | null>(null);
  const notifications = useNotifications();
  const chat = useTeacherChat({ initialMessages: messages, locale, profile });
  const [moreAnchor, setMoreAnchor] = useState<HTMLElement | null>(null);

  /* HANDLERS */
  const handleMoreOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setMoreAnchor(event.currentTarget);
  };

  const handleMoreClose = () => {
    setMoreAnchor(null);
  };

  const handleAttachmentOpen = () => {
    attachmentInputRef.current?.click();
  };

  const handleAttachmentChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const accepted = chat.handleAttachmentChange(event);
    if (accepted) {
      notifications.info({
        title: copy.generalGroup.attachmentTitle,
        message: copy.generalGroup.attachmentMessage,
      });
      return;
    }
    chat.handleAttachmentClear();
  };

  const handleSend = () => {
    if (!chat.handleSend()) return;
    notifications.info({
      title: copy.generalGroup.sessionTitle,
      message: copy.generalGroup.sessionMessage,
    });
  };

  return (
    <main className={styles.teacherChat}>
      <section className={styles.teacherChat__conversation}>
        <header className={styles.teacherChat__header}>
          <ScrollToTopLink
            aria-label={copy.common.back}
            className={styles.teacherChat__backLink}
            href={`/${locale}/teacher`}
          >
            <ArrowBackRounded />
          </ScrollToTopLink>
          <span className={styles.teacherChat__groupAvatar}>BG</span>
          <div className={styles.teacherChat__groupCopy}>
            <h1>{copy.generalGroup.pageTitle}</h1>
            <button onClick={chat.handleMembersOpen} type="button">
              {copy.generalGroup.memberCount} · {copy.generalGroup.viewMembers}
            </button>
          </div>
          <IconButton label={copy.common.search} onClick={chat.handleSearchToggle} variant="ghost">
            <SearchRounded />
          </IconButton>
          <IconButton label={copy.common.menu} onClick={handleMoreOpen} variant="ghost">
            <MoreVertRounded />
          </IconButton>
        </header>

        {chat.isSearchOpen ? (
          <label className={styles.teacherChat__search}>
            <SearchRounded />
            <input
              autoFocus
              onChange={chat.handleSearchChange}
              placeholder={copy.generalGroup.searchPlaceholder}
              type="search"
              value={chat.searchQuery}
            />
            <button aria-label={copy.common.close} onClick={chat.handleSearchToggle} type="button">
              <CloseRounded />
            </button>
          </label>
        ) : null}

        <div aria-live="polite" className={styles.teacherChat__messages}>
          {chat.visibleMessages.length > 0 ? (
            chat.visibleMessages.map((message, index) => {
              const previousDate = chat.visibleMessages[index - 1]?.dateLabel[locale];
              const currentDate = message.dateLabel[locale];
              return (
                <div className={styles.teacherChat__messageGroup} key={message.id}>
                  {currentDate !== previousDate ? (
                    <time className={styles.teacherChat__dateSeparator}>{currentDate}</time>
                  ) : null}
                  <article className={styles.teacherChat__message} data-own={message.isOwn}>
                    <span className={styles.teacherChat__messageAvatar}>{message.initials}</span>
                    <div className={styles.teacherChat__bubble}>
                      <span className={styles.teacherChat__messageMeta}>
                        <strong>{message.sender}</strong>
                        <small>
                          {message.role === "teacher"
                            ? copy.common.teacherRole
                            : copy.groups.learners}
                        </small>
                      </span>
                      <p>{message.text[locale]}</p>
                      <time>{message.time}</time>
                    </div>
                  </article>
                </div>
              );
            })
          ) : (
            <p className={styles.teacherChat__noResults}>{copy.generalGroup.noResults}</p>
          )}
        </div>

        <footer className={styles.teacherChat__composer}>
          {chat.attachmentName ? (
            <span className={styles.teacherChat__attachmentChip}>
              <AttachFileRounded />
              <span>{chat.attachmentName}</span>
              <button
                aria-label={copy.common.close}
                onClick={chat.handleAttachmentClear}
                type="button"
              >
                <CloseRounded />
              </button>
            </span>
          ) : null}
          <div className={styles.teacherChat__composerRow}>
            <IconButton
              label={copy.generalGroup.attachmentLabel}
              onClick={handleAttachmentOpen}
              variant="ghost"
            >
              <AttachFileRounded />
            </IconButton>
            <input
              onChange={chat.handleDraftChange}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  handleSend();
                }
              }}
              placeholder={copy.generalGroup.messagePlaceholder}
              value={chat.draft}
            />
            <button
              aria-label={copy.generalGroup.sendLabel}
              className={styles.teacherChat__sendButton}
              disabled={!chat.draft.trim()}
              onClick={handleSend}
              type="button"
            >
              <SendRounded />
            </button>
            <input
              accept="image/png,image/jpeg,image/webp,application/pdf"
              className={styles.teacherChat__fileInput}
              onChange={handleAttachmentChange}
              ref={attachmentInputRef}
              type="file"
            />
          </div>
        </footer>
      </section>

      <aside className={styles.teacherChat__membersPanel}>
        <h2>{copy.generalGroup.membersTitle}</h2>
        <p>{copy.generalGroup.memberCount}</p>
        <div className={styles.teacherChat__memberList}>
          {learners.slice(0, 10).map((learner) => (
            <div className={styles.teacherChat__member} key={learner.id}>
              <span>{learner.initials}</span>
              <div>
                <strong>{learner.name}</strong>
                <small>
                  {learner.status === "active" ? copy.groups.active : copy.groups.paused}
                </small>
              </div>
            </div>
          ))}
        </div>
      </aside>

      <Dialog fullWidth maxWidth="xs" onClose={chat.handleMembersClose} open={chat.isMembersOpen}>
        <DialogTitle>{copy.generalGroup.membersTitle}</DialogTitle>
        <DialogContent className={styles.teacherChat__memberDialog}>
          {learners.slice(0, 12).map((learner) => (
            <div className={styles.teacherChat__member} key={learner.id}>
              <span>{learner.initials}</span>
              <div>
                <strong>{learner.name}</strong>
                <small>{learner.phone}</small>
              </div>
            </div>
          ))}
        </DialogContent>
      </Dialog>

      <Menu anchorEl={moreAnchor} onClose={handleMoreClose} open={Boolean(moreAnchor)}>
        <MenuItem onClick={chat.handleMembersOpen}>{copy.generalGroup.viewMembers}</MenuItem>
        <MenuItem onClick={chat.handleSearchToggle}>{copy.common.search}</MenuItem>
      </Menu>
    </main>
  );
}
