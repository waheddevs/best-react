import NorthEastRounded from "@mui/icons-material/NorthEastRounded";
import SouthEastRounded from "@mui/icons-material/SouthEastRounded";

import type { Locale } from "@/config/Locales";
import { getStudentProgressCopy } from "@/dictionaries/student/StudentProgress";
import type { StudentProgress } from "@/types/student/StudentProgress";

type StudentProgressChartProps = { locale: Locale; progress: StudentProgress };
type ChartPoint = { x: number; y: number };

const chartWidth = 1000;
const chartHeight = 400;
const chartInset = 8;
const percentageTicks = Array.from({ length: 6 }, (_, index) => 100 - index * 20);

function buildSmoothLine(points: ChartPoint[]): string {
  const first = points[0];
  if (!first) return "";

  let path = `M ${first.x} ${first.y}`;
  for (let index = 1; index < points.length; index += 1) {
    const previous = points[index - 1];
    const current = points[index];
    if (!previous || !current) continue;

    const before = points[index - 2] ?? previous;
    const next = points[index + 1] ?? current;
    const controlOffset = (current.x - previous.x) / 3;
    const firstControlY = previous.y + (current.y - before.y) / 6;
    const secondControlY = current.y - (next.y - previous.y) / 6;
    path += ` C ${previous.x + controlOffset} ${firstControlY} ${current.x - controlOffset} ${secondControlY} ${current.x} ${current.y}`;
  }
  return path;
}

export function StudentProgressChart({ locale, progress }: StudentProgressChartProps) {
  const copy = getStudentProgressCopy(locale);
  const points = progress.monthPoints.map(({ month, percentage }) => ({
    x: chartInset + (month * (chartWidth - chartInset * 2)) / 11,
    y: chartInset + ((100 - percentage) * (chartHeight - chartInset * 2)) / 100,
  }));
  const firstPoint = points[0];
  const lastPoint = points.at(-1);
  const linePoints = points.length === 1 && firstPoint
    ? firstPoint.x - chartInset >= 80
      ? [{ x: firstPoint.x - 80, y: firstPoint.y }, firstPoint]
      : [firstPoint, { x: firstPoint.x + 80, y: firstPoint.y }]
    : points;
  const linePath = buildSmoothLine(linePoints);
  const areaFirstPoint = linePoints[0];
  const areaLastPoint = linePoints.at(-1);
  const areaPath =
    linePoints.length > 1 && areaFirstPoint && areaLastPoint
      ? `${linePath} L ${areaLastPoint.x} ${chartHeight - chartInset} L ${areaFirstPoint.x} ${chartHeight - chartInset} Z`
      : "";
  const chartDescription = progress.monthPoints.length
    ? progress.monthPoints
        .map(({ month, percentage }) => `${copy.months[month]}: ${formatPercentage(percentage)}%`)
        .join(", ")
    : copy.empty;

  return (
    <section aria-labelledby="student-progress-chart-title" className="studentProgress__details">
      <div className="studentProgress__chartSummary">
        <h2 id="student-progress-chart-title">{copy.title}</h2>
        <strong>
          {progress.latestPercentage === null ? "—" : `${formatPercentage(progress.latestPercentage)}%`}
        </strong>
        <p>{copy.subtitle} · {progress.chartYear}</p>
        {progress.chartChange !== null ? (
          <div className="studentProgress__chartComparison" data-direction={progress.chartChange < 0 ? "down" : "up"}>
            <span>
              {progress.chartChange < 0 ? (
                <SouthEastRounded aria-hidden="true" />
              ) : (
                <NorthEastRounded aria-hidden="true" />
              )}
              {progress.chartChange > 0 ? "+" : ""}{formatPercentage(progress.chartChange)}%
            </span>
            <small>{copy.comparison}</small>
          </div>
        ) : (
          <p className="studentProgress__chartEmpty">{progress.latestPercentage === null ? copy.empty : copy.latest}</p>
        )}
      </div>

      <div aria-label={`${copy.title}, ${progress.chartYear}. ${chartDescription}`} className="studentProgress__chart" role="img">
        <div className="studentProgress__chartPlotRow">
          <div className="studentProgress__chartPlot">
            <svg
              aria-hidden="true"
              className="studentProgress__chartSvg"
              preserveAspectRatio="none"
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            >
              <defs>
                <linearGradient id="student-progress-area-gradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="var(--student-primary)" stopOpacity="0.24" />
                  <stop offset="100%" stopColor="var(--student-primary)" stopOpacity="0" />
                </linearGradient>
              </defs>
              {percentageTicks.map((tick) => {
                const y = chartInset + ((100 - tick) * (chartHeight - chartInset * 2)) / 100;
                return (
                  <line
                    className="studentProgress__chartGridline"
                    key={tick}
                    x1={chartInset}
                    x2={chartWidth - chartInset}
                    y1={y}
                    y2={y}
                  />
                );
              })}
              <path d={areaPath} fill="url(#student-progress-area-gradient)" />
              <path
                className="studentProgress__chartLine"
                d={linePath}
                fill="none"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            {lastPoint ? (
              <span
                aria-hidden="true"
                className="studentProgress__chartEndpoint"
                style={{
                  left: `${(lastPoint.x / chartWidth) * 100}%`,
                  top: `${(lastPoint.y / chartHeight) * 100}%`,
                }}
              />
            ) : null}
          </div>
          <div aria-hidden="true" className="studentProgress__chartYAxis">
            {percentageTicks.map((tick) => (
              <span key={tick}>{tick}%</span>
            ))}
          </div>
        </div>
        <div aria-hidden="true" className="studentProgress__chartXAxis">
          {copy.months.map((month, index) => (
            <span key={index}>{month}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function formatPercentage(value: number): string {
  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}
