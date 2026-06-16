import "./Splitter.css";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

interface SplitterProps {
  start?: ReactNode;
  end?: ReactNode;
  /** Initial size of the first pane as a percentage of the total width. */
  defaultSplit?: number;
  /** Minimum percentage either pane may shrink to. */
  min?: number;
  /** Maximum percentage the first pane may grow to. */
  max?: number;
}

export function Splitter({
  start,
  end,
  defaultSplit = 50,
  min = 15,
  max = 85,
}: SplitterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [split, setSplit] = useState(defaultSplit);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    if (!dragging) return;

    const clamp = (value: number) => Math.min(max, Math.max(min, value));

    const handleMove = (event: PointerEvent) => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      if (rect.width === 0) return;
      const percent = ((event.clientX - rect.left) / rect.width) * 100;
      setSplit(clamp(percent));
    };

    const handleUp = () => setDragging(false);

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
    };
  }, [dragging, min, max]);

  return (
    <div
      ref={containerRef}
      className={"splitter" + (dragging ? " splitter--dragging" : "")}
    >
      <div className="splitter__pane" style={{ width: `${split}%` }}>
        {start}
      </div>
      <div
        className="splitter__handle"
        role="separator"
        aria-orientation="vertical"
        aria-valuenow={Math.round(split)}
        aria-valuemin={min}
        aria-valuemax={max}
        onPointerDown={() => setDragging(true)}
      >
        <span className="splitter__grip" />
      </div>
      <div className="splitter__pane" style={{ width: `${100 - split}%` }}>
        {end}
      </div>
    </div>
  );
}
