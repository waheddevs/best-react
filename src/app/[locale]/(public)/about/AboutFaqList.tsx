"use client";

import ExpandMoreRounded from "@mui/icons-material/ExpandMoreRounded";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";

import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { StaggerItem } from "@/components/motion/StaggerItem";
import type { Locale } from "@/config/Locales";
import type { FaqItem } from "@/types/PublicContent";

type AboutFaqListProps = {
  items: FaqItem[];
  locale: Locale;
};

export function AboutFaqList({ items, locale }: AboutFaqListProps) {
  return (
    <StaggerGroup className="about__faqList">
      {items.map((item, index) => (
        <StaggerItem key={item.id}>
          <Accordion className="about__faqItem" disableGutters elevation={0}>
            <AccordionSummary className="about__faqSummary" expandIcon={<ExpandMoreRounded />}>
              <span className="about__faqNumber">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="about__faqQuestion">{item.question[locale]}</h3>
            </AccordionSummary>
            <AccordionDetails className="about__faqDetails">
              <p className="about__faqAnswer">{item.answer[locale]}</p>
            </AccordionDetails>
          </Accordion>
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}
