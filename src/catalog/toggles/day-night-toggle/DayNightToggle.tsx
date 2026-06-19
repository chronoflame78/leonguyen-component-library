import "./DayNightToggle.css";
import { useState } from "react";

interface DayNightToggleProps {
  defaultChecked?: boolean;
  label?: string;
  onChange?: (checked: boolean) => void;
}

export function DayNightToggle({
  defaultChecked = false,
  label = "Toggle day and night",
  onChange,
}: DayNightToggleProps) {
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
      className="day-night-toggle"
      onClick={toggle}
    >
      <span className="day-night-toggle__sky" />
      <span className="day-night-toggle__stars" aria-hidden="true">
        <i style={{ top: "20%", left: "18%" }} />
        <i style={{ top: "55%", left: "30%" }} />
        <i style={{ top: "32%", left: "45%" }} />
        <i style={{ top: "68%", left: "52%" }} />
      </span>
      <span className="day-night-toggle__clouds" aria-hidden="true">
        <i style={{ top: "60%", left: "22%" }} />
        <i style={{ top: "30%", left: "40%" }} />
      </span>
      <span className="day-night-toggle__knob">
        <span className="day-night-toggle__crater" style={{ top: "22%", left: "30%", width: "22%", height: "22%" }} />
        <span className="day-night-toggle__crater" style={{ top: "52%", left: "55%", width: "16%", height: "16%" }} />
        <span className="day-night-toggle__crater" style={{ top: "60%", left: "25%", width: "12%", height: "12%" }} />
      </span>
    </button>
  );
}
