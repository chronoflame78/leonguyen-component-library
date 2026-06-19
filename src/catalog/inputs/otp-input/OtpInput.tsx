import { useRef, useState } from "react";

interface OtpInputProps {
  /** Number of code boxes. */
  length?: number;
  /** Called whenever the assembled code changes. */
  onChange?: (code: string) => void;
}

export function OtpInput({ length = 6, onChange }: OtpInputProps) {
  const [values, setValues] = useState<string[]>(() =>
    Array.from({ length }, () => "")
  );
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  function commit(next: string[]) {
    setValues(next);
    onChange?.(next.join(""));
  }

  function focusBox(index: number) {
    const el = inputsRef.current[index];
    if (el) {
      el.focus();
      el.select();
    }
  }

  function handleChange(index: number, raw: string) {
    // Keep only the last typed digit.
    const digit = raw.replace(/\D/g, "").slice(-1);
    if (!digit) return;
    const next = [...values];
    next[index] = digit;
    commit(next);
    if (index < length - 1) focusBox(index + 1);
  }

  function handleKeyDown(
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (e.key === "Backspace") {
      if (values[index]) {
        const next = [...values];
        next[index] = "";
        commit(next);
      } else if (index > 0) {
        e.preventDefault();
        const next = [...values];
        next[index - 1] = "";
        commit(next);
        focusBox(index - 1);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      focusBox(index - 1);
    } else if (e.key === "ArrowRight" && index < length - 1) {
      e.preventDefault();
      focusBox(index + 1);
    }
  }

  function handlePaste(index: number, e: React.ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();
    const digits = e.clipboardData.getData("text").replace(/\D/g, "");
    if (!digits) return;
    const next = [...values];
    for (let i = 0; i < digits.length && index + i < length; i++) {
      next[index + i] = digits[i];
    }
    commit(next);
    const lastFilled = Math.min(index + digits.length, length - 1);
    focusBox(lastFilled);
  }

  return (
    <div className="flex gap-2" role="group" aria-label="One-time code">
      {values.map((value, i) => (
        <input
          key={i}
          ref={(el) => {
            inputsRef.current[i] = el;
          }}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={1}
          value={value}
          aria-label={`Digit ${i + 1}`}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={(e) => handlePaste(i, e)}
          onFocus={(e) => e.target.select()}
          className="h-12 w-10 rounded-lg border border-white/10 bg-white/[0.03] text-center text-lg font-semibold text-[#f8f8fc] caret-indigo-400 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/25"
        />
      ))}
    </div>
  );
}
