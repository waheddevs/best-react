"use client";

import ExpandMoreRounded from "@mui/icons-material/ExpandMoreRounded";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";

import type { EventDetailFaqItem } from "@/types/EventDetail";

type EventFaqProps = {
  items: EventDetailFaqItem[];
};

export function EventFaq({ items }: EventFaqProps) {
  return (
    <div className="events__detailFaqList">
      {items.map((item) => (
        <Accordion className="events__detailFaqItem" disableGutters key={item.question}>
          <AccordionSummary
            className="events__detailFaqSummary"
            expandIcon={<ExpandMoreRounded aria-hidden="true" />}
          >
            <span>{item.question}</span>
          </AccordionSummary>
          <AccordionDetails className="events__detailFaqDetails">{item.answer}</AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
