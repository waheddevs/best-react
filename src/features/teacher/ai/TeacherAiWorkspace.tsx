"use client";

import AddRounded from "@mui/icons-material/AddRounded";
import ChatBubbleOutlineRounded from "@mui/icons-material/ChatBubbleOutlineRounded";
import { Button } from "@/components/ui/Button";
import { TeacherAiConversation } from "@/features/teacher/ai/TeacherAiConversation";
import { TeacherAiHeader } from "@/features/teacher/ai/TeacherAiHeader";
import { TeacherPageHeader } from "@/features/teacher/layout/TeacherPageHeader";
import { useTeacherAi } from "@/hooks/teacher/ai/useTeacherAi";

export function TeacherAiWorkspace() {
  /* HOOKS */
  const ai = useTeacherAi();
  const { copy } = ai;
  return (
    <section className="teacherAi">
      <TeacherPageHeader eyebrow={copy.eyebrow} title={copy.title} />
      <div className="teacherAi__intro">
        <p>{copy.subtitle}</p>
        <Button
          onClick={() => ai.handleSelect(null)}
          startIcon={<AddRounded />}
          variant="primary"
          disabled={ai.busy}
        >
          {copy.newChat}
        </Button>
      </div>
      <div className="teacherAi__layout">
        <aside className="teacherShared__card teacherAi__history" aria-label={copy.history}>
          <h2 className="teacherShared__sectionTitle">{copy.history}</h2>
          <div className="teacherAi__historyFilters">
            <Button
              variant="filter"
              shape="soft"
              aria-pressed={!ai.archivedHistory}
              onClick={() => ai.handleHistoryFilter(false)}
            >
              {copy.activeHistory}
            </Button>
            <Button
              variant="filter"
              shape="soft"
              aria-pressed={ai.archivedHistory}
              onClick={() => ai.handleHistoryFilter(true)}
            >
              {copy.archivedHistory}
            </Button>
          </div>
          <nav className="teacherAi__historyList" aria-label={copy.history}>
            {ai.historyLoading && <p role="status">{copy.loading}</p>}
            {!ai.historyLoading && !ai.history.length && <p>{copy.emptyHistory}</p>}
            {ai.history.map((item) => (
              <Button
                key={item.id}
                variant="filter"
                shape="soft"
                startIcon={<ChatBubbleOutlineRounded />}
                aria-pressed={ai.activeId === item.id}
                aria-current={ai.activeId === item.id ? "page" : undefined}
                onClick={() => ai.handleSelect(item.id)}
              >
                {item.title === "New conversation" ? copy.untitled : item.title}
              </Button>
            ))}
          </nav>
          {ai.historyError && (
            <Button onClick={ai.handleRefresh} size="small" variant="ghost">
              {copy.refresh}
            </Button>
          )}
          {ai.historyHasMore && (
            <Button disabled={ai.busy} onClick={ai.handleHistoryMore} size="small" variant="ghost">
              {copy.loadMore}
            </Button>
          )}
          <small className="teacherAi__historyFooter">{copy.contextNote}</small>
        </aside>
        <div className="teacherShared__card teacherAi__workspaceConversation">
          <TeacherAiHeader />
          <TeacherAiConversation key={ai.activeId ?? "new"} />
        </div>
      </div>
    </section>
  );
}
