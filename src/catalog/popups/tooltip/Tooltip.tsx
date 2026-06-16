import { useState } from "react";
import "./Tooltip.css";

export function Tooltip() {
  const [visible, setVisible] = useState(false);

  return (
    <div className="tooltip-demo">
      <div className="tooltip-wrap">
        <button
          className="tooltip-trigger"
          onMouseEnter={() => setVisible(true)}
          onMouseLeave={() => setVisible(false)}
          onFocus={() => setVisible(true)}
          onBlur={() => setVisible(false)}
          aria-describedby="tooltip-bubble"
        >
          Hover me
        </button>
        {visible && (
          <div id="tooltip-bubble" role="tooltip" className="tooltip-bubble">
            Helpful hint goes here
          </div>
        )}
      </div>
    </div>
  );
}
