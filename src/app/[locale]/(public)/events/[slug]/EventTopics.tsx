import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { StaggerItem } from "@/components/motion/StaggerItem";
import type { Locale } from "@/config/Locales";
import type { PageCopy } from "@/dictionaries/public/PageCopy";
import type { PublicEvent } from "@/types/PublicContent";

type EventTopicsProps = {
  event: PublicEvent;
  locale: Locale;
  copy: PageCopy;
};

export function EventTopics({ event, locale, copy }: EventTopicsProps) {
  return (
    <section aria-labelledby="event-topics-title" className="events__topics">
      <h2 className="events__topicsTitle" id="event-topics-title">
        {copy.events.topics}
      </h2>
      <StaggerGroup className="events__topicsList" delay={0.08}>
        {event.topics[locale].map((topic, index) => (
          <StaggerItem key={topic} initialScale={0.985}>
            <div className="events__topic">
              <span className="events__topicNumber">{String(index + 1).padStart(2, "0")}</span>
              <span className="events__topicText">{topic}</span>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
