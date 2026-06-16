import { useState } from "react";

type AlertVariant = "info" | "success" | "warning" | "error";

interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  message?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
}

const variantStyles: Record<
  AlertVariant,
  { container: string; icon: string; title: string }
> = {
  info: {
    container: "border-sky-500/30 bg-sky-500/10",
    icon: "text-sky-400",
    title: "text-sky-200",
  },
  success: {
    container: "border-emerald-500/30 bg-emerald-500/10",
    icon: "text-emerald-400",
    title: "text-emerald-200",
  },
  warning: {
    container: "border-amber-500/30 bg-amber-500/10",
    icon: "text-amber-400",
    title: "text-amber-200",
  },
  error: {
    container: "border-rose-500/30 bg-rose-500/10",
    icon: "text-rose-400",
    title: "text-rose-200",
  },
};

function AlertIcon({ variant }: { variant: AlertVariant }) {
  const common = "h-5 w-5 shrink-0";
  switch (variant) {
    case "success":
      return (
        <svg className={common} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.7-9.3a1 1 0 0 0-1.4-1.4L9 10.6 7.7 9.3a1 1 0 0 0-1.4 1.4l2 2a1 1 0 0 0 1.4 0l4-4Z"
            clipRule="evenodd"
          />
        </svg>
      );
    case "warning":
      return (
        <svg className={common} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path
            fillRule="evenodd"
            d="M8.5 2.9a1.7 1.7 0 0 1 3 0l6.3 11a1.7 1.7 0 0 1-1.5 2.6H3.7a1.7 1.7 0 0 1-1.5-2.6l6.3-11ZM10 7a1 1 0 0 0-1 1v3a1 1 0 1 0 2 0V8a1 1 0 0 0-1-1Zm0 7.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z"
            clipRule="evenodd"
          />
        </svg>
      );
    case "error":
      return (
        <svg className={common} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM10 6a1 1 0 0 0-1 1v3a1 1 0 1 0 2 0V7a1 1 0 0 0-1-1Zm0 7.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z"
            clipRule="evenodd"
          />
        </svg>
      );
    case "info":
    default:
      return (
        <svg className={common} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm0-12a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm0 4a1 1 0 0 0-1 1v3a1 1 0 1 0 2 0v-3a1 1 0 0 0-1-1Z"
            clipRule="evenodd"
          />
        </svg>
      );
  }
}

export function Alert({
  variant = "info",
  title = "Heads up!",
  message = "This is an alert message with some helpful context.",
  dismissible = true,
  onDismiss,
}: AlertProps) {
  const [visible, setVisible] = useState(true);
  const styles = variantStyles[variant];

  if (!visible) return null;

  function dismiss() {
    setVisible(false);
    onDismiss?.();
  }

  return (
    <div
      role="alert"
      className={`flex w-full items-start gap-3 rounded-xl border px-4 py-3 ${styles.container}`}
    >
      <span className={styles.icon}>
        <AlertIcon variant={variant} />
      </span>
      <div className="min-w-0 flex-1">
        <p className={`text-sm font-semibold ${styles.title}`}>{title}</p>
        <p className="mt-0.5 text-sm text-white/70">{message}</p>
      </div>
      {dismissible && (
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss"
          className="-mr-1 -mt-1 rounded-md p-1 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
        >
          <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path d="M6.3 5a.9.9 0 0 0-1.3 1.3L8.7 10l-3.7 3.7A.9.9 0 1 0 6.3 15L10 11.3l3.7 3.7a.9.9 0 0 0 1.3-1.3L11.3 10 15 6.3A.9.9 0 0 0 13.7 5L10 8.7 6.3 5Z" />
          </svg>
        </button>
      )}
    </div>
  );
}
