import type { CategoryId, ComponentEntry } from "../lib/registry";

/**
 * Auto-discover every component in the catalog.
 *
 * Each component folder exports a `ComponentEntry` as the default export of an
 * `entry.tsx` file. Dropping a new folder in (with that file) registers it in
 * the library — no manual wiring required.
 */
const modules = import.meta.glob<{ default: ComponentEntry }>(
  "./**/entry.tsx",
  { eager: true },
);

export const components: ComponentEntry[] = Object.values(modules)
  .map((m) => m.default)
  .sort((a, b) => a.name.localeCompare(b.name));

const byId = new Map(components.map((c) => [c.id, c]));

export function getComponent(id: string): ComponentEntry | undefined {
  return byId.get(id);
}

export function getComponentsByCategory(category: CategoryId): ComponentEntry[] {
  return components.filter((c) => c.category === category);
}

export function searchComponents(query: string): ComponentEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return components;
  return components.filter((c) => {
    const haystack = [c.name, c.description, c.category, ...(c.tags ?? [])]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}
