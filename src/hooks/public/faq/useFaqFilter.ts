import { useState } from "react";

import type { FaqCategory, FaqItem } from "@/types/PublicContent";

export type FaqFilter = "all" | FaqCategory;

const categories: FaqFilter[] = ["all", "courses", "format", "exams", "events", "registration"];

export function useFaqFilter(items: FaqItem[]) {
  /* HOOKS */
  const [category, setCategory] = useState<FaqFilter>("all");
  const filteredItems = items.filter((item) => category === "all" || item.category === category);

  /* HANDLERS */
  const handleCategoryChange = (nextCategory: FaqFilter) => {
    setCategory(nextCategory);
  };

  return { category, categories, filteredItems, handleCategoryChange };
}
