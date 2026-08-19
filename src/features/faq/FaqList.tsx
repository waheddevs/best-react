"use client";

import ExpandMoreRounded from "@mui/icons-material/ExpandMoreRounded";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";

import type { Locale } from "@/config/Locales";
import styles from "@/css/public/faq.module.css";
import type { PageCopy } from "@/dictionaries/public/PageCopy";
import { useFaqFilter } from "@/hooks/public/faq/useFaqFilter";
import type { FaqItem } from "@/types/PublicContent";

type FaqListProps = {
  items: FaqItem[];
  locale: Locale;
  copy: PageCopy;
};

export function FaqList({ items, locale, copy }: FaqListProps) {
  /* HOOKS */
  const faqFilter = useFaqFilter(items);
  const { category, categories, filteredItems } = faqFilter;

  /* HANDLERS */
  const { handleCategoryChange } = faqFilter;

  return (
    <div>
      <div className={styles.faq__filters} aria-label={copy.faq.title}>
        {categories.map((item) => {
          const selected = category === item;
          return (
            <button
              key={item}
              type="button"
              aria-pressed={selected}
              onClick={() => handleCategoryChange(item)}
              className={`${styles.faq__filter} ${selected ? styles.faq__filterActive : ""}`}
            >
              {copy.faq.categories[item]}
            </button>
          );
        })}
      </div>
      <div className={styles.faq__list}>
        {filteredItems.map((item) => (
          <Accordion key={item.id} disableGutters elevation={0} className={styles.faq__item}>
            <AccordionSummary expandIcon={<ExpandMoreRounded />} className={styles.faq__summary}>
              <h2 className={styles.faq__question}>{item.question[locale]}</h2>
            </AccordionSummary>
            <AccordionDetails className={styles.faq__details}>
              <p className={styles.faq__answer}>{item.answer[locale]}</p>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
}
