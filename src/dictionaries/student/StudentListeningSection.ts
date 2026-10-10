import type { Locale } from "@/config/Locales";
import type { StudentListeningSectionCopy } from "@/types/student/StudentListeningSection";

const studentListeningSectionCopy: Record<Locale, StudentListeningSectionCopy> = {
  uz: {
    generalInstructionLabel: "Umumiy ko‘rsatma",
    generalInstruction:
      "Audioni ko‘pi bilan ikki marta tinglashingiz mumkin. Tinglash davomida {range}-savollarga javob bering va har bir savolning ko‘rsatmalariga amal qiling.",
  },
  ru: {
    generalInstructionLabel: "Общая инструкция",
    generalInstruction:
      "Аудио можно прослушать не более двух раз. Во время прослушивания ответьте на вопросы {range} и следуйте инструкциям к каждому вопросу.",
  },
  en: {
    generalInstructionLabel: "General instruction",
    generalInstruction:
      "You can play the audio up to two times. Answer questions {range} while listening and follow the instructions for each question.",
  },
};

export function getStudentListeningSectionCopy(locale: Locale): StudentListeningSectionCopy {
  return studentListeningSectionCopy[locale];
}
