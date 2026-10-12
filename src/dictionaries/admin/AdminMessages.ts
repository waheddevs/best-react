import type { Locale } from "@/config/Locales";
import { getAdminContentText } from "./AdminContent";

const copy: Record<string, [string, string, string]> = {
  deleteMessage: ["Xabarni o‘chirish", "Удалить сообщение", "Delete message"],
  deleteMessageConfirm: [
    "{name} yuborgan xabar o‘chirilsinmi?",
    "Удалить сообщение от {name}?",
    "Delete the message from {name}?",
  ],
  messageDeleted: ["Xabar o‘chirildi.", "Сообщение удалено.", "Message deleted."],
  messages: ["Xabarlar", "Сообщения", "Inbox messages"],
  messagesHelp: [
    "Aloqa formasi orqali yuborilgan xabarlarni ko‘rib chiqing.",
    "Просматривайте сообщения из контактной формы сайта.",
    "Review messages submitted through the public contact form.",
  ],
  subject: ["Mavzu", "Тема", "Subject"],
  searchMessages: ["Xabarlarni qidirish", "Поиск сообщений", "Search messages"],
  statusSaved: ["Xabar statusi saqlandi.", "Статус сообщения сохранён.", "Message status saved."],
  statusSystemNote: [
    "Status Messages bo‘limidan yangilandi.",
    "Статус обновлён в разделе сообщений.",
    "Status updated from Messages.",
  ],
  dateRangeError: [
    "Boshlanish sanasi tugash sanasidan keyin bo‘lmasin.",
    "Начальная дата не должна быть позже конечной.",
    "From date must be on or before To date.",
  ],
};
export function getAdminMessagesText(locale: Locale) {
  const fallback = getAdminContentText(locale);
  return (key: string) =>
    copy[key]?.[locale === "uz" ? 0 : locale === "ru" ? 1 : 2] ?? fallback(key);
}
