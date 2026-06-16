import { useMemo, useState } from "react";
import { components, getComponentsByCategory, searchComponents } from "../catalog";
import { categories } from "../lib/registry";
import { ComponentCard } from "../components/showcase/ComponentCard";
import { Link } from "react-router-dom";

export function HomePage() {
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchComponents(query), [query]);

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          LeoNguyen Component Library
        </h1>
        <p className="mt-2 max-w-2xl text-gray-600 dark:text-gray-400">
          A curated storage of cool, popular UI components. Every component ships
          with a{" "}
          <span className="text-indigo-600 dark:text-indigo-300">React</span> and
          a{" "}
          <span className="text-orange-600 dark:text-orange-300">Svelte</span>{" "}
          version — preview it live, then copy the source.
        </p>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-600">
          {components.length} components across {categories.length} categories.
        </p>
      </header>

      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search components…"
        className="mb-8 w-full rounded-lg border border-black/10 bg-black/5 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-500 focus:border-indigo-500/50 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
      />

      {!query && (
        <div className="mb-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="group rounded-xl border border-black/10 bg-white p-4 transition-colors hover:border-indigo-500/40 dark:border-white/10 dark:bg-[#0d0d14]"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="font-medium text-gray-900 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-300">
                  {category.label}
                </div>
                <span className="rounded-full bg-black/5 px-1.5 py-0.5 text-[11px] font-medium tabular-nums text-gray-500 dark:bg-white/10 dark:text-gray-400">
                  {getComponentsByCategory(category.id).length}
                </span>
              </div>
              <p className="mt-1 line-clamp-2 text-xs text-gray-500">
                {category.description}
              </p>
            </Link>
          ))}
        </div>
      )}

      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
        {query ? `Results (${results.length})` : "All components"}
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((entry) => (
          <ComponentCard key={entry.id} entry={entry} />
        ))}
      </div>
      {results.length === 0 && (
        <p className="text-gray-500">No components match “{query}”.</p>
      )}
    </div>
  );
}
