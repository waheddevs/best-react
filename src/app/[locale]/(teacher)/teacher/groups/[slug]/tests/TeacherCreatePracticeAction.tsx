"use client";

import AddRounded from "@mui/icons-material/AddRounded";
import { useMutation } from "@apollo/client/react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/Button";
import type { Locale } from "@/config/Locales";
import { getTeacherPracticesCopy } from "@/dictionaries/teacher/TeacherPractices";
import { TeacherCreatePracticeTestDocument } from "@/gql/graphql";
import { useNotifications } from "@/hooks/notifications/useNotifications";

type TeacherCreatePracticeActionProps = {
  connected: boolean;
  groupId: string;
  locale: Locale;
  practicePathname: string;
};

export function TeacherCreatePracticeAction({
  connected,
  groupId,
  locale,
  practicePathname,
}: TeacherCreatePracticeActionProps) {
  const copy = getTeacherPracticesCopy(locale);
  const notifications = useNotifications();
  const router = useRouter();
  const [createPractice, { loading }] = useMutation(TeacherCreatePracticeTestDocument, {
    context: { authenticated: true },
  });

  const handleCreate = async () => {
    if (!connected) {
      notifications.info({ message: copy.createPracticeUnavailable, title: copy.createPractice });
      return;
    }

    try {
      const result = await createPractice({ variables: { input: { groupId } } });
      const practiceNumber = result.data?.createTeacherPracticeTest.testPaper.practiceNumber;
      if (practiceNumber === undefined)
        throw new Error("Practice test creation returned no number");

      router.push(`${practicePathname}/${String(practiceNumber)}`);
      router.refresh();
    } catch {
      notifications.error({ message: copy.createPracticeError, title: copy.createPractice });
    }
  };

  return (
    <Button
      aria-busy={loading}
      disabled={loading}
      hoverEffect="jump"
      onClick={() => void handleCreate()}
      shape="soft"
      size="small"
      startIcon={<AddRounded />}
    >
      {loading ? copy.creatingPractice : copy.createPractice}
    </Button>
  );
}
