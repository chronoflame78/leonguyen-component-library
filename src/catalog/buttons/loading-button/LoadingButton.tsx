import "./LoadingButton.css";
import type { ButtonHTMLAttributes } from "react";

type LoadingButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

export function LoadingButton({
  children = "Submit",
  loading = false,
  disabled,
  ...props
}: LoadingButtonProps) {
  return (
    <button
      className="loading-button"
      disabled={loading || disabled}
      aria-busy={loading}
      {...props}
    >
      {loading && <span className="loading-button__spinner" aria-hidden="true" />}
      <span className="loading-button__label">
        {loading ? "Loading…" : children}
      </span>
    </button>
  );
}
