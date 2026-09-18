import CheckCircleRounded from "@mui/icons-material/CheckCircleRounded";
import InfoOutlined from "@mui/icons-material/InfoOutlined";

import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { PageCopy } from "@/dictionaries/public/PageCopy";
import type { EventDetailFaqItem } from "@/types/EventDetail";

import { EventFaq } from "./EventFaq";

type EventPracticalInfoProps = {
  copy: PageCopy;
  faq: EventDetailFaqItem[];
  items: string[];
};

export function EventPracticalInfo({ copy, faq, items }: EventPracticalInfoProps) {
  return (
    <Section tone="background">
      <div className="events__practicalGrid">
        <Reveal>
          <section className="events__practicalPanel">
            <span className="events__practicalIcon">
              <InfoOutlined aria-hidden="true" />
            </span>
            <SectionHeading
              description={copy.events.practicalInfoDescription}
              title={copy.events.practicalInfoTitle}
            />
            <ul className="events__practicalList">
              {items.map((item) => (
                <li key={item}>
                  <CheckCircleRounded aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </Reveal>

        <Reveal delay={0.08}>
          <section className="events__detailFaqPanel">
            <SectionHeading description={copy.events.faqDescription} title={copy.events.faqTitle} />
            <EventFaq items={faq} />
          </section>
        </Reveal>
      </div>
    </Section>
  );
}
