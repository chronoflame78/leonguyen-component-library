import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="py-20 text-center">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white">404</h1>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        This page doesn’t exist.
      </p>
      <Link
        to="/"
        className="mt-4 inline-block text-indigo-500 hover:underline dark:text-indigo-400"
      >
        Back to the library
      </Link>
    </div>
  );
}
