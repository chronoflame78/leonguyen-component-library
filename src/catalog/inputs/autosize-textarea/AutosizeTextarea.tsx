import { useEffect, useRef, useState } from "react";

interface AutosizeTextareaProps {
  defaultValue?: string;
  placeholder?: string;
  /** Max character count; also caps growth via maxHeight. */
  maxLength?: number;
  /** Maximum height in pixels before scrolling kicks in. */
  maxHeight?: number;
}

export function AutosizeTextarea({
  defaultValue = "",
  placeholder = "Write something…",
  maxLength = 280,
  maxHeight = 180,
}: AutosizeTextareaProps) {
  const [value, setValue] = useState(defaultValue);
  const ref = useRef<HTMLTextAreaElement | null>(null);

  function resize() {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, maxHeight)}px`;
    el.style.overflowY = el.scrollHeight > maxHeight ? "auto" : "hidden";
  }

  // Resize on mount and whenever the value changes.
  useEffect(() => {
    resize();
  }, [value]);

  const remaining = maxLength - value.length;
  const danger = remaining <= 20;

  return (
    <div className="w-full">
      <textarea
        ref={ref}
        value={value}
        maxLength={maxLength}
        placeholder={placeholder}
        rows={1}
        onChange={(e) => setValue(e.target.value)}
        className="w-full resize-none rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm leading-relaxed text-[#f8f8fc] placeholder:text-white/40 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/25"
      />
      <div className="mt-1.5 text-right text-xs tabular-nums">
        <span className={danger ? "text-rose-400" : "text-white/40"}>
          {value.length} / {maxLength}
        </span>
      </div>
    </div>
  );
}
