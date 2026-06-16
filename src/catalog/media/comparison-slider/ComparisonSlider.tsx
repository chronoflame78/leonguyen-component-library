import { useCallback, useEffect, useRef, useState } from "react";
import "./ComparisonSlider.css";

interface ComparisonSliderProps {
  /** CSS background for the "before" (left) panel. */
  before?: string;
  /** CSS background for the "after" (right) panel. */
  after?: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export function ComparisonSlider({
  before = "linear-gradient(135deg, #1e293b, #334155)",
  after = "linear-gradient(135deg, #f59e0b, #ec4899)",
  beforeLabel = "Before",
  afterLabel = "After",
}: ComparisonSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [split, setSplit] = useState(50);
  const [dragging, setDragging] = useState(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setSplit(Math.min(100, Math.max(0, pct)));
  }, []);

  useEffect(() => {
    if (!dragging) return;

    function handleMove(event: PointerEvent) {
      updateFromClientX(event.clientX);
    }

    function handleUp() {
      setDragging(false);
    }

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
    };
  }, [dragging, updateFromClientX]);

  return (
    <div
      ref={containerRef}
      className="comparison-slider"
      onPointerDown={(event) => {
        setDragging(true);
        updateFromClientX(event.clientX);
      }}
    >
      <div
        className="comparison-slider__panel comparison-slider__after"
        style={{ background: after }}
      >
        <span className="comparison-slider__label comparison-slider__label--right">
          {afterLabel}
        </span>
      </div>

      <div
        className="comparison-slider__panel comparison-slider__before"
        style={{ background: before, clipPath: `inset(0 ${100 - split}% 0 0)` }}
      >
        <span className="comparison-slider__label comparison-slider__label--left">
          {beforeLabel}
        </span>
      </div>

      <div
        className="comparison-slider__handle"
        style={{ left: `${split}%` }}
        role="slider"
        aria-label="Comparison position"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(split)}
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft")
            setSplit((s) => Math.max(0, s - 2));
          if (event.key === "ArrowRight")
            setSplit((s) => Math.min(100, s + 2));
        }}
      >
        <span className="comparison-slider__grip">⇆</span>
      </div>
    </div>
  );
}
