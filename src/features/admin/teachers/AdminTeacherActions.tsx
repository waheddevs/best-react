"use client";

import { useMutation } from "@apollo/client/react";
import DeleteOutlineRounded from "@mui/icons-material/DeleteOutlineRounded";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import Link from "next/link";
import { useRouter } from "next/navigation";

import type { Locale } from "@/config/Locales";
import { AdminDeleteTeacherDocument } from "@/gql/graphql";
import { useConfirmDialog } from "@/hooks/notifications/useConfirmDialog";
import { useNotifications } from "@/hooks/notifications/useNotifications";
import type { AdminTeachersCopy } from "@/types/admin/AdminTeachers";

type AdminTeacherActionsProps = {
  copy: AdminTeachersCopy;
  href: string;
  locale: Locale;
  name: string;
  onDeleted: (teacherId: string) => void;
  teacherId: string;
};

export function AdminTeacherActions({
  copy,
  href,
  locale,
  name,
  onDeleted,
  teacherId,
}: AdminTeacherActionsProps) {
  const confirm = useConfirmDialog();
  const notifications = useNotifications();
  const router = useRouter();
  const [deleteTeacher, { loading: isDeleting }] = useMutation(AdminDeleteTeacherDocument, {
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
      const result = await deleteTeacher({ variables: { input: { teacherId } } });
      if (result.data?.adminDeleteTeacher.user.status !== "DELETED") {
        throw new Error("Delete failed");
      }

      onDeleted(teacherId);
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
    <div className="adminTeachers__actions">
      <Link
        aria-label={`${copy.detailsLabel}: ${name}`}
        className="adminTeachers__action adminTeachers__action_details"
        href={`/${locale}${href}`}
        title={copy.detailsLabel}
      >
        <InfoOutlined aria-hidden="true" />
      </Link>
      <button
        aria-label={`${copy.deleteLabel}: ${name}`}
        className="adminTeachers__action adminTeachers__action_delete"
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
