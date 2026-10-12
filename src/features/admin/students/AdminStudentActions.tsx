"use client";

import { useMutation } from "@apollo/client/react";
import DeleteOutlineRounded from "@mui/icons-material/DeleteOutlineRounded";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import { useRouter } from "next/navigation";

import { AdminDeleteStudentDocument } from "@/gql/graphql";
import { useConfirmDialog } from "@/hooks/notifications/useConfirmDialog";
import { useNotifications } from "@/hooks/notifications/useNotifications";
import type { AdminStudentsCopy } from "@/types/admin/AdminStudents";

type AdminStudentActionsProps = {
  copy: AdminStudentsCopy;
  onDetails: () => void;
  name: string;
  onDeleted: (studentId: string) => void;
  studentId: string;
};

export function AdminStudentActions({
  copy,
  onDetails,
  name,
  onDeleted,
  studentId,
}: AdminStudentActionsProps) {
  const confirm = useConfirmDialog();
  const notifications = useNotifications();
  const router = useRouter();
  const [deleteStudent, { loading: isDeleting }] = useMutation(AdminDeleteStudentDocument, {
    context: { authenticated: true },
    fetchPolicy: "no-cache",
  });

  const handleDelete = async () => {
    if (isDeleting) return;
    const accepted = await confirm({
      brand: "admin",
      cancelLabel: copy.deleteCancelLabel,
      confirmLabel: copy.deleteConfirmLabel,
      icon: "delete",
      message: copy.deleteMessage.replace("{name}", name),
      title: copy.deleteTitle,
      tone: "danger",
    });
    if (!accepted) return;

    try {
      const result = await deleteStudent({ variables: { input: { studentId } } });
      if (result.data?.adminDeleteStudent.user.status !== "DELETED") {
        throw new Error("Delete failed");
      }

      onDeleted(studentId);
      notifications.success({
        icon: "delete",
        title: copy.deleteLabel,
        message: copy.deleteSuccessLabel.replace("{name}", name),
      });
      router.refresh();
    } catch {
      notifications.error({ title: copy.deleteLabel, message: copy.deleteErrorLabel });
    }
  };

  return (
    <div className="adminWorkspace__studentActions">
      <button
        type="button"
        aria-label={`${copy.detailsLabel}: ${name}`}
        className="adminWorkspace__studentAction adminWorkspace__studentAction_details"
        onClick={onDetails}
        title={copy.detailsLabel}
      >
        <InfoOutlined aria-hidden="true" />
      </button>
      <button
        aria-label={`${copy.deleteLabel}: ${name}`}
        className="adminWorkspace__studentAction adminWorkspace__studentAction_delete"
        disabled={isDeleting}
        onClick={handleDelete}
        title={copy.deleteLabel}
        type="button"
      >
        <DeleteOutlineRounded aria-hidden="true" />
      </button>
    </div>
  );
}
