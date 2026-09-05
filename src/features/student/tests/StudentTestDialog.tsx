import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import Link from "next/link";

import type { Locale } from "@/config/Locales";
import type { StudentTestRunnerState } from "@/hooks/student/tests/useStudentTestRunner";
import type { StudentTestRunnerCopy } from "@/types/student/StudentTestRunner";

type StudentTestDialogProps = {
  copy: StudentTestRunnerCopy;
  locale: Locale;
  runner: StudentTestRunnerState;
};

export function StudentTestDialog({ copy, locale, runner }: StudentTestDialogProps) {
  const complete = runner.dialog === "complete";
  const exit = runner.dialog === "exit";

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      onClose={complete ? undefined : runner.handleDialogClose}
      open={runner.dialog !== null}
    >
      <DialogTitle>
        {complete ? copy.completionTitle : exit ? copy.exitTitle : copy.submitTitle}
      </DialogTitle>
      <DialogContent>
        {complete ? copy.completionBody : exit ? copy.exitBody : copy.submitBody}
      </DialogContent>
      <DialogActions>
        {complete || exit ? <Link href={`/${locale}/student/tests`}>{copy.backLabel}</Link> : null}
        {!complete ? (
          <button onClick={runner.handleDialogClose} type="button">
            {copy.previousLabel}
          </button>
        ) : null}
        {!complete && !exit ? (
          <button onClick={runner.handleSubmitConfirm} type="button">
            {copy.submitLabel}
          </button>
        ) : null}
      </DialogActions>
    </Dialog>
  );
}
