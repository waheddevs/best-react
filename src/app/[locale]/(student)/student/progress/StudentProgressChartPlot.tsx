"use client";

import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import { useId, useRef, useState } from "react";

import type { Locale } from "@/config/Locales";
import { getStudentProgressCopy } from "@/dictionaries/student/StudentProgress";
import { getStudentTestsCopy } from "@/dictionaries/student/StudentTests";
import {
  buildStudentProgressChartView,
  progressChartHeight,
  progressChartInset,
  progressChartWidth,
  progressChartWindowSize,
} from "@/lib/student/StudentProgressChartView";
import type { StudentProgressTestPoint } from "@/types/student/StudentProgress";

const ticks = [100, 80, 60, 40, 20, 0];

export function StudentProgressChartPlot({
  locale,
  history,
}: {
  locale: Locale;
  history: readonly StudentProgressTestPoint[];
}) {
  const copy = getStudentProgressCopy(locale);
  const testsCopy = getStudentTestsCopy(locale);
  const gradientId = useId();
  const tooltipId = useId();
  const [offset, setOffset] = useState(0);
  const [activeId, setActiveId] = useState<string | null>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const view = buildStudentProgressChartView(history, offset);
  const changeWindow = (direction: number) => {
    setOffset(
      Math.max(
        0,
        Math.min(view.maxOffset, view.offset + direction * (progressChartWindowSize - 1)),
      ),
    );
    setActiveId(null);
  };

  return (
    <div
      className="studentProgress__chart"
      role="group"
      aria-label={copy.testHistory}
      onTouchStart={(event) => {
        const touch = event.touches[0];
        touchStart.current = touch ? { x: touch.clientX, y: touch.clientY } : null;
      }}
      onTouchCancel={() => {
        touchStart.current = null;
      }}
      onTouchEnd={(event) => {
        const start = touchStart.current;
        const touch = event.changedTouches[0];
        touchStart.current = null;
        if (!start || !touch) return;
        const dx = touch.clientX - start.x;
        const dy = touch.clientY - start.y;
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) changeWindow(dx > 0 ? 1 : -1);
      }}
    >
      <div className="studentProgress__chartToolbar">
        <span className="studentProgress__chartRange" aria-live="polite" aria-atomic="true">
          {history.length ? `${view.start + 1}–${view.end} / ${history.length}` : copy.empty}
        </span>
        {history.length > progressChartWindowSize ? (
          <nav aria-label={copy.testHistory}>
            <button
              type="button"
              aria-label={copy.olderTests}
              title={copy.olderTests}
              disabled={view.offset >= view.maxOffset}
              onClick={() => changeWindow(1)}
            >
              <ArrowBackRounded aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label={copy.newerTests}
              title={copy.newerTests}
              disabled={view.offset === 0}
              onClick={() => changeWindow(-1)}
            >
              <ArrowForwardRounded aria-hidden="true" />
            </button>
          </nav>
        ) : null}
      </div>
      <div className="studentProgress__chartPlotRow">
        <div className="studentProgress__chartPlot">
          <svg
            aria-hidden="true"
            className="studentProgress__chartSvg"
            preserveAspectRatio="none"
            viewBox={`0 0 ${progressChartWidth} ${progressChartHeight}`}
          >
            <defs>
              <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="var(--student-primary)" stopOpacity="0.15" />
                <stop offset="100%" stopColor="var(--student-primary)" stopOpacity="0.01" />
              </linearGradient>
            </defs>
            {ticks.map((tick) => {
              const y =
                progressChartInset +
                ((100 - tick) * (progressChartHeight - progressChartInset * 2)) / 100;
              return (
                <line
                  className="studentProgress__chartGridline"
                  key={tick}
                  x1={progressChartInset}
                  x2={progressChartWidth - progressChartInset}
                  y1={y}
                  y2={y}
                />
              );
            })}
            {view.areaPath ? <path d={view.areaPath} fill={`url(#${gradientId})`} /> : null}
            {view.points.length > 1 ? (
              <path
                className="studentProgress__chartLine"
                d={view.linePath}
                fill="none"
                vectorEffect="non-scaling-stroke"
              />
            ) : null}
          </svg>
          {view.points.map((point) => {
            const title =
              point.practiceNumber === null
                ? point.title
                : `${testsCopy.practiceTestLabel} ${point.practiceNumber}`;
            const date = new Date(point.submittedAt);
            const dateLabel = `${date.getUTCDate()} ${copy.months[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
            const score = `${Number.isInteger(point.percentage) ? point.percentage : point.percentage.toFixed(1)}%`;
            const active = activeId === point.paperId;
            return (
              <div
                key={point.paperId}
                className="studentProgress__chartPoint"
                data-active={active}
                data-edge={
                  point.x < progressChartWidth * 0.35
                    ? "start"
                    : point.x > progressChartWidth * 0.65
                      ? "end"
                      : "middle"
                }
                data-placement={point.percentage > 60 ? "below" : "above"}
                style={{
                  left: `${(point.x / progressChartWidth) * 100}%`,
                  top: `${(point.y / progressChartHeight) * 100}%`,
                }}
                onMouseEnter={() => setActiveId(point.paperId)}
                onMouseLeave={() => setActiveId(null)}
              >
                <button
                  type="button"
                  aria-label={`${title}, ${dateLabel}: ${score}, ${point.scoredSkillCount}/4 ${copy.gradedSkills}`}
                  aria-describedby={active ? tooltipId : undefined}
                  onFocus={() => setActiveId(point.paperId)}
                  onBlur={() => setActiveId(null)}
                  onClick={() => setActiveId(point.paperId)}
                  onKeyDown={(event) => {
                    if (event.key === "Escape") setActiveId(null);
                  }}
                >
                  <span aria-hidden="true" />
                </button>
                {active ? (
                  <div id={tooltipId} role="tooltip" className="studentProgress__chartTooltip">
                    <strong>{title}</strong>
                    <span>{dateLabel}</span>
                    <b>{score}</b>
                    <small>
                      {point.scoredSkillCount}/4 {copy.gradedSkills}
                    </small>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
        <div aria-hidden="true" className="studentProgress__chartYAxis">
          {ticks.map((tick) => (
            <span key={tick}>{tick}%</span>
          ))}
        </div>
      </div>
      <div aria-hidden="true" className="studentProgress__chartXAxis">
        {view.groups.map((group) => (
          <span key={group.key} style={{ flex: group.count }}>
            {copy.months[group.month]} <small>{group.year}</small>
          </span>
        ))}
      </div>
      <p className="studentProgress__chartHint">{copy.chartGrouping}</p>
    </div>
  );
}
