import { useState } from "react";

interface CopyButtonProps {
  text: string;
  label?: string;
}

export function CopyButton({ text, label = "Copy" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard API unavailable (e.g. non-secure context); fail silently.
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="rounded-md border border-black/10 bg-black/5 px-2.5 py-1 text-xs font-medium text-gray-700 transition-colors hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:text-gray-300 dark:hover:bg-white/10"
    >
      {copied ? "Copied!" : label}
    </button>
  );
}
