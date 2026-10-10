import NorthEastRounded from "@mui/icons-material/NorthEastRounded";
import SouthEastRounded from "@mui/icons-material/SouthEastRounded";

import type { Locale } from "@/config/Locales";
import { getStudentProgressCopy } from "@/dictionaries/student/StudentProgress";
import type { StudentProgress } from "@/types/student/StudentProgress";

import { StudentProgressChartPlot } from "./StudentProgressChartPlot";

type StudentProgressChartProps = { locale: Locale; progress: StudentProgress };
export function StudentProgressChart({ locale, progress }: StudentProgressChartProps) {
  const copy = getStudentProgressCopy(locale);
  return (
    <section aria-labelledby="student-progress-chart-title" className="studentProgress__details">
      <div className="studentProgress__chartSummary">
        <h2 id="student-progress-chart-title">{copy.title}</h2>
        <strong>
          {progress.latestPercentage === null
            ? "—"
            : `${formatPercentage(progress.latestPercentage)}%`}
        </strong>
        <p>
          {copy.subtitle} · {progress.chartYear}
        </p>
        {progress.chartChange !== null ? (
          <div
            className="studentProgress__chartComparison"
            data-direction={progress.chartChange < 0 ? "down" : "up"}
          >
            <span>
              {progress.chartChange < 0 ? (
                <SouthEastRounded aria-hidden="true" />
              ) : (
                <NorthEastRounded aria-hidden="true" />
              )}
              {progress.chartChange > 0 ? "+" : ""}
              {formatPercentage(progress.chartChange)}%
            </span>
            <small>{copy.comparison}</small>
          </div>
        ) : (
          <p className="studentProgress__chartEmpty">
            {progress.latestPercentage === null ? copy.empty : copy.latest}
          </p>
        )}
      </div>

      <StudentProgressChartPlot locale={locale} history={progress.testPoints} />
    </section>
  );
}

function formatPercentage(value: number): string {
  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}
