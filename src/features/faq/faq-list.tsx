"use client";

import ExpandMoreRounded from "@mui/icons-material/ExpandMoreRounded";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";

import type { Locale } from "@/config/locales";
import type { PageCopy } from "@/dictionaries/page-copy";
import { useFaqFilter } from "@/hooks/useFaqFilter";
import type { FaqItem } from "@/types/public-content";

type FaqListProps = {
  items: FaqItem[];
  locale: Locale;
  copy: PageCopy;
};

export function FaqList({ items, locale, copy }: FaqListProps) {
  const { categories, category, filteredItems, setCategory } = useFaqFilter(items);

  return (
    <div>
      <div className="faq-list" aria-label={copy.faq.title}>
        {categories.map((item) => {
          const selected = category === item;
          return (
            <button
              key={item}
              type="button"
              aria-pressed={selected}
              onClick={() => setCategory(item)}
              className={`faq-filter ${selected ? "faq-filter--selected" : ""}`}
            >
              {copy.faq.categories[item]}
            </button>
          );
        })}
      </div>
      <div className="faq-list__2">
        {filteredItems.map((item) => (
          <Accordion
            key={item.id}
            disableGutters
            elevation={0}
            sx={{
              border: "1px solid var(--border)",
              borderRadius: "18px !important",
              backgroundColor: "var(--surface)",
              color: "var(--text)",
              overflow: "hidden",
              "&::before": { display: "none" },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreRounded />}
              sx={{
                minHeight: 64,
                px: { xs: 2, sm: 2.5 },
                "& .MuiAccordionSummary-content": { my: 2 },
              }}
            >
              <h2 className="faq-list__3">{item.question[locale]}</h2>
            </AccordionSummary>
            <AccordionDetails sx={{ px: { xs: 2, sm: 2.5 }, pb: 2.5, pt: 0 }}>
              <p className="faq-list__4">{item.answer[locale]}</p>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
}
