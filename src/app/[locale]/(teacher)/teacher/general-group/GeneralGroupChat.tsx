import type { Locale } from "@/config/Locales";
import { TeacherGeneralChat } from "@/features/teacher/chat/TeacherGeneralChat";
import type {
  TeacherCopy,
  TeacherLearner,
  TeacherMessage,
  TeacherProfileData,
} from "@/types/teacher/Teacher";

type GeneralGroupChatProps = {
  copy: TeacherCopy;
  learners: TeacherLearner[];
  locale: Locale;
  messages: TeacherMessage[];
  profile: TeacherProfileData;
};

export function GeneralGroupChat(props: GeneralGroupChatProps) {
  return <TeacherGeneralChat {...props} />;
}
