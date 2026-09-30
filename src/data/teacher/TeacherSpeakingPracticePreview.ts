import type { Locale } from "@/config/Locales";
import type { TeacherSpeakingPromptSet } from "@/types/teacher/TeacherSpeaking";

// Fictional IELTS-style preview prompts. Replace with teacher-authored backend content later.
const promptSets: Record<Locale, TeacherSpeakingPromptSet> = {
  uz: {
    part1: {
      topic: "O‘qish va kundalik tartib",
      questions: [
        "Hozir ishlaysizmi yoki o‘qiysizmi?",
        "O‘qishingizning qaysi jihati sizga ko‘proq yoqadi?",
        "Odatdagi o‘qish kuningiz qanday o‘tadi?",
        "Kelajakda o‘qish tartibingiz o‘zgaradi deb o‘ylaysizmi?",
      ],
    },
    part2: {
      prompt: "Sizga foydali narsani o‘rgatgan inson haqida gapiring.",
      points: [
        "u inson kim bo‘lganini",
        "sizga nimani o‘rgatganini",
        "bu qachon sodir bo‘lganini",
        "nega bu siz uchun foydali bo‘lganini tushuntiring",
      ],
      followUp: "Bu ko‘nikmadan hozir ham foydalanasizmi?",
    },
    part3: {
      topic: "Ta’lim va ko‘nikmalar",
      questions: [
        "Insonlar hayotida qaysi ko‘nikmalar eng muhim?",
        "Maktablar amaliy ko‘nikmalarga ko‘proq vaqt ajratishi kerakmi?",
        "Texnologiya insonlarning yangi ko‘nikma o‘rganish usulini qanday o‘zgartirdi?",
        "Kelajakda o‘qituvchining roli qanday o‘zgarishi mumkin?",
      ],
    },
  },
  ru: {
    part1: {
      topic: "Учёба и распорядок дня",
      questions: [
        "Вы сейчас работаете или учитесь?",
        "Что вам больше всего нравится в вашей учёбе?",
        "Как обычно проходит ваш учебный день?",
        "Как вы думаете, изменится ли ваш распорядок учёбы в будущем?",
      ],
    },
    part2: {
      prompt: "Расскажите о человеке, который научил вас чему-то полезному.",
      points: [
        "кто был этот человек",
        "чему он вас научил",
        "когда это произошло",
        "почему это оказалось полезным для вас",
      ],
      followUp: "Вы всё ещё используете этот навык?",
    },
    part3: {
      topic: "Образование и навыки",
      questions: [
        "Какие навыки наиболее важны в жизни человека?",
        "Следует ли школам уделять больше времени практическим навыкам?",
        "Как технологии изменили способы приобретения новых навыков?",
        "Как роль учителя может измениться в будущем?",
      ],
    },
  },
  en: {
    part1: {
      topic: "Studies and daily routines",
      questions: [
        "Do you currently work or study?",
        "What do you enjoy most about your studies?",
        "What does a typical study day look like for you?",
        "Do you think your study routine will change in the future?",
      ],
    },
    part2: {
      prompt: "Describe a person who taught you something useful.",
      points: [
        "who the person was",
        "what they taught you",
        "when this happened",
        "explain why it was useful to you",
      ],
      followUp: "Do you still use this skill today?",
    },
    part3: {
      topic: "Education and skills",
      questions: [
        "Which skills are most important in a person’s life?",
        "Should schools spend more time teaching practical skills?",
        "How has technology changed the way people learn new skills?",
        "How might the role of teachers change in the future?",
      ],
    },
  },
};

export function getTeacherSpeakingPrompts(locale: Locale) {
  return promptSets[locale];
}
