import type { CSSProperties } from "react";

export function AdminOverviewBrandMark() {
  return (
    <div className="adminOverviewBrandMark" aria-hidden="true">
      <div className="adminOverviewBrandMark__sculpture">
        {Array.from({ length: 10 }, (_, depth) => (
          <span
            key={depth}
            className="adminOverviewBrandMark__layer"
            style={{ "--logo-depth": `${depth}px` } as CSSProperties}
          />
        ))}
        <span className="adminOverviewBrandMark__face" />
      </div>
    </div>
  );
}
