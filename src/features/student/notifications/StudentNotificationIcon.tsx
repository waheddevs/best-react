import EventRounded from "@mui/icons-material/EventRounded";
import MenuBookRounded from "@mui/icons-material/MenuBookRounded";
import NotificationsRounded from "@mui/icons-material/NotificationsRounded";
import QuizRounded from "@mui/icons-material/QuizRounded";
import TrendingUpRounded from "@mui/icons-material/TrendingUpRounded";
import WorkspacePremiumRounded from "@mui/icons-material/WorkspacePremiumRounded";

type Props = { kind: string };

export function StudentNotificationIcon({ kind }: Props) {
  switch (kind) {
    case "DEMO_STUDENT_GROUP":
      return <EventRounded />;
    case "DEMO_STUDENT_LIBRARY":
      return <MenuBookRounded />;
    case "DEMO_STUDENT_TEST":
      return <QuizRounded />;
    case "DEMO_STUDENT_RESULT":
      return <WorkspacePremiumRounded />;
    case "DEMO_STUDENT_PROGRESS":
      return <TrendingUpRounded />;
    default:
      return <NotificationsRounded />;
  }
}
