"use client";

import ExpandMoreRounded from "@mui/icons-material/ExpandMoreRounded";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";

import styles from "@/css/public/events.module.css";
import type { EventDetailFaqItem } from "@/types/EventDetail";

type EventFaqProps = {
  items: EventDetailFaqItem[];
};

export function EventFaq({ items }: EventFaqProps) {
  return (
    <div className={styles.events__detailFaqList}>
      {items.map((item) => (
        <Accordion className={styles.events__detailFaqItem} disableGutters key={item.question}>
          <AccordionSummary
            className={styles.events__detailFaqSummary}
            expandIcon={<ExpandMoreRounded aria-hidden="true" />}
          >
            <span>{item.question}</span>
          </AccordionSummary>
          <AccordionDetails className={styles.events__detailFaqDetails}>
            {item.answer}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
