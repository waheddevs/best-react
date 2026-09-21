"use client";

import AddRounded from "@mui/icons-material/AddRounded";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { type FormEvent, useState } from "react";

import { Button } from "@/components/ui/Button";
import { useNotifications } from "@/hooks/notifications/useNotifications";
import type { TeacherCopy, TeacherGroupCreateKind } from "@/types/teacher/Teacher";

type GroupWorkspaceCreateActionProps = {
  copy: TeacherCopy;
  kind: Exclude<TeacherGroupCreateKind, "lesson">;
};

export function GroupWorkspaceCreateAction({ copy, kind }: GroupWorkspaceCreateActionProps) {
  /* HOOKS */
  const [isOpen, setIsOpen] = useState(false);
  const notifications = useNotifications();

  /* HANDLERS */
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.currentTarget.reset();
    setIsOpen(false);
    notifications.info({
      message: copy.groupWorkspace.createPreviewMessage,
      title: copy.groupWorkspace.createPreviewTitle,
    });
  };

  return (
    <>
      <Button
        hoverEffect="jump"
        onClick={handleOpen}
        shape="soft"
        size="small"
        startIcon={<AddRounded />}
      >
        {copy.groupWorkspace.createActions[kind]}
      </Button>

      <Dialog fullWidth maxWidth="sm" onClose={handleClose} open={isOpen}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>{copy.groupWorkspace.createActions[kind]}</DialogTitle>
          <DialogContent className="teacherGroups__createDialogContent">
            <p>{copy.groupWorkspace.createDescriptions[kind]}</p>
            <TextField autoFocus fullWidth label={copy.groupWorkspace.titleLabel} required />

            {kind === "material" ? (
              <div className="teacherGroups__createFieldGrid">
                <TextField
                  defaultValue="article"
                  fullWidth
                  label={copy.groupWorkspace.materialType}
                  select
                >
                  {Object.entries(copy.groupWorkspace.materialTypes).map(([value, label]) => (
                    <MenuItem key={value} value={value}>
                      {label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField defaultValue="PDF" fullWidth label={copy.groupWorkspace.format} select>
                  {["PDF", "DOCX", "WEB"].map((format) => (
                    <MenuItem key={format} value={format}>
                      {format}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            ) : null}

            {kind === "assignment" ? (
              <TextField
                fullWidth
                label={copy.groupWorkspace.dueDate}
                required
                slotProps={{ inputLabel: { shrink: true } }}
                type="date"
              />
            ) : null}

            {kind === "test" ? (
              <>
                <TextField
                  fullWidth
                  label={copy.groupWorkspace.date}
                  required
                  slotProps={{ inputLabel: { shrink: true } }}
                  type="date"
                />
                <div className="teacherGroups__createFieldGrid">
                  <TextField
                    fullWidth
                    label={copy.groupWorkspace.questions}
                    required
                    slotProps={{ htmlInput: { min: 1 } }}
                    type="number"
                  />
                  <TextField
                    fullWidth
                    label={copy.groupWorkspace.duration}
                    required
                    slotProps={{ htmlInput: { min: 1 } }}
                    type="number"
                  />
                </div>
              </>
            ) : null}
          </DialogContent>
          <DialogActions className="teacherGroups__createDialogActions">
            <Button onClick={handleClose} variant="ghost">
              {copy.common.cancel}
            </Button>
            <Button hoverEffect="jump" type="submit">
              {copy.common.savePreview}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
