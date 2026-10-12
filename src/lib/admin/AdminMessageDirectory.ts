import type { AdminMessage, AdminMessageFilters } from "../../types/admin/AdminMessages";

export function filterAdminMessages(messages: AdminMessage[], filters: AdminMessageFilters) {
  const search = filters.search.trim().toLocaleLowerCase();
  const from = filters.from ? Date.parse(`${filters.from}T00:00:00+05:00`) : -Infinity;
  const to = filters.to ? Date.parse(`${filters.to}T23:59:59.999+05:00`) : Infinity;
  return messages
    .filter((message) => {
      const received = Date.parse(message.createdAt);
      return (
        (!filters.status || message.status === filters.status) &&
        received >= from &&
        received <= to &&
        (!search ||
          [message.name, message.email, message.phone, message.subject, message.message].some(
            (value) => value?.toLocaleLowerCase().includes(search),
          ))
      );
    })
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt) || a.id.localeCompare(b.id));
}
