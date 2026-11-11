"use client";

import Drawer from "@mui/material/Drawer";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect, useRef } from "react";
import { TeacherAiConversation } from "@/features/teacher/ai/TeacherAiConversation";
import { TeacherAiHeader } from "@/features/teacher/ai/TeacherAiHeader";
import { useTeacherAi } from "@/hooks/teacher/ai/useTeacherAi";

export function TeacherAiPanel() {
  /* HOOKS */
  const ai = useTeacherAi();
  const wide = useMediaQuery("(min-width: 1500px)", { noSsr: true });
  const open = ai.panelOpen && !ai.expanded;
  const closeRef = useRef(ai.handleClose);
  useEffect(() => {
    closeRef.current = ai.handleClose;
  });
  useEffect(() => {
    if (!open || wide) return;
    const path = window.location.pathname;
    window.history.pushState({ ...window.history.state, teacherAiPanel: true }, "");
    const handleBack = () => closeRef.current();
    window.addEventListener("popstate", handleBack);
    return () => {
      window.removeEventListener("popstate", handleBack);
      if (window.location.pathname === path && window.history.state?.teacherAiPanel)
        window.history.back();
    };
  }, [open, wide]);
  useEffect(() => {
    if (!open || !wide) return;
    const handleEscape = (event: KeyboardEvent) => {
      if (
        event.key === "Escape" &&
        !event.defaultPrevented &&
        !document.querySelector('[role="dialog"]')
      )
        closeRef.current();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [open, wide]);

  if (ai.expanded) return null;
  const content = (
    <>
      <TeacherAiHeader compact />
      <TeacherAiConversation />
    </>
  );
  if (wide)
    return open ? (
      <aside
        id="teacher-ai-panel"
        className="teacherAi__panel"
        aria-labelledby="teacher-ai-panel-title"
      >
        {content}
      </aside>
    ) : null;
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={ai.handleClose}
      slotProps={{
        paper: {
          id: "teacher-ai-panel",
          className: "teacherAi__drawer",
          role: "dialog",
          "aria-modal": true,
          "aria-labelledby": "teacher-ai-panel-title",
        },
      }}
    >
      {content}
    </Drawer>
  );
}
