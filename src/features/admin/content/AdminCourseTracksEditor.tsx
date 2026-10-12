"use client";

import AddRounded from "@mui/icons-material/AddRounded";
import DeleteOutlineRounded from "@mui/icons-material/DeleteOutlineRounded";
import { getAdminCourseEditorText } from "@/dictionaries/admin/AdminCourseEditor";
import type { Locale } from "@/config/Locales";

export function AdminCourseTracksEditor({
  locale,
  tracks,
  disabled,
  onChange,
  onAdd,
  onRemove,
}: {
  locale: Locale;
  tracks: Record<string, string>[];
  disabled: boolean;
  onChange: (index: number, field: string, value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
}) {
  const t = getAdminCourseEditorText(locale);
  return (
    <section className="adminCourseTracks" aria-label={t("tracksTitle")}>
      <header className="adminCourseTracks__header">
        <div>
          <h3>{t("tracksTitle")}</h3>
          <p>{t("tracksHelp")}</p>
        </div>
        <button
          className="adminCourseTracks__add"
          type="button"
          disabled={disabled || tracks.length >= 50}
          onClick={onAdd}
        >
          <AddRounded aria-hidden="true" />
          {t("addTrack")}
        </button>
      </header>
      {tracks.length === 0 ? (
        <p className="adminCourseTracks__empty">{t("noTracks")}</p>
      ) : (
        <div className="adminCourseTracks__list">
          {tracks.map((track, index) => (
            <article className="adminCourseTracks__card" key={index}>
              <header className="adminCourseTracks__cardHeader">
                <h4>
                  <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  {t("track")} {index + 1}
                </h4>
                <button
                  className="adminRegistry__action adminRegistry__action_delete"
                  type="button"
                  disabled={disabled}
                  onClick={() => onRemove(index)}
                  aria-label={`${t("removeTrack")} ${index + 1}`}
                  title={t("removeTrack")}
                >
                  <DeleteOutlineRounded aria-hidden="true" />
                </button>
              </header>
              <div className="adminRegistry__formGrid adminCourseTracks__fields">
                <label>
                  <span>{t("trackName")}</span>
                  <input
                    required
                    maxLength={240}
                    value={track.title ?? ""}
                    placeholder={t("trackNameHint")}
                    onChange={(event) => onChange(index, "title", event.target.value)}
                  />
                </label>
                <label>
                  <span>{t("trackLevel")}</span>
                  <input
                    required
                    maxLength={160}
                    value={track.level ?? ""}
                    placeholder={t("trackLevelHint")}
                    onChange={(event) => onChange(index, "level", event.target.value)}
                  />
                </label>
                <label>
                  <span>{t("trackSummary")}</span>
                  <textarea
                    required
                    rows={3}
                    maxLength={5000}
                    value={track.summary ?? ""}
                    placeholder={t("trackSummaryHint")}
                    onChange={(event) => onChange(index, "summary", event.target.value)}
                  />
                </label>
                <label>
                  <span>{t("trackHighlights")}</span>
                  <textarea
                    rows={3}
                    maxLength={5000}
                    value={track.highlights ?? ""}
                    placeholder={t("trackHighlightsHint")}
                    onChange={(event) => onChange(index, "highlights", event.target.value)}
                  />
                  <small>{t("trackHighlightsHelp")}</small>
                </label>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
