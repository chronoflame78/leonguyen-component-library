import { useState } from "react";
import type { ComponentEntry } from "../../lib/registry";
import { CodeBlock } from "./CodeBlock";

type Framework = "react" | "svelte";

interface ComponentShowcaseProps {
  entry: ComponentEntry;
}

export function ComponentShowcase({ entry }: ComponentShowcaseProps) {
  const [framework, setFramework] = useState<Framework>("react");
  const { Preview } = entry;
  const files = framework === "react" ? entry.react : entry.svelte;

  return (
    <div className="space-y-4">
      {/* Live preview — always rendered on a dark stage so components (which are
          tuned for a dark background) display correctly in either site theme. */}
      <div className="flex min-h-48 items-center justify-center overflow-hidden rounded-xl border border-black/10 bg-gradient-to-br from-[#16161f] to-[#0d0d14] p-10 dark:border-white/10">
        <Preview />
      </div>

      {/* Framework switch */}
      <div className="flex items-center gap-1 rounded-lg border border-black/10 bg-black/5 p-1 text-sm dark:border-white/10 dark:bg-white/5">
        <FrameworkTab
          active={framework === "react"}
          onClick={() => setFramework("react")}
        >
          React
        </FrameworkTab>
        <FrameworkTab
          active={framework === "svelte"}
          onClick={() => setFramework("svelte")}
        >
          Svelte
        </FrameworkTab>
      </div>

      {framework === "svelte" && (
        <p className="rounded-lg border border-amber-500/30 bg-amber-50 px-4 py-2 text-xs text-amber-700 dark:border-amber-500/20 dark:bg-amber-500/5 dark:text-amber-200/80">
          The live preview above renders the React version. The Svelte source
          below is identical in behavior — copy it into your Svelte project.
        </p>
      )}

      <div className="space-y-4">
        {files.map((file) => (
          <CodeBlock key={file.filename} file={file} />
        ))}
      </div>
    </div>
  );
}

function FrameworkTab({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-md px-4 py-1.5 font-medium transition-colors ${
        active
          ? "bg-indigo-500 text-white"
          : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
      }`}
    >
      {children}
    </button>
  );
}
