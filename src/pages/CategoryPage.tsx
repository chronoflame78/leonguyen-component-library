import { Link, useParams } from "react-router-dom";
import { getComponentsByCategory } from "../catalog";
import { getCategory, type CategoryId } from "../lib/registry";
import { ComponentCard } from "../components/showcase/ComponentCard";

export function CategoryPage() {
  const { categoryId } = useParams<{ categoryId: CategoryId }>();
  const category = categoryId ? getCategory(categoryId) : undefined;

  if (!category) {
    return (
      <div className="text-gray-600 dark:text-gray-400">
        Unknown category.{" "}
        <Link to="/" className="text-indigo-500 hover:underline dark:text-indigo-400">
          Go home
        </Link>
      </div>
    );
  }

  const items = getComponentsByCategory(category.id);

  return (
    <div>
      <header className="mb-8">
        <div className="text-sm text-gray-500">
          <Link to="/" className="hover:text-gray-700 dark:hover:text-gray-300">
            Home
          </Link>{" "}
          / {category.label}
        </div>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          {category.label}
        </h1>
        <p className="mt-2 max-w-2xl text-gray-600 dark:text-gray-400">
          {category.description}
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((entry) => (
          <ComponentCard key={entry.id} entry={entry} />
        ))}
      </div>
      {items.length === 0 && (
        <p className="text-gray-500">No components in this category yet.</p>
      )}
    </div>
  );
}
