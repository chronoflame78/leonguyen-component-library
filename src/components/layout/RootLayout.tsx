import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";

export function RootLayout() {
  return (
    <div className="flex h-full">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-5xl px-6 py-10 lg:px-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
