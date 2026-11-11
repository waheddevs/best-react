"use client";

import AutoAwesomeRounded from "@mui/icons-material/AutoAwesomeRounded";
import { IconButton } from "@/components/ui/IconButton";
import { useTeacherAi } from "@/hooks/teacher/ai/useTeacherAi";

export function TeacherAiLauncher() {
  /* HOOKS */
  const ai = useTeacherAi();

  if (ai.expanded) return null;

  return (
    <div className="teacherAi__launcherDock" data-open={ai.panelOpen}>
      <IconButton
        className="teacherAi__launcher"
        controlSize="large"
        variant="soft"
        label={ai.copy.open}
        title={ai.copy.open}
        disabled={ai.initializing}
        aria-expanded={ai.panelOpen}
        aria-controls={ai.panelOpen ? "teacher-ai-panel" : undefined}
        onClick={ai.handleOpen}
      >
        <AutoAwesomeRounded />
      </IconButton>
    </div>
  );
}
