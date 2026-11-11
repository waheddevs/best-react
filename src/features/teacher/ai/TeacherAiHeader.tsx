"use client";

import AddRounded from "@mui/icons-material/AddRounded";
import ArchiveRounded from "@mui/icons-material/ArchiveRounded";
import CloseRounded from "@mui/icons-material/CloseRounded";
import EditRounded from "@mui/icons-material/EditRounded";
import OpenInFullRounded from "@mui/icons-material/OpenInFullRounded";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { useTeacherAi } from "@/hooks/teacher/ai/useTeacherAi";

export function TeacherAiHeader({ compact = false }: { compact?: boolean }) {
  /* HOOKS */
  const ai = useTeacherAi();
  const [dialog, setDialog] = useState<"rename" | "archive" | null>(null);
  const [title, setTitle] = useState("");
  const { copy } = ai;
  /* HANDLERS */
  const handleRename = () => {
    setTitle(ai.conversation?.title ?? "");
    setDialog("rename");
  };
  const handleSave = async (event: FormEvent) => {
    event.preventDefault();
    if (title.trim() && (await ai.handleRename(title.trim()))) setDialog(null);
  };
  const handleArchive = async () => {
    await ai.handleArchive();
    setDialog(null);
  };
  const handleExpand = () => {
    if (window.history.state?.teacherAiPanel)
      window.history.replaceState({ ...window.history.state, teacherAiPanel: false }, "");
    ai.handleClose();
  };
  return (
    <>
      <header className="teacherAi__header">
        <div>
          <h2
            className="teacherShared__sectionTitle"
            id={compact ? "teacher-ai-panel-title" : "teacher-ai-page-title"}
          >
            {ai.conversation?.title === "New conversation"
              ? copy.untitled
              : (ai.conversation?.title ?? copy.title)}
          </h2>
          <span className="teacherShared__badge">{copy.free}</span>
        </div>
        <div className="teacherAi__headerActions">
          <IconButton label={copy.newChat} onClick={() => ai.handleSelect(null)} disabled={ai.busy}>
            <AddRounded />
          </IconButton>
          {ai.conversation && !ai.conversation.archivedAt && (
            <>
              <IconButton label={copy.rename} onClick={handleRename} disabled={ai.busy}>
                <EditRounded />
              </IconButton>
              <IconButton
                label={copy.archive}
                onClick={() => setDialog("archive")}
                disabled={ai.busy}
              >
                <ArchiveRounded />
              </IconButton>
            </>
          )}
          {compact && (
            <>
              <Link
                aria-label={copy.expand}
                title={copy.expand}
                className="publicShared__iconButton publicShared__iconButtonMedium publicShared__iconButtonGhost teacherAi__iconLink"
                href={`/${ai.locale}/teacher/ai-assistant${ai.activeId ? `/${ai.activeId}` : ""}`}
                onClick={handleExpand}
              >
                <OpenInFullRounded />
              </Link>
              <IconButton label={copy.close} onClick={ai.handleClose}>
                <CloseRounded />
              </IconButton>
            </>
          )}
        </div>
      </header>
      <Dialog
        open={dialog !== null}
        onClose={() => {
          if (!ai.busy) setDialog(null);
        }}
        aria-labelledby="teacher-ai-dialog-title"
        slotProps={{ paper: { className: "teacherAi__dialog" } }}
      >
        <h2 className="teacherShared__sectionTitle" id="teacher-ai-dialog-title">
          {dialog === "rename" ? copy.rename : copy.archiveTitle}
        </h2>
        {dialog === "rename" ? (
          <form onSubmit={handleSave}>
            <TextField
              label={copy.titleLabel}
              fullWidth
              autoFocus
              slotProps={{ htmlInput: { maxLength: 80 } }}
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
            <div className="teacherAi__dialogActions">
              <Button variant="ghost" onClick={() => setDialog(null)} disabled={ai.busy}>
                {copy.cancel}
              </Button>
              <Button type="submit" disabled={ai.busy || !title.trim()}>
                {copy.save}
              </Button>
            </div>
          </form>
        ) : (
          <>
            <p>{copy.archiveBody}</p>
            <div className="teacherAi__dialogActions">
              <Button variant="ghost" onClick={() => setDialog(null)} disabled={ai.busy}>
                {copy.cancel}
              </Button>
              <Button variant="danger" onClick={handleArchive} disabled={ai.busy}>
                {copy.archive}
              </Button>
            </div>
          </>
        )}
      </Dialog>
    </>
  );
}
