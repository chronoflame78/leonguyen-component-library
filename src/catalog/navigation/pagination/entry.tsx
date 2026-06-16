import { defineComponent } from "../../../lib/registry";
import { Pagination } from "./Pagination";
import reactSource from "./Pagination.tsx?raw";
import svelteSource from "./Pagination.svelte?raw";

export default defineComponent({
  id: "pagination",
  name: "Pagination",
  category: "navigation",
  description:
    "A page navigation control with prev/next arrows, numbered pages and ellipsis gaps for large ranges.",
  tags: ["pagination", "interactive", "navigation"],
  Preview: () => (
    <div className="flex justify-center">
      <Pagination />
    </div>
  ),
  react: [
    { filename: "Pagination.tsx", language: "tsx", source: reactSource },
  ],
  svelte: [
    { filename: "Pagination.svelte", language: "svelte", source: svelteSource },
  ],
});
