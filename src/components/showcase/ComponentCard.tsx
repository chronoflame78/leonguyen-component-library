import { Link } from "react-router-dom";
import type { ComponentEntry } from "../../lib/registry";

interface ComponentCardProps {
  entry: ComponentEntry;
}

export function ComponentCard({ entry }: ComponentCardProps) {
  const { Preview } = entry;
  return (
    <Link
      to={`/component/${entry.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-black/10 bg-white transition-colors hover:border-indigo-500/40 dark:border-white/10 dark:bg-[#0d0d14]"
    >
      {/* Preview stage stays dark in both themes so components render correctly. */}
      <div className="flex min-h-36 flex-1 items-center justify-center overflow-hidden bg-gradient-to-br from-[#16161f] to-[#0d0d14] p-6">
        <div className="pointer-events-none scale-90">
          <Preview />
        </div>
      </div>
      <div className="border-t border-black/10 px-4 py-3 dark:border-white/10">
        <div className="font-medium text-gray-900 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-300">
          {entry.name}
        </div>
        <p className="mt-0.5 line-clamp-1 text-xs text-gray-500">
          {entry.description}
        </p>
      </div>
    </Link>
  );
}
