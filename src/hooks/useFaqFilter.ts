"use client";

import { useState } from "react";

import type { FaqCategory, FaqItem } from "@/types/public-content";

export type FaqFilter = "all" | FaqCategory;

const faqCategories: FaqFilter[] = ["all", "courses", "format", "exams", "events", "registration"];

export function useFaqFilter(items: FaqItem[]) {
  const [category, setCategory] = useState<FaqFilter>("all");
  const filteredItems = items.filter((item) => category === "all" || item.category === category);

  return { categories: faqCategories, category, filteredItems, setCategory };
}
