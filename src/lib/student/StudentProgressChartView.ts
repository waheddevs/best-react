import type { StudentProgressTestPoint } from "@/types/student/StudentProgress";

export const progressChartWindowSize = 10;
export const progressChartWidth = 1000;
export const progressChartHeight = 400;
export const progressChartInset = 8;

export function buildStudentProgressChartView(
  history: readonly StudentProgressTestPoint[],
  offset = 0,
) {
  const maxOffset = Math.max(0, history.length - progressChartWindowSize);
  const safeOffset = Math.max(0, Math.min(maxOffset, offset));
  const end = history.length - safeOffset;
  const start = Math.max(0, end - progressChartWindowSize);
  const points = history.slice(start, end).map((point, index, visible) => ({
    ...point,
    x: ((index + 0.5) * progressChartWidth) / visible.length,
    y:
      progressChartInset +
      ((100 - Math.max(0, Math.min(100, point.percentage))) *
        (progressChartHeight - progressChartInset * 2)) /
        100,
  }));
  const groups: { key: string; month: number; year: number; count: number }[] = [];
  for (const point of points) {
    const date = new Date(point.submittedAt);
    const month = date.getUTCMonth();
    const year = date.getUTCFullYear();
    const key = `${year}-${month}`;
    const last = groups.at(-1);
    if (last?.key === key) last.count += 1;
    else groups.push({ key, month, year, count: 1 });
  }
  let linePath = points[0] ? `M ${points[0].x} ${points[0].y}` : "";
  for (let index = 1; index < points.length; index += 1) {
    const previous = points[index - 1];
    const current = points[index];
    const offsetX = (current.x - previous.x) / 3;
    linePath += ` C ${previous.x + offsetX} ${previous.y} ${current.x - offsetX} ${current.y} ${current.x} ${current.y}`;
  }
  const first = points[0];
  const last = points.at(-1);
  // A single actual result is a dot, never a fabricated trend line.
  const areaPath =
    points.length > 1 && first && last
      ? `${linePath} L ${last.x} ${progressChartHeight - progressChartInset} L ${first.x} ${progressChartHeight - progressChartInset} Z`
      : "";
  return { points, groups, linePath, areaPath, start, end, offset: safeOffset, maxOffset };
}
