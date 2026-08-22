"use client";

import ExpandMoreRounded from "@mui/icons-material/ExpandMoreRounded";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";

import type { Locale } from "@/config/Locales";
import styles from "@/css/public/contact.module.css";
import type { FaqItem } from "@/types/PublicContent";

type ContactFaqListProps = {
  items: FaqItem[];
  locale: Locale;
};

export function ContactFaqList({ items, locale }: ContactFaqListProps) {
  return (
    <div className={styles.contact__faqList}>
      {items.map((item, index) => (
        <Accordion className={styles.contact__faqItem} disableGutters elevation={0} key={item.id}>
          <AccordionSummary
            className={styles.contact__faqSummary}
            expandIcon={<ExpandMoreRounded />}
          >
            <span className={styles.contact__faqNumber}>{String(index + 1).padStart(2, "0")}</span>
            <h3 className={styles.contact__faqQuestion}>{item.question[locale]}</h3>
          </AccordionSummary>
          <AccordionDetails className={styles.contact__faqDetails}>
            <p className={styles.contact__faqAnswer}>{item.answer[locale]}</p>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
