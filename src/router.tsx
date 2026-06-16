import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./components/layout/RootLayout";
import { HomePage } from "./pages/HomePage";
import { CategoryPage } from "./pages/CategoryPage";
import { ComponentPage } from "./pages/ComponentPage";
import { NotFoundPage } from "./pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "category/:categoryId", element: <CategoryPage /> },
      { path: "component/:componentId", element: <ComponentPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
