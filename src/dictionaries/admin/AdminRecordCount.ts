import type { Locale } from "@/config/Locales";
import type { AdminNavigationKey } from "@/types/admin/AdminWorkspace";

export type AdminCountSection = AdminNavigationKey | "sessions";
type CountForms = { uz: string; en: [string, string]; ru: [string, string, string] };

const recordForms: CountForms = {
  uz: "yozuv",
  en: ["record", "records"],
  ru: ["запись", "записи", "записей"],
};
const forms: Record<AdminCountSection, CountForms> = {
  dashboard: recordForms,
  settings: recordForms,
  students: { uz: "talaba", en: ["student", "students"], ru: ["студент", "студента", "студентов"] },
  teachers: {
    uz: "o‘qituvchi",
    en: ["teacher", "teachers"],
    ru: ["преподаватель", "преподавателя", "преподавателей"],
  },
  groups: { uz: "guruh", en: ["group", "groups"], ru: ["группа", "группы", "групп"] },
  courses: { uz: "kurs", en: ["course", "courses"], ru: ["курс", "курса", "курсов"] },
  events: {
    uz: "tadbir",
    en: ["event", "events"],
    ru: ["мероприятие", "мероприятия", "мероприятий"],
  },
  exams: { uz: "imtihon", en: ["exam", "exams"], ru: ["экзамен", "экзамена", "экзаменов"] },
  sessions: { uz: "sessiya", en: ["session", "sessions"], ru: ["сессия", "сессии", "сессий"] },
  schedule: { uz: "dars", en: ["lesson", "lessons"], ru: ["урок", "урока", "уроков"] },
  payments: { uz: "to‘lov", en: ["payment", "payments"], ru: ["платёж", "платежа", "платежей"] },
  salary: {
    uz: "ish haqi hisoboti",
    en: ["salary record", "salary records"],
    ru: ["расчёт", "расчёта", "расчётов"],
  },
  requests: { uz: "ariza", en: ["request", "requests"], ru: ["заявка", "заявки", "заявок"] },
  messages: {
    uz: "xabar",
    en: ["message", "messages"],
    ru: ["сообщение", "сообщения", "сообщений"],
  },
  notifications: {
    uz: "bildirishnoma",
    en: ["notification", "notifications"],
    ru: ["уведомление", "уведомления", "уведомлений"],
  },
};

export function getAdminRecordLabel(
  locale: Locale,
  section: AdminCountSection,
  count: number,
): string {
  const labels = forms[section];
  if (locale === "uz") return labels.uz;
  const category = new Intl.PluralRules(locale).select(count);
  if (locale === "en") return labels.en[category === "one" ? 0 : 1];
  return labels.ru[category === "one" ? 0 : category === "few" ? 1 : 2];
}
