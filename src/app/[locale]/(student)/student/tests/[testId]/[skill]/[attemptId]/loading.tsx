"use client";

import { getStudentTestsCopy } from "@/dictionaries/student/StudentTests";
import { useCurrentLocale } from "@/hooks/useCurrentLocale";

export default function StudentSimulatorLoading() {
  /* HOOKS */
  const locale = useCurrentLocale();
  const copy = getStudentTestsCopy(locale);

  return (
    <div className="studentTests__simulatorLoading" role="status">
      <span aria-hidden="true" className="studentTests__simulatorLoadingSpinner" />
      <span>{copy.startingLabel}</span>
    </div>
  );
}
