import "./LabeledSwitch.css";
import { useState } from "react";

interface LabeledSwitchProps {
  defaultChecked?: boolean;
  label?: string;
  onChange?: (checked: boolean) => void;
}

export function LabeledSwitch({
  defaultChecked = false,
  label = "Toggle",
  onChange,
}: LabeledSwitchProps) {
  const [checked, setChecked] = useState(defaultChecked);

  function toggle() {
    const next = !checked;
    setChecked(next);
    onChange?.(next);
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      className="labeled-switch"
      onClick={toggle}
    >
      <span className="labeled-switch__track" aria-hidden="true">
        <span className="labeled-switch__icon labeled-switch__icon--on">
          <svg viewBox="0 0 24 24" width="13" height="13">
            <path
              d="M5 13l4 4L19 7"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span className="labeled-switch__icon labeled-switch__icon--off">
          <svg viewBox="0 0 24 24" width="13" height="13">
            <path
              d="M6 6l12 12M18 6L6 18"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </span>
      <span className="labeled-switch__knob" aria-hidden="true" />
    </button>
  );
}
