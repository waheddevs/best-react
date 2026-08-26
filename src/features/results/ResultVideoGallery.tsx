"use client";

import CloseRounded from "@mui/icons-material/CloseRounded";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import Dialog from "@mui/material/Dialog";
import Image from "next/image";

import { IconButton } from "@/components/ui/IconButton";
import type { Locale } from "@/config/Locales";
import { publicResultVideos } from "@/data/PublicResults";
import styles from "@/css/public/results.module.css";
import type { PageCopy } from "@/dictionaries/public/PageCopy";
import { useResultVideoGallery } from "@/hooks/public/results/useResultVideoGallery";

type ResultVideoGalleryProps = {
  copy: PageCopy["results"];
  locale: Locale;
};

export function ResultVideoGallery({ copy, locale }: ResultVideoGalleryProps) {
  /* HOOKS */

  const { activeStory, handleClose, handleOpen } = useResultVideoGallery();

  const activeTitle = activeStory?.title[locale] ?? "";

  return (
    <>
      <div className={styles.results__storiesGrid}>
        {publicResultVideos.map((story) => {
          const title = story.title[locale];

          return (
            <article className={styles.results__storyCard} key={story.key}>
              <button
                aria-label={copy.playLabel.replace("{title}", title)}
                className={styles.results__storyMedia}
                onClick={() => handleOpen(story)}
                type="button"
              >
                <Image
                  alt=""
                  className={styles.results__storyPoster}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  src={story.posterSrc}
                />
                <span className={styles.results__storyShade} />
                <span aria-hidden="true" className={styles.results__storyPlay}>
                  <PlayArrowRounded />
                </span>
              </button>
            </article>
          );
        })}
      </div>

      <Dialog
        aria-label={activeTitle}
        maxWidth={false}
        onClose={handleClose}
        open={activeStory !== null}
        slotProps={{
          backdrop: { className: styles.results__videoBackdrop },
          paper: { className: styles.results__videoDialog },
        }}
      >
        {activeStory ? (
          <div className={styles.results__videoDialogContent}>
            <IconButton
              className={styles.results__videoClose}
              label={copy.closeLabel}
              onClick={handleClose}
              variant="soft"
            >
              <CloseRounded />
            </IconButton>
            <video
              autoPlay
              className={styles.results__videoPlayer}
              controls
              key={activeStory.key}
              playsInline
              poster={activeStory.posterSrc}
              preload="metadata"
            >
              <source src={activeStory.videoSrc} type="video/mp4" />
            </video>
          </div>
        ) : null}
      </Dialog>
    </>
  );
}
