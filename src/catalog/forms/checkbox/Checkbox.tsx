import "./Checkbox.css";
import { useState } from "react";

interface CheckboxProps {
  label?: string;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
}

export function Checkbox({
  label = "Accept terms",
  defaultChecked = false,
  indeterminate = false,
  disabled = false,
  onChange,
}: CheckboxProps) {
  const [checked, setChecked] = useState(defaultChecked);

  function toggle() {
    if (disabled) return;
    const next = !checked;
    setChecked(next);
    onChange?.(next);
  }

  // When indeterminate, aria-checked is "mixed" and the box shows a dash.
  const ariaChecked = indeterminate ? "mixed" : checked;
  const stateClass = indeterminate
    ? "checkbox__box--indeterminate"
    : checked
    ? "checkbox__box--checked"
    : "";

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={ariaChecked}
      aria-label={label}
      disabled={disabled}
      className="checkbox"
      onClick={toggle}
    >
      <span className={`checkbox__box ${stateClass}`}>
        {indeterminate ? (
          <span className="checkbox__dash" aria-hidden="true" />
        ) : (
          <svg
            className="checkbox__check"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </span>
      <span className="checkbox__label">{label}</span>
    </button>
  );
}
