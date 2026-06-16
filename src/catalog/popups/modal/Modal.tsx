import { useEffect, useState } from "react";
import "./Modal.css";

export function Modal() {
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
    <div className="modal-demo">
      <button className="modal-trigger" onClick={() => setOpen(true)}>
        Open modal
      </button>

      {open && (
        <div
          className="modal-backdrop"
          role="presentation"
          onClick={() => setOpen(false)}
        >
          <div
            className="modal-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              aria-label="Close"
              onClick={() => setOpen(false)}
            >
              ×
            </button>
            <h2 id="modal-title" className="modal-title">
              Welcome aboard
            </h2>
            <p className="modal-body">
              This is a self-contained dialog. Press Escape, click the backdrop,
              or use the close button to dismiss it.
            </p>
            <div className="modal-actions">
              <button
                className="modal-btn modal-btn--ghost"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
              <button
                className="modal-btn modal-btn--solid"
                onClick={() => setOpen(false)}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
