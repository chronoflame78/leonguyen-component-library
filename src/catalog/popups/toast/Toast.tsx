import { useEffect, useRef, useState } from "react";
import "./Toast.css";

interface ToastItem {
  id: number;
  message: string;
}

const DISMISS_MS = 3000;

export function Toast() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const nextId = useRef(0);
  const timers = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map());

  function dismiss(id: number) {
    const timer = timers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }

  function push() {
    const id = nextId.current++;
    setToasts((current) => [...current, { id, message: "Changes saved successfully" }]);
    const timer = setTimeout(() => dismiss(id), DISMISS_MS);
    timers.current.set(id, timer);
  }

  useEffect(() => {
    const pending = timers.current;
    return () => {
      pending.forEach((timer) => clearTimeout(timer));
      pending.clear();
    };
  }, []);

  return (
    <div className="toast-demo">
      <button className="toast-trigger" onClick={push}>
        Show toast
      </button>

      <div className="toast-stack" aria-live="polite">
        {toasts.map((toast) => (
          <div key={toast.id} role="status" className="toast">
            <span className="toast-icon" aria-hidden="true">
              ✓
            </span>
            <span className="toast-message">{toast.message}</span>
            <button
              className="toast-close"
              aria-label="Dismiss"
              onClick={() => dismiss(toast.id)}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
