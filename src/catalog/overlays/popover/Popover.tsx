import { useEffect, useRef, useState } from "react";
import "./Popover.css";

export function Popover() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    function onClickOutside(event: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [open]);

  return (
    <div className="popover-demo">
      <div className="popover" ref={rootRef}>
        <button
          className="popover-trigger"
          aria-haspopup="dialog"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          Invite people
        </button>

        {open && (
          <div className="popover-panel" role="dialog" aria-label="Invite people">
            <div className="popover-arrow" />
            <h3 className="popover-title">Share access</h3>
            <p className="popover-desc">
              Anyone with the link can view this project.
            </p>
            <label className="popover-field">
              <span className="popover-label">Email address</span>
              <input
                className="popover-input"
                type="email"
                placeholder="name@example.com"
              />
            </label>
            <div className="popover-actions">
              <button
                className="popover-btn popover-btn--ghost"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
              <button
                className="popover-btn popover-btn--solid"
                onClick={() => setOpen(false)}
              >
                Send invite
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
