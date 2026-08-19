import { DraftNotice } from "@/components/ui/draft-notice";
import type { Locale } from "@/config/locales";
import type { PageCopy } from "@/dictionaries/page-copy";
import type { PublicEvent } from "@/types/public-content";

type EventTopicsProps = {
  event: PublicEvent;
  locale: Locale;
  copy: PageCopy;
};

export function EventTopics({ event, locale, copy }: EventTopicsProps) {
  return (
    <section>
      <DraftNotice badge={copy.common.draftBadge} note={copy.common.draftNote} />
      <h2 className="mt-10 text-3xl font-black tracking-[-0.04em] text-heading">
        {copy.events.topics}
      </h2>
      <ol className="mt-6 grid gap-4">
        {event.topics[locale].map((topic, index) => (
          <li
            key={topic}
            className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-5"
          >
            <span className="grid size-10 place-items-center rounded-full bg-sun text-sm font-black text-heading">
              {index + 1}
            </span>
            <span className="font-bold text-heading">{topic}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
