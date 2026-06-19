import "./SegmentedToggle.css";
import { useState } from "react";

interface SegmentedToggleProps {
  options?: string[];
  defaultIndex?: number;
  label?: string;
  onChange?: (index: number) => void;
}

export function SegmentedToggle({
  options = ["Monthly", "Yearly"],
  defaultIndex = 0,
  label = "Billing period",
  onChange,
}: SegmentedToggleProps) {
  const [index, setIndex] = useState(defaultIndex);

  function select(next: number) {
    setIndex(next);
    onChange?.(next);
  }

  return (
    <div
      role="radiogroup"
      aria-label={label}
      className="segmented-toggle"
      style={{ "--count": options.length, "--index": index } as React.CSSProperties}
    >
      <span className="segmented-toggle__pill" aria-hidden="true" />
      {options.map((option, i) => (
        <button
          key={option}
          type="button"
          role="radio"
          aria-checked={i === index}
          tabIndex={i === index ? 0 : -1}
          className="segmented-toggle__option"
          onClick={() => select(i)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
