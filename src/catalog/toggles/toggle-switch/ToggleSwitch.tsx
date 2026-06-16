import "./ToggleSwitch.css";
import { useState } from "react";

interface ToggleSwitchProps {
  defaultChecked?: boolean;
  label?: string;
  onChange?: (checked: boolean) => void;
}

export function ToggleSwitch({
  defaultChecked = false,
  label = "Toggle",
  onChange,
}: ToggleSwitchProps) {
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
      className="toggle-switch"
      onClick={toggle}
    >
      <span className="toggle-switch__knob" />
    </button>
  );
}
