"use client";

import { AdminWorkspaceError } from "@/features/admin/workspace/AdminWorkspaceError";

export default function Error({
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return <AdminWorkspaceError retry={retry} />;
}
