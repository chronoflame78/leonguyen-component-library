import { Link, useParams } from "react-router-dom";
import { getComponent } from "../catalog";
import { getCategory } from "../lib/registry";
import { ComponentShowcase } from "../components/showcase/ComponentShowcase";

export function ComponentPage() {
  const { componentId } = useParams<{ componentId: string }>();
  const entry = componentId ? getComponent(componentId) : undefined;

  if (!entry) {
    return (
      <div className="text-gray-600 dark:text-gray-400">
        Component not found.{" "}
        <Link to="/" className="text-indigo-500 hover:underline dark:text-indigo-400">
          Go home
        </Link>
      </div>
    );
  }

  const category = getCategory(entry.category);

  return (
    <div>
      <header className="mb-8">
        <div className="text-sm text-gray-500">
          <Link to="/" className="hover:text-gray-700 dark:hover:text-gray-300">
            Home
          </Link>{" "}
          /{" "}
          {category && (
            <Link
              to={`/category/${category.id}`}
              className="hover:text-gray-700 dark:hover:text-gray-300"
            >
              {category.label}
            </Link>
          )}{" "}
          / {entry.name}
        </div>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          {entry.name}
        </h1>
        <p className="mt-2 max-w-2xl text-gray-600 dark:text-gray-400">
          {entry.description}
        </p>
        {entry.tags && entry.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {entry.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-black/10 bg-black/5 px-2.5 py-0.5 text-xs text-gray-600 dark:border-white/10 dark:bg-white/5 dark:text-gray-400"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <ComponentShowcase entry={entry} />
    </div>
  );
}
