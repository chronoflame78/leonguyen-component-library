import "./Grid.css";
import type { ReactNode } from "react";

interface GridProps {
  children?: ReactNode;
  /** Minimum width of each column before the grid reflows, e.g. "12rem". */
  minColumnWidth?: string;
  /** Gap between grid items. */
  gap?: string;
}

export function Grid({
  children,
  minColumnWidth = "12rem",
  gap = "1rem",
}: GridProps) {
  return (
    <div
      className="auto-grid"
      style={{
        // CSS custom properties drive the auto-fill / minmax track sizing.
        ["--grid-min" as string]: minColumnWidth,
        ["--grid-gap" as string]: gap,
      }}
    >
      {children}
    </div>
  );
}
