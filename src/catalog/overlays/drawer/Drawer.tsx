import { useEffect, useState } from "react";
import "./Drawer.css";

export function Drawer() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="drawer-demo">
      <button className="drawer-trigger" onClick={() => setOpen(true)}>
        Open drawer
      </button>

      {open && (
        <div
          className="drawer-backdrop"
          role="presentation"
          onClick={() => setOpen(false)}
        >
          <aside
            className="drawer-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="drawer-title"
            onClick={(event) => event.stopPropagation()}
          >
            <header className="drawer-header">
              <h2 id="drawer-title" className="drawer-title">
                Settings
              </h2>
              <button
                className="drawer-close"
                aria-label="Close"
                onClick={() => setOpen(false)}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </header>

            <div className="drawer-body">
              <p className="drawer-text">
                This panel slides in from the side. Click the backdrop, press
                Escape, or use the close button to dismiss it.
              </p>
              <label className="drawer-row">
                <span>Notifications</span>
                <span className="drawer-pill">On</span>
              </label>
              <label className="drawer-row">
                <span>Dark mode</span>
                <span className="drawer-pill">On</span>
              </label>
              <label className="drawer-row">
                <span>Auto-save</span>
                <span className="drawer-pill drawer-pill--off">Off</span>
              </label>
            </div>

            <footer className="drawer-footer">
              <button
                className="drawer-btn drawer-btn--ghost"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
              <button
                className="drawer-btn drawer-btn--solid"
                onClick={() => setOpen(false)}
              >
                Save
              </button>
            </footer>
          </aside>
        </div>
      )}
    </div>
  );
}
