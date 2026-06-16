import { useState } from "react";

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
}

interface RadioGroupProps {
  options: RadioOption[];
  name?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

export function RadioGroup({
  options,
  name = "radio-group",
  defaultValue,
  onChange,
}: RadioGroupProps) {
  const [selected, setSelected] = useState(defaultValue ?? options[0]?.value);

  function select(value: string) {
    setSelected(value);
    onChange?.(value);
  }

  return (
    <div role="radiogroup" className="flex w-full flex-col gap-2.5">
      {options.map((option) => {
        const checked = option.value === selected;
        return (
          <label
            key={option.value}
            className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition ${
              checked
                ? "border-indigo-400/70 bg-indigo-500/10"
                : "border-white/10 bg-white/[0.03] hover:border-white/20"
            }`}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={checked}
              onChange={() => select(option.value)}
              className="sr-only"
            />
            <span
              aria-hidden="true"
              className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 transition ${
                checked ? "border-indigo-400" : "border-white/30"
              }`}
            >
              <span
                className={`h-2.5 w-2.5 rounded-full bg-gradient-to-br from-indigo-400 to-fuchsia-400 transition-transform duration-150 ${
                  checked ? "scale-100" : "scale-0"
                }`}
              />
            </span>
            <span className="flex flex-col">
              <span className="text-sm font-medium text-[#f8f8fc]">
                {option.label}
              </span>
              {option.description && (
                <span className="text-xs text-white/50">
                  {option.description}
                </span>
              )}
            </span>
          </label>
        );
      })}
    </div>
  );
}
