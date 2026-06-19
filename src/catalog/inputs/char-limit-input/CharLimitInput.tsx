import "./CharLimitInput.css";
import { useState } from "react";

interface CharLimitInputProps {
  maxLength?: number;
  placeholder?: string;
  defaultValue?: string;
}

const RADIUS = 9;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function CharLimitInput({
  maxLength = 50,
  placeholder = "Type here…",
  defaultValue = "",
}: CharLimitInputProps) {
  const [value, setValue] = useState(defaultValue.slice(0, maxLength));

  const used = value.length;
  const remaining = maxLength - used;
  const ratio = Math.min(used / maxLength, 1);
  const offset = CIRCUMFERENCE * (1 - ratio);

  // Color thresholds: indigo → amber (≤25% left) → rose (≤10% left).
  const level =
    remaining <= maxLength * 0.1
      ? "danger"
      : remaining <= maxLength * 0.25
        ? "warning"
        : "ok";

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={value}
        maxLength={maxLength}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        aria-describedby="char-limit-status"
        className="w-full rounded-lg border border-white/10 bg-white/[0.03] py-2.5 pl-3.5 pr-12 text-sm text-[#f8f8fc] placeholder:text-white/40 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/25"
      />
      <div
        id="char-limit-status"
        className={`char-limit-ring char-limit-ring--${level} absolute right-2 top-1/2 -translate-y-1/2`}
        role="status"
        aria-label={`${remaining} characters remaining`}
      >
        <svg width="24" height="24" viewBox="0 0 24 24">
          <circle
            className="char-limit-ring__track"
            cx="12"
            cy="12"
            r={RADIUS}
            fill="none"
            strokeWidth="2.5"
          />
          <circle
            className="char-limit-ring__progress"
            cx="12"
            cy="12"
            r={RADIUS}
            fill="none"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
            transform="rotate(-90 12 12)"
          />
        </svg>
        {remaining <= maxLength * 0.25 && (
          <span className="char-limit-ring__count">{remaining}</span>
        )}
      </div>
    </div>
  );
}
