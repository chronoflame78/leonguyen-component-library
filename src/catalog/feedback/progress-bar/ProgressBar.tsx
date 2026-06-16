import "./ProgressBar.css";

interface ProgressBarProps {
  value?: number;
  label?: string;
  showValue?: boolean;
}

export function ProgressBar({
  value = 0,
  label = "Uploading…",
  showValue = true,
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, Math.round(value)));

  return (
    <div className="progress-bar">
      <div className="progress-bar__head">
        <span className="progress-bar__label">{label}</span>
        {showValue && <span className="progress-bar__value">{clamped}%</span>}
      </div>
      <div
        className="progress-bar__track"
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <div className="progress-bar__fill" style={{ width: `${clamped}%` }} />
      </div>
    </div>
  );
}
