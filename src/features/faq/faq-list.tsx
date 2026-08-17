"use client";

import ExpandMoreRounded from "@mui/icons-material/ExpandMoreRounded";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { useState } from "react";

import type { Locale } from "@/config/locales";
import type { PageCopy } from "@/dictionaries/page-copy";
import type { FaqCategory, FaqItem } from "@/types/public-content";

type FaqFilter = "all" | FaqCategory;

type FaqListProps = {
  items: FaqItem[];
  locale: Locale;
  copy: PageCopy;
};

export function FaqList({ items, locale, copy }: FaqListProps) {
  const [category, setCategory] = useState<FaqFilter>("all");
  const categories: FaqFilter[] = ["all", "courses", "format", "exams", "events", "registration"];
  const filteredItems = items.filter((item) => category === "all" || item.category === category);

  return (
    <div>
      <div className="mb-7 flex flex-wrap gap-2" aria-label={copy.faq.title}>
        {categories.map((item) => {
          const selected = category === item;
          return (
            <button
              key={item}
              type="button"
              aria-pressed={selected}
              onClick={() => setCategory(item)}
              className={`min-h-11 rounded-full border px-4 text-sm font-bold transition-colors ${
                selected
                  ? "border-transparent bg-(image:--gradient-cta) text-white"
                  : "border-border bg-surface text-heading hover:border-brand"
              }`}
            >
              {copy.faq.categories[item]}
            </button>
          );
        })}
      </div>
      <div className="space-y-3">
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
              <h2 className="pr-4 text-base font-extrabold text-heading sm:text-lg">
                {item.question[locale]}
              </h2>
            </AccordionSummary>
            <AccordionDetails sx={{ px: { xs: 2, sm: 2.5 }, pb: 2.5, pt: 0 }}>
              <p className="max-w-[75ch] text-sm leading-7 text-muted sm:text-base">
                {item.answer[locale]}
              </p>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
}
