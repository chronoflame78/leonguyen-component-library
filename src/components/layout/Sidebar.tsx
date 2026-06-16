import { NavLink } from "react-router-dom";
import { categories } from "../../lib/registry";
import { components, getComponentsByCategory } from "../../catalog";
import { ThemeToggle } from "./ThemeToggle";

export function Sidebar() {
  return (
    <aside className="hidden w-72 shrink-0 flex-col border-r border-black/10 bg-white md:flex dark:border-white/10 dark:bg-[#0d0d14]">
      {/* Brand */}
      <div className="flex items-center justify-between gap-3 border-b border-black/5 px-5 py-5 dark:border-white/5">
        <NavLink to="/" className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-sm font-bold text-white shadow-sm shadow-indigo-500/30">
            LN
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-semibold text-gray-900 dark:text-white">
              Component Library
            </span>
            <span className="block text-xs text-gray-500">React + Svelte UI</span>
          </span>
        </NavLink>
        <ThemeToggle />
      </div>

      {/* Categories */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-600">
          Categories
        </div>
        <ul className="space-y-0.5">
          {categories.map((category) => {
            const count = getComponentsByCategory(category.id).length;
            return (
              <li key={category.id}>
                <NavLink
                  to={`/category/${category.id}`}
                  className={({ isActive }) =>
                    `group relative flex items-center justify-between rounded-lg py-2.5 pl-4 pr-2 text-sm transition-colors ${
                      isActive
                        ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-200"
                        : "text-gray-600 hover:bg-black/[0.04] hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/[0.04] dark:hover:text-white"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <span className="absolute left-1 top-1/2 h-5 w-1 -translate-y-1/2 rounded-full bg-gradient-to-b from-indigo-500 to-fuchsia-500" />
                      )}
                      <span className="font-medium">{category.label}</span>
                      <span
                        className={`rounded-full px-1.5 py-0.5 text-[11px] font-medium tabular-nums ${
                          isActive
                            ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-200"
                            : "bg-black/5 text-gray-500 dark:bg-white/10 dark:text-gray-400"
                        }`}
                      >
                        {count}
                      </span>
                    </>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer summary */}
      <div className="border-t border-black/5 px-5 py-3 text-xs text-gray-400 dark:border-white/5 dark:text-gray-600">
        {components.length} components · {categories.length} categories
      </div>
    </aside>
  );
}
