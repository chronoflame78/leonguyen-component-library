import { useState } from "react";

interface StepperProps {
  steps?: string[];
}

const DEFAULT_STEPS = ["Cart", "Shipping", "Payment", "Done"];

function Check() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

export function Stepper({ steps = DEFAULT_STEPS }: StepperProps) {
  const [active, setActive] = useState(0);
  const lastIndex = steps.length - 1;

  return (
    <div className="w-full max-w-md">
      <ol className="flex items-center">
        {steps.map((step, i) => {
          const isCompleted = i < active;
          const isActive = i === active;
          const isLast = i === lastIndex;

          return (
            <li
              key={step}
              className={`flex items-center${isLast ? "" : " flex-1"}`}
            >
              <div className="flex flex-col items-center gap-2">
                <span
                  className={
                    isCompleted
                      ? "flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white shadow-lg shadow-fuchsia-500/30"
                      : isActive
                        ? "flex h-9 w-9 items-center justify-center rounded-full border-2 border-fuchsia-400 bg-fuchsia-500/10 text-sm font-semibold text-fuchsia-300"
                        : "flex h-9 w-9 items-center justify-center rounded-full border-2 border-white/15 text-sm font-semibold text-slate-500"
                  }
                  aria-current={isActive ? "step" : undefined}
                >
                  {isCompleted ? <Check /> : i + 1}
                </span>
                <span
                  className={
                    isCompleted || isActive
                      ? "text-xs font-medium text-white"
                      : "text-xs font-medium text-slate-500"
                  }
                >
                  {step}
                </span>
              </div>
              {!isLast && (
                <span
                  className={
                    isCompleted
                      ? "mx-2 -mt-6 h-0.5 flex-1 rounded bg-gradient-to-r from-indigo-500 to-fuchsia-500"
                      : "mx-2 -mt-6 h-0.5 flex-1 rounded bg-white/15"
                  }
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>

      <div className="mt-8 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setActive((p) => Math.max(p - 1, 0))}
          disabled={active === 0}
          className="rounded-lg border border-white/10 px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:border-white/20 hover:bg-white/5 hover:text-white disabled:pointer-events-none disabled:opacity-40"
        >
          Back
        </button>
        <button
          type="button"
          onClick={() => setActive((p) => Math.min(p + 1, lastIndex))}
          disabled={active === lastIndex}
          className="rounded-lg bg-gradient-to-br from-indigo-500 to-fuchsia-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/30 transition-opacity hover:opacity-90 disabled:pointer-events-none disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}
