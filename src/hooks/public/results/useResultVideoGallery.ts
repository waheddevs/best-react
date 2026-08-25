"use client";

import { useState } from "react";

import type { PublicResultVideo } from "@/types/PublicResult";

export function useResultVideoGallery() {
  /* HOOKS */

  const [activeStory, setActiveStory] = useState<PublicResultVideo | null>(null);

  /* HANDLERS */

  const handleOpen = (story: PublicResultVideo) => {
    setActiveStory(story);
  };

  const handleClose = () => {
    setActiveStory(null);
  };

  return { activeStory, handleClose, handleOpen };
}
